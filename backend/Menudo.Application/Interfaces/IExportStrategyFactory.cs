public interface IExportStrategyFactory
{
    IExportStrategy GetStrategy(ExportFormat format);
}