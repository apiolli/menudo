using Menudo.Application.DTOs.Expense;
using Menudo.Application.Interfaces;

namespace Menudo.Application.Services
{
    public class ExportService : IExportService
    {
        private readonly IExportStrategyFactory _factory;

        public ExportService(IExportStrategyFactory factory)
        {
            _factory = factory;
        }

        public async Task<ExpenseExportDTO> ExportAsync<T>(
            IEnumerable<T> data,
            ExportFormat format,
            string fileNameWithoutExtension,
            CancellationToken cancellationToken = default)
        {
            var strategy = _factory.GetStrategy(format);
            var content = await strategy.ExportAsync(data, cancellationToken);

            var (extension, contentType) = format switch
            {
                ExportFormat.Excel => (".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
                ExportFormat.Txt   => (".txt", "text/plain"),
                ExportFormat.Json  => (".json", "application/json"),
                _ => throw new NotSupportedException($"Formato de exportación '{format}' no soportado.")
            };

            return new ExpenseExportDTO
            {
                FileName = $"{fileNameWithoutExtension}{extension}",
                ContentType = contentType,
                Content = content,
            };
        }
    }
}