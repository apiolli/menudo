using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Interfaces
{
    public interface IImportService
    {
        byte[] GetTemplate();
        Task<(int SuccessCount, int FailureCount, List<string> Errors)> ImportAsync(Stream stream);
    }
}
