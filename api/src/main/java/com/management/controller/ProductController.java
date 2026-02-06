package com.management.controller;

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
import jakarta.ws.rs.WebApplicationException;
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
    public Response createProduct(ProductRequest product) {
        try {
            return Response.ok(productService.createProduct(product)).build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        }
    }

    @GET
    public Response getProducts(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size) {
        return Response.ok(productService.getProducts(page, size)).build();
    }

    @GET
    @Path("/{code}")
    public Response getProductsByCode(@PathParam("code") String code) {
        try {
            return Response.ok(productService.getProductsByCode(code)).build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{code}")
    @Transactional
    public Response updateProduct(@PathParam("code") String code, ProductRequest product) {
        try {
            productService.updateProduct(code, product);
            return Response.noContent().build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{code}")
    @Transactional
    public Response deleteProduct(@PathParam("code") String code) {
        try {
            productService.deleteProduct(code);
            return Response.noContent().build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        }
    }
}
