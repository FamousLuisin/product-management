package com.management.entity.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.management.entity.manufacturing.ManufacturingEntity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity @Table(name = "tb_products")
@AllArgsConstructor @NoArgsConstructor
public class ProductEntity extends PanacheEntityBase{
    
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    public String name;

    public BigDecimal price;

    public String code;

    @OneToMany(
        mappedBy = "product",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    public List<ManufacturingEntity> manufacturing;

    public static List<ProductEntity> findProductsWithManufacturingOrderByPriceDesc() {
        return ProductEntity.find("SELECT p FROM ProductEntity p JOIN ManufacturingEntity m ON p.id = m.product.id ORDER BY p.price DESC, p.name ASC").list();
    }
    
}
