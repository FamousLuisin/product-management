package com.management.config;

import java.time.LocalDateTime;

import jakarta.ws.rs.ext.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
@Provider
public class ResponseException {
    
    private String message;
    private Integer code;
    private LocalDateTime timestamp;
    private String path;
}
