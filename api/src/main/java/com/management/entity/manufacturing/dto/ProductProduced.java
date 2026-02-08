package com.management.entity.manufacturing.dto;

import java.util.ArrayList;
import java.util.List;

import com.management.entity.product.ProductEntity;
import com.management.entity.product.dto.ProductResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ProductProduced {

    @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter
    public class ProductResponseWithQuantity extends ProductResponse {
        private Integer quantity;

        public ProductResponseWithQuantity(String name, Float price, String code, Integer quantity) {
            super(name, price, code);
            this.quantity = quantity;
        }
    }
    
    private List<ProductResponseWithQuantity> products;

    private Float price = 0f;

    public void addProduct(ProductEntity product, Integer quantity) {
        if (this.products == null) {
            this.products = new ArrayList<>();
        }

        this.products.add(new ProductResponseWithQuantity(product.name, product.price, product.code, quantity));
    }
}
