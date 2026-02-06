package com.management;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

import jakarta.ws.rs.core.Application;

@OpenAPIDefinition(
    info = @Info(
        title = "Product Management API",
        version = "1.0.0",
        description = "API for managing products"
    )
)
public class ApiApplication extends Application {
    
}
