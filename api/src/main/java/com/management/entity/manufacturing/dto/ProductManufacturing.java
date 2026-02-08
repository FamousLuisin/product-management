package com.management.entity.manufacturing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ProductManufacturing {
    
    private String materialCode;

    private Integer quantity;
}
