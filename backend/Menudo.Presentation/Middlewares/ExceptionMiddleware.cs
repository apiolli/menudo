using FluentValidation;
using Menudo.Application.DTOs.ErrorResponse;
using Menudo.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ObjectPool;
using System.Runtime.InteropServices;
using System.Text.Json;

namespace Menudo.Presentation.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate requestDelegate;
        private readonly ILogger<ExceptionMiddleware> logger;

        public ExceptionMiddleware(RequestDelegate requestDelegate, ILogger<ExceptionMiddleware> logger)
        {
            this.requestDelegate = requestDelegate;
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await requestDelegate(context);

            } catch (Exception ex)
            {
                logger.LogError(ex, "Error Inesperado");
                await HandleException(context, ex);
            }
        }

        public static async Task HandleException(HttpContext context, Exception exception)
        {
            var (statusCode, message, details) = exception switch
            {
                AppException error => (error.StatusCode, error.Message, new Dictionary<string, string[]>()),
                ValidationException error => (
                    StatusCodes.Status400BadRequest, 
                    "Error de validacion", 
                    error.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray())),
                _ => (StatusCodes.Status500InternalServerError, "Ocurrio un error interno del servidor", new Dictionary<string, string[]>()),
            };

            var response = new ErrorResponseDTO
            {
                StatusCode = statusCode,
                Message = message,
                Details = details,
                RequestId = context.TraceIdentifier
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            await context.Response.WriteAsync(JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));
        }


    }
}
