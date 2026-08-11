using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.ErrorResponse
{
    public class ErrorResponseDTO
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public Dictionary<string, string[]> Details { get; set; } = [];
        public string RequestId { get; set; } = string.Empty;
    }
}
