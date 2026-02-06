package com.management.config;

import java.time.LocalDateTime;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class WebApplicationExceptionMapper
        implements ExceptionMapper<WebApplicationException> {

    @Context
    UriInfo uriInfo;

    @Override
    public Response toResponse(WebApplicationException e) {
        ResponseException error = new ResponseException(
            e.getMessage(),
            e.getResponse().getStatus(),
            LocalDateTime.now(),
            uriInfo.getPath()
        );

        return Response
            .status(e.getResponse().getStatus())
            .entity(error)
            .build();
    }
}
