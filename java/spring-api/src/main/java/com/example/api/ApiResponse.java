package com.example.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private String status;
    private Object data;
    private String message;

    public ApiResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
