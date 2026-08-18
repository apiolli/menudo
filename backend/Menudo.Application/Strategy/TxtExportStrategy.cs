using System.Text;
using System.Reflection;

public class TxtExportStrategy : IExportStrategy
{
    public ExportFormat Format => ExportFormat.Txt;

    public Task<byte[]> ExportAsync<T>(IEnumerable<T> data, CancellationToken cancellationToken = default)
    {
        var sb = new StringBuilder();
        var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        sb.AppendLine(string.Join("\t", properties.Select(p => p.Name)));

        foreach (var item in data)
        {
            var values = properties.Select(p => p.GetValue(item)?.ToString() ?? string.Empty);
            sb.AppendLine(string.Join("\t", values));
        }

        return Task.FromResult(Encoding.UTF8.GetBytes(sb.ToString()));
    }
}