package com.management.controller;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import com.management.entity.material.dto.MaterialRequest;
import com.management.service.MaterialService;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;

@Path("/api/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }
    
    @POST
    @Transactional
    @Operation(summary = "Create a new material", 
        description = "Creates a new material with the provided details",
        operationId = "createMaterial"
    
    )
    @APIResponse(responseCode = "200", description = "Material created successfully")
    @APIResponse(responseCode = "400", description = "Invalid material data")
    public Response createMaterial(MaterialRequest request) {
        return Response.ok(materialService.createMaterial(request)).build();
    }

    @GET
    @Operation(summary = "Get all materials", 
        description = "Retrieves a list of all materials",
        operationId = "getMaterials"
    )
    @APIResponse(responseCode = "200", description = "Materials retrieved successfully")
    @Path("/all")
    public Response GetAllMaterials() {
        return Response.ok(materialService.getMaterials()).build();
    }

    @GET
    @Operation(summary = "Get materials with pagination", 
        description = "Retrieves a paginated list of materials",
        operationId = "getMaterialsPerPage"
    )
    @APIResponse(responseCode = "200", description = "Materials retrieved successfully")
    public Response getMaterials(@QueryParam("page") @DefaultValue("0") Integer page, @QueryParam("size") @DefaultValue("10") Integer size){
        return Response.ok(materialService.getMaterialsPerPage(page, size)).build();
    }

    @GET
    @Path("/{code}")
    @Operation(summary = "Get material by code", 
        description = "Retrieves a material by its unique code",
        operationId = "getMaterialByCode"
    )
    @APIResponse(responseCode = "200", description = "Material retrieved successfully")
    @APIResponse(responseCode = "404", description = "Material not found")
    public Response getMaterialByCode(@PathParam("code") String code) {
        return Response.ok(materialService.getMaterialByCode(code)).build();
    }

    @PUT
    @Path("/{code}")
    @Operation(summary = "Update material", 
        description = "Updates the details of an existing material",
        operationId = "updateMaterial"
    )
    @APIResponse(responseCode = "200", description = "Material updated successfully")
    @APIResponse(responseCode = "404", description = "Material not found")
    @Transactional
    public Response updateMaterial(@PathParam("code") String code ,MaterialRequest request) {
        materialService.updateMaterial(code, request);
        return Response.ok().build();
    }

    @PUT
    @Path("/{code}/add")
    @Transactional
    @Operation(summary = "Add quantity to material",
        description = "Adds a specified quantity to the existing material stock",
        operationId = "addQuantityMaterial"
    )
    @APIResponse(responseCode = "200", description = "Material quantity updated successfully")
    @APIResponse(responseCode = "404", description = "Material not found")
    @APIResponse(responseCode = "400", description = "Invalid quantity")
    public Response addQuantityMaterial(@PathParam("code") String code, @QueryParam("quantity") Integer quantity) {
        materialService.addQuantityMaterial(code, quantity);
        return Response.ok().build();
    }

    @PUT
    @Path("/{code}/remove")
    @Transactional
    @Operation(summary = "Remove quantity from material",
        description = "Removes a specified quantity from the existing material stock",
        operationId = "removeQuantityMaterial"
    )
    @APIResponse(responseCode = "200", description = "Material quantity updated successfully")
    @APIResponse(responseCode = "404", description = "Material not found")
    @APIResponse(responseCode = "400", description = "Invalid quantity")
    public Response removeQuantityMaterial(@PathParam("code") String code, @QueryParam("quantity") Integer quantity) {
        materialService.removeQuantityMaterial(code, quantity);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Delete material", 
        description = "Deletes a material by its unique code",
        operationId = "deleteMaterial"
    )
    @APIResponse(responseCode = "200", description = "Material deleted successfully")
    @APIResponse(responseCode = "404", description = "Material not found")
    public Response deleteMaterial(@PathParam("code") String code){
        materialService.deleteMaterial(code);
        return Response.ok().build();
    }
}
