package com.management.entity.material;

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

@Entity @Table(name = "tb_materials")
@NoArgsConstructor @AllArgsConstructor
public class MaterialEntity extends PanacheEntityBase {
    
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;
    public String code;
    public String name;
    public Integer quantity;

    @OneToMany(
        mappedBy = "material",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    public List<ManufacturingEntity> manufacturing;

    public static List<MaterialEntity> findByCodes(List<String> codes) {
        return list("code IN ?1", codes);
    }

    public static List<MaterialEntity> findMaterialWithManufacturing() {
        return MaterialEntity.find("SELECT mt FROM MaterialEntity mt JOIN ManufacturingEntity m ON mt.id = m.material.id").list();
    }

    public static List<MaterialEntity> findMaterialByProductCode(String productCode) {
        return MaterialEntity.find("SELECT mt FROM MaterialEntity mt JOIN ManufacturingEntity m ON mt.id = m.material.id JOIN ProductEntity p ON m.product.id = p.id WHERE p.code = ?1", productCode).list();
    }
}
