using Menudo.Application.DTOs.Expense;
using Menudo.Application.Interfaces;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Threading.Tasks;

namespace Menudo.Application.Services
{
    public class ImportService : IImportService
    {
        private readonly IExpenseService _expenseService;
        private readonly ICategoryService _categoryService;
        private readonly IPaymentMethodService _paymentMethodService;

        public ImportService(IExpenseService expenseService, ICategoryService categoryService, IPaymentMethodService paymentMethodService, OfficeOpenXml.LicenseContext? licenseContext)
        {
            _expenseService = expenseService;
            _categoryService = categoryService;
            _paymentMethodService = paymentMethodService;
            licenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
        }

        public byte[] GetTemplate()
        {
            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Template");
            worksheet.Cells[1, 1].Value = "Date (yyyy-MM-dd)";
            worksheet.Cells[1, 2].Value = "Description";
            worksheet.Cells[1, 3].Value = "Amount";
            worksheet.Cells[1, 4].Value = "CategoryId";
            worksheet.Cells[1, 5].Value = "PaymentMethodId";
            worksheet.Cells.AutoFitColumns();
            return package.GetAsByteArray();
        }

        public async Task<(int SuccessCount, int FailureCount, List<string> Errors)> ImportAsync(Stream stream)
        {
            int successCount = 0;
            int failureCount = 0;
            var errors = new List<string>();

            if (stream == null || stream.Length == 0)
            {
                errors.Add("El archivo está vacío o no fue enviado.");
                return (0, 1, errors);
            }

            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];

            if (worksheet == null)
            {
                errors.Add("El archivo no contiene hojas de cálculo válidas.");
                return (0, 1, errors);
            }

            int rowCount = worksheet.Dimension?.Rows ?? 0;
            if (rowCount <= 1)
            {
                errors.Add("El archivo no contiene datos.");
                return (0, 1, errors);
            }

            for (int row = 2; row <= rowCount; row++)
            {
                try
                {
                    var dateStr = worksheet.Cells[row, 1].Text;
                    var description = worksheet.Cells[row, 2].Text;
                    var amountStr = worksheet.Cells[row, 3].Text;
                    var categoryIdStr = worksheet.Cells[row, 4].Text;
                    var paymentMethodIdStr = worksheet.Cells[row, 5].Text;

                    if (string.IsNullOrWhiteSpace(dateStr) && string.IsNullOrWhiteSpace(description) && string.IsNullOrWhiteSpace(amountStr))
                    {
                        continue; // Skip empty row
                    }

                    if (!DateTime.TryParse(dateStr, out DateTime date))
                        throw new ArgumentException("Fecha inválida.");

                    if (string.IsNullOrWhiteSpace(description))
                        throw new ArgumentException("La descripción es obligatoria.");

                    if (!decimal.TryParse(amountStr, out decimal amount) || amount <= 0)
                        throw new ArgumentException("El monto debe ser un número mayor a 0.");

                    if (!int.TryParse(categoryIdStr, out int categoryId))
                        throw new ArgumentException("El CategoryId debe ser un número entero.");

                    if (!int.TryParse(paymentMethodIdStr, out int paymentMethodId))
                        throw new ArgumentException("El PaymentMethodId debe ser un número entero.");

                    var dto = new CreateExpenseDTO
                    {
                        Date = date,
                        Description = description,
                        Amount = amount,
                        CategoryId = categoryId,
                        PaymentMethodId = paymentMethodId
                    };

                    await _expenseService.CreateExpenseAsync(dto);
                    successCount++;
                }
                catch (Exception ex)
                {
                    failureCount++;
                    errors.Add($"Error en la fila {row}: {ex.Message}");
                }
            }

            return (successCount, failureCount, errors);
        }
    }
}
