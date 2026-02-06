package com.management.controller;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HomeController {

    @Data
    @AllArgsConstructor @NoArgsConstructor
    public class VersionInfo{
        public String version = "1.0.0";
    }
    
    @GET
    @Operation(summary = "Get API version", 
        description = "Returns the current version of the API",
        operationId = "getApiVersion"
    )
    @APIResponse(responseCode = "200", description = "API version retrieved successfully")
    public Response home() {
        return Response.ok(new VersionInfo()).build();
    }
}
