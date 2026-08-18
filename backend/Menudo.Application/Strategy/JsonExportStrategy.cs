using System.Text.Json;

public class JsonExportStrategy : IExportStrategy
{
    public ExportFormat Format => ExportFormat.Json;

    public Task<byte[]> ExportAsync<T>(IEnumerable<T> data, CancellationToken cancellationToken = default)
    {
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(data, options);
        return Task.FromResult(System.Text.Encoding.UTF8.GetBytes(json));
    }
}