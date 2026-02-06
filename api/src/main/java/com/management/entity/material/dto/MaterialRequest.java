package com.management.entity.material.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
public class MaterialRequest {
    
    private String name;
    private Integer quantity;
}
