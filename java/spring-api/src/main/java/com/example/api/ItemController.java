package com.example.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private static List<Item> items = new ArrayList<>();
    private static int nextId = 3;

    static {
        items.add(new Item(1, "Item 1", "First item", 100.0));
        items.add(new Item(2, "Item 2", "Second item", 200.0));
    }

    // GET - Retrieve all items
    @GetMapping
    public ResponseEntity<ApiResponse> getAllItems() {
        return ResponseEntity.ok(
            new ApiResponse("success", items, "All items retrieved")
        );
    }

    // GET - Retrieve single item by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Integer id) {
        Optional<Item> item = items.stream()
            .filter(i -> i.getId().equals(id))
            .findFirst();

        if (item.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("error", "Item not found"));
        }

        return ResponseEntity.ok(
            new ApiResponse("success", item.get(), "Item retrieved")
        );
    }

    // POST - Create new item
    @PostMapping
    public ResponseEntity<ApiResponse> createItem(@RequestBody Item item) {
        if (item.getName() == null || item.getDescription() == null || item.getPrice() == null) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse("error", "Missing required fields: name, description, price"));
        }

        Item newItem = new Item(nextId++, item.getName(), item.getDescription(), item.getPrice());
        items.add(newItem);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse("success", newItem, "Item created successfully"));
    }

    // PATCH - Update item
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id, @RequestBody Item itemUpdate) {
        Optional<Item> itemOpt = items.stream()
            .filter(i -> i.getId().equals(id))
            .findFirst();

        if (itemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("error", "Item not found"));
        }

        Item item = itemOpt.get();

        if (itemUpdate.getName() != null) {
            item.setName(itemUpdate.getName());
        }
        if (itemUpdate.getDescription() != null) {
            item.setDescription(itemUpdate.getDescription());
        }
        if (itemUpdate.getPrice() != null) {
            item.setPrice(itemUpdate.getPrice());
        }

        return ResponseEntity.ok(
            new ApiResponse("success", item, "Item updated successfully")
        );
    }

    // DELETE - Remove item
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Integer id) {
        Optional<Item> itemOpt = items.stream()
            .filter(i -> i.getId().equals(id))
            .findFirst();

        if (itemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("error", "Item not found"));
        }

        Item item = itemOpt.get();
        items.remove(item);

        return ResponseEntity.ok(
            new ApiResponse("success", item, "Item deleted successfully")
        );
    }
}
