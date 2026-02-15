#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#ifdef _WIN32
    #include <windows.h>
    #include <winsock2.h>
    #pragma comment(lib, "ws2_32.lib")
    typedef int socklen_t;
#else
    #include <unistd.h>
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #define INVALID_SOCKET -1
    #define SOCKET_ERROR -1
    #define closesocket close
    typedef int SOCKET;
#endif

#define PORT 3005
#define MAX_BUFFER 4096
#define MAX_ITEMS 100

typedef struct {
    int id;
    char name[100];
    char description[200];
    float price;
} Item;

Item items[MAX_ITEMS];
int item_count = 2;
int next_id = 3;

void init_items() {
    strcpy(items[0].name, "Item 1");
    strcpy(items[0].description, "First item");
    items[0].id = 1;
    items[0].price = 100.0;

    strcpy(items[1].name, "Item 2");
    strcpy(items[1].description, "Second item");
    items[1].id = 2;
    items[1].price = 200.0;
}

int parse_json_number(const char *json, const char *key, char *value) {
    char search[200];
    sprintf(search, "\"%s\":", key);
    const char *pos = strstr(json, search);
    if (!pos) return 0;
    
    pos += strlen(search);
    while (*pos && isspace(*pos)) pos++;
    
    int i = 0;
    while (*pos && *pos != ',' && *pos != '}' && i < 100) {
        value[i++] = *pos++;
    }
    value[i] = '\0';
    return 1;
}

int parse_json_string(const char *json, const char *key, char *value) {
    char search[200];
    sprintf(search, "\"%s\":\"", key);
    const char *pos = strstr(json, search);
    if (!pos) return 0;
    
    pos += strlen(search);
    int i = 0;
    while (*pos && *pos != '"' && i < 200) {
        value[i++] = *pos++;
    }
    value[i] = '\0';
    return 1;
}

void build_json_items(char *response) {
    strcpy(response, "{\"status\":\"success\",\"data\":[");
    
    for (int i = 0; i < item_count; i++) {
        if (i > 0) strcat(response, ",");
        char item_json[500];
        sprintf(item_json, 
            "{\"id\":%d,\"name\":\"%s\",\"description\":\"%s\",\"price\":%.1f}",
            items[i].id, items[i].name, items[i].description, items[i].price);
        strcat(response, item_json);
    }
    
    strcat(response, "],\"message\":\"All items retrieved\"}");
}

void handle_request(const char *request, char *response) {
    char method[10], path[100], query[200];
    sscanf(request, "%s %s", method, path);

    // Health check
    if (strcmp(path, "/health") == 0) {
        strcpy(response, "{\"status\":\"OK\",\"server\":\"C API Server\"}");
        return;
    }

    // GET /api/items
    if (strcmp(method, "GET") == 0 && strcmp(path, "/api/items") == 0) {
        build_json_items(response);
        return;
    }

    // GET /api/items/:id
    if (strcmp(method, "GET") == 0 && strncmp(path, "/api/items/", 11) == 0) {
        int id = atoi(path + 11);
        for (int i = 0; i < item_count; i++) {
            if (items[i].id == id) {
                sprintf(response,
                    "{\"status\":\"success\",\"data\":{\"id\":%d,\"name\":\"%s\",\"description\":\"%s\",\"price\":%.1f},\"message\":\"Item retrieved\"}",
                    items[i].id, items[i].name, items[i].description, items[i].price);
                return;
            }
        }
        strcpy(response, "{\"status\":\"error\",\"message\":\"Item not found\"}");
        return;
    }

    // POST /api/items
    if (strcmp(method, "POST") == 0 && strcmp(path, "/api/items") == 0) {
        char name[100] = "", description[200] = "", price_str[20] = "";
        
        parse_json_string(request, "name", name);
        parse_json_string(request, "description", description);
        parse_json_number(request, "price", price_str);
        
        if (strlen(name) > 0 && strlen(description) > 0 && strlen(price_str) > 0 && item_count < MAX_ITEMS) {
            items[item_count].id = next_id++;
            strcpy(items[item_count].name, name);
            strcpy(items[item_count].description, description);
            items[item_count].price = atof(price_str);
            
            sprintf(response,
                "{\"status\":\"success\",\"data\":{\"id\":%d,\"name\":\"%s\",\"description\":\"%s\",\"price\":%.1f},\"message\":\"Item created successfully\"}",
                items[item_count].id, items[item_count].name, items[item_count].description, items[item_count].price);
            
            item_count++;
            return;
        }
        strcpy(response, "{\"status\":\"error\",\"message\":\"Missing required fields\"}");
        return;
    }

    // PATCH /api/items/:id
    if (strcmp(method, "PATCH") == 0 && strncmp(path, "/api/items/", 11) == 0) {
        int id = atoi(path + 11);
        char name[100] = "", description[200] = "", price_str[20] = "";
        
        parse_json_string(request, "name", name);
        parse_json_string(request, "description", description);
        parse_json_number(request, "price", price_str);
        
        for (int i = 0; i < item_count; i++) {
            if (items[i].id == id) {
                if (strlen(name) > 0) strcpy(items[i].name, name);
                if (strlen(description) > 0) strcpy(items[i].description, description);
                if (strlen(price_str) > 0) items[i].price = atof(price_str);
                
                sprintf(response,
                    "{\"status\":\"success\",\"data\":{\"id\":%d,\"name\":\"%s\",\"description\":\"%s\",\"price\":%.1f},\"message\":\"Item updated successfully\"}",
                    items[i].id, items[i].name, items[i].description, items[i].price);
                return;
            }
        }
        strcpy(response, "{\"status\":\"error\",\"message\":\"Item not found\"}");
        return;
    }

    // DELETE /api/items/:id
    if (strcmp(method, "DELETE") == 0 && strncmp(path, "/api/items/", 11) == 0) {
        int id = atoi(path + 11);
        for (int i = 0; i < item_count; i++) {
            if (items[i].id == id) {
                sprintf(response,
                    "{\"status\":\"success\",\"data\":{\"id\":%d,\"name\":\"%s\",\"description\":\"%s\",\"price\":%.1f},\"message\":\"Item deleted successfully\"}",
                    items[i].id, items[i].name, items[i].description, items[i].price);
                
                // Shift remaining items
                for (int j = i; j < item_count - 1; j++) {
                    items[j] = items[j + 1];
                }
                item_count--;
                return;
            }
        }
        strcpy(response, "{\"status\":\"error\",\"message\":\"Item not found\"}");
        return;
    }

    strcpy(response, "{\"status\":\"error\",\"message\":\"Not Found\"}");
}

int main() {
    #ifdef _WIN32
        WSADATA wsa_data;
        if (WSAStartup(MAKEWORD(2, 2), &wsa_data) != 0) {
            printf("WSAStartup failed\n");
            return 1;
        }
    #endif

    init_items();

    SOCKET listen_socket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (listen_socket == INVALID_SOCKET) {
        printf("socket failed\n");
        return 1;
    }

    struct sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    server_addr.sin_port = htons(PORT);

    int option = 1;
    setsockopt(listen_socket, SOL_SOCKET, SO_REUSEADDR, (char*)&option, sizeof(option));

    if (bind(listen_socket, (struct sockaddr*)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
        printf("bind failed\n");
        closesocket(listen_socket);
        return 1;
    }

    if (listen(listen_socket, SOMAXCONN) == SOCKET_ERROR) {
        printf("listen failed\n");
        closesocket(listen_socket);
        return 1;
    }

    printf("\n");
    printf("╔════════════════════════════════════════════════════════╗\n");
    printf("║  C API Server running on http://localhost:%d           ║\n", PORT);
    printf("║  Endpoints:                                            ║\n");
    printf("║    GET    /api/items                                   ║\n");
    printf("║    GET    /api/items/:id                               ║\n");
    printf("║    POST   /api/items                                   ║\n");
    printf("║    PATCH  /api/items/:id                               ║\n");
    printf("║    DELETE /api/items/:id                               ║\n");
    printf("║    GET    /health                                      ║\n");
    printf("╚════════════════════════════════════════════════════════╝\n\n");

    while (1) {
        struct sockaddr_in client_addr;
        socklen_t client_addr_len = sizeof(client_addr);

        SOCKET client_socket = accept(listen_socket, (struct sockaddr*)&client_addr, &client_addr_len);
        if (client_socket == INVALID_SOCKET) {
            printf("accept failed\n");
            continue;
        }

        char request[MAX_BUFFER] = {};
        int bytes_received = recv(client_socket, request, MAX_BUFFER - 1, 0);

        if (bytes_received > 0) {
            request[bytes_received] = '\0';
            
            char json_response[MAX_BUFFER] = {};
            handle_request(request, json_response);

            char http_response[MAX_BUFFER];
            sprintf(http_response,
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: application/json\r\n"
                "Content-Length: %lu\r\n"
                "Connection: close\r\n"
                "\r\n"
                "%s",
                strlen(json_response), json_response);

            send(client_socket, http_response, strlen(http_response), 0);
        }

        closesocket(client_socket);
    }

    closesocket(listen_socket);

    #ifdef _WIN32
        WSACleanup();
    #endif

    return 0;
}
