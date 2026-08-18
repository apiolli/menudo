public interface IExportStrategy
{
    ExportFormat Format { get; }
    Task<byte[]> ExportAsync<T>(IEnumerable<T> data, CancellationToken cancellationToken = default);
}