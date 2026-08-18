using System;
using System.Collections.Generic;
using System.Text;
using Menudo.Application.DTOs.Expense;

namespace Menudo.Application.Interfaces
{
    public interface IExportService
    {
        Task<ExpenseExportDTO> ExportAsync<T>(
            IEnumerable<T> data,
            ExportFormat format,
            string fileNameWithoutExtension,
            CancellationToken cancellationToken = default);
    }
}
