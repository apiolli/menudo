public class ExportStrategyFactory : IExportStrategyFactory
{
    private readonly IEnumerable<IExportStrategy> _strategies;

    public ExportStrategyFactory(IEnumerable<IExportStrategy> strategies)
    {
        _strategies = strategies;
    }

    public IExportStrategy GetStrategy(ExportFormat format)
    {
        var strategy = _strategies.FirstOrDefault(s => s.Format == format);

        if (strategy is null)
            throw new NotSupportedException($"No hay estrategia registrada para el formato '{format}'.");

        return strategy;
    }
}