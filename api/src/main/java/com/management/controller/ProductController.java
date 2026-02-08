package com.management.controller;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import com.management.entity.manufacturing.dto.ProductManufacturing;
import com.management.entity.product.dto.ProductRequest;
import com.management.service.ProductService;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @POST
    @Transactional
    @Operation(summary = "Create a new product", 
        description = "Creates a new product with the provided details",
        operationId = "createProduct"
    )
    @APIResponse(responseCode = "200", description = "Product created successfully")
    @APIResponse(responseCode = "400", description = "Invalid product data")
    public Response createProduct(ProductRequest product) {
        return Response.ok(productService.createProduct(product)).build();
    }

    @GET
    @Operation(summary = "Get all products", 
        description = "Retrieves a list of products with pagination support",
        operationId = "getProducts"
    )
    @APIResponse(responseCode = "200", description = "Products retrieved successfully")
    public Response getProducts(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size) {
        return Response.ok(productService.getProducts(page, size)).build();
    }

    @GET
    @Path("/{code}")
    @Operation(summary = "Get product by code", 
        description = "Retrieves a product by its unique code",
        operationId = "getProductsByCode"
    )
    @APIResponse(responseCode = "200", description = "Product retrieved successfully")
    @APIResponse(responseCode = "404", description = "Product not found")
    public Response getProductsByCode(@PathParam("code") String code) {
        return Response.ok(productService.getProductsByCode(code)).build();
    }

    @PUT
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Update a product", 
        description = "Updates the details of an existing product", 
        operationId = "updateProduct"
    )
    @APIResponse(responseCode = "204", description = "Product updated successfully")
    @APIResponse(responseCode = "400", description = "Invalid product data")
    @APIResponse(responseCode = "404", description = "Product not found")
    public Response updateProduct(@PathParam("code") String code, ProductRequest product) {
        productService.updateProduct(code, product);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{code}/manufacturing")
    @Transactional
    @Operation(summary = "Update product manufacturing",
        description = "Updates the manufacturing details of an existing product",
        operationId = "updateManufacturing"
    )
    @APIResponse(responseCode = "204", description = "Manufacturing updated successfully")
    @APIResponse(responseCode = "400", description = "Invalid manufacturing data")
    @APIResponse(responseCode = "404", description = "Product not found")
    public Response updateManufacturing(@PathParam("code") String code, List<ProductManufacturing> manufacturing) {
        productService.updateManufacturing(code, manufacturing);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Delete a product", 
        description = "Deletes a product by its unique code", 
        operationId = "deleteProduct"
    )
    @APIResponse(responseCode = "204", description = "Product deleted successfully")
    @APIResponse(responseCode = "404", description = "Product not found")
    public Response deleteProduct(@PathParam("code") String code) {
        productService.deleteProduct(code);
        return Response.noContent().build();
    }
}
