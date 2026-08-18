using ClosedXML.Excel;
using System.Reflection;

public class ExcelExportStrategy : IExportStrategy
{
    public ExportFormat Format => ExportFormat.Excel;

    public Task<byte[]> ExportAsync<T>(IEnumerable<T> data, CancellationToken cancellationToken = default)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Export");

        var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        for (int col = 0; col < properties.Length; col++)
            worksheet.Cell(1, col + 1).Value = properties[col].Name;

        var row = 2;
        foreach (var item in data)
        {
            for (int col = 0; col < properties.Length; col++)
            {
                var value = properties[col].GetValue(item);
                worksheet.Cell(row, col + 1).Value = value?.ToString() ?? string.Empty;
            }
            row++;
        }

        worksheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return Task.FromResult(stream.ToArray());
    }
}