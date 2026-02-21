CREATE TABLE tb_manufacturing(
    id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    material_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT uk_product_material UNIQUE (product_id, material_id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES tb_products (id) ON DELETE CASCADE,
    CONSTRAINT fk_material_id FOREIGN KEY (material_id) REFERENCES tb_materials (id) ON DELETE CASCADE
);