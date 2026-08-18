using ClosedXML.Excel;
using Menudo.Application.DTOs.Import;
using Menudo.Application.Interfaces;
using Menudo.Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Services
{
    public class ImportService : IImportService
    {

        private readonly ICategoryService categoryService;
        private readonly IPaymentMethodService paymentMethodService;

        public ImportService(ICategoryService categoryService, IPaymentMethodService paymentMethodService)
        {
            this.categoryService = categoryService;
            this.paymentMethodService = paymentMethodService;
        }

        //    public async Task<ImportResultDTO> ImportAsync(IFormFile file, int userId)
        //    {
        //        if (file == null || file.Length == 0) throw new BadRequestException("Debe adjuntar un archivo");

        //        var extension = Path.GetExtension(file.FileName).ToLower();
        //        if (extension != ".xlsx")
        //            throw new BadRequestException("Solo se permiten archivos .xlsx");

        //        var resultado = new ImportResultDTO();

        //        using var stream = file.OpenReadStream();
        //        using var workbook = new XLWorkbook(stream);
        //        var hoja = workbook.Worksheet(1);

        //        var filas = hoja.RowsUsed().Skip(1); // saltar el header
        //        var categorias = await _unitOfWork.Categorias.GetByUsuarioIdAsync(usuarioId);
        //        var metodosPago = await _unitOfWork.MetodosPago.GetByUsuarioIdAsync(usuarioId);

        //        var gastosValidos = new List<Gasto>();

        //        foreach (var fila in filas)
        //        {
        //            resultado.TotalFilas++;
        //            var numeroFila = fila.RowNumber();

        //            var datosOriginales = new Dictionary<string, string>
        //            {
        //                ["Fecha"] = fila.Cell(1).GetString(),
        //                ["Monto"] = fila.Cell(2).GetString(),
        //                ["Categoria"] = fila.Cell(3).GetString(),
        //                ["MetodoPago"] = fila.Cell(4).GetString(),
        //                ["Descripcion"] = fila.Cell(5).GetString()
        //            };

        //            // Validación de formato
        //            if (!DateTime.TryParse(fila.Cell(1).GetString(), out var fecha))
        //            {
        //                resultado.Errores.Add(new ImportacionErrorDto
        //                {
        //                    Fila = numeroFila,
        //                    Mensaje = "Fecha inválida o vacía",
        //                    DatosOriginales = datosOriginales
        //                });
        //                continue;
        //            }

        //            if (!decimal.TryParse(fila.Cell(2).GetString(), out var monto) || monto <= 0)
        //            {
        //                resultado.Errores.Add(new ImportacionErrorDto
        //                {
        //                    Fila = numeroFila,
        //                    Mensaje = "El monto debe ser un número positivo",
        //                    DatosOriginales = datosOriginales
        //                });
        //                continue;
        //            }

        //            // Validación de reglas de negocio (existencia)
        //            var nombreCategoria = fila.Cell(3).GetString().Trim();
        //            var categoria = categorias.FirstOrDefault(c =>
        //                c.Nombre.Equals(nombreCategoria, StringComparison.OrdinalIgnoreCase));

        //            if (categoria == null)
        //            {
        //                resultado.Errores.Add(new ImportacionErrorDto
        //                {
        //                    Fila = numeroFila,
        //                    Mensaje = $"La categoría '{nombreCategoria}' no existe",
        //                    DatosOriginales = datosOriginales
        //                });
        //                continue;
        //            }

        //            var nombreMetodoPago = fila.Cell(4).GetString().Trim();
        //            var metodoPago = metodosPago.FirstOrDefault(m =>
        //                m.Nombre.Equals(nombreMetodoPago, StringComparison.OrdinalIgnoreCase));

        //            if (metodoPago == null)
        //            {
        //                resultado.Errores.Add(new ImportacionErrorDto
        //                {
        //                    Fila = numeroFila,
        //                    Mensaje = $"El método de pago '{nombreMetodoPago}' no existe",
        //                    DatosOriginales = datosOriginales
        //                });
        //                continue;
        //            }

        //            // Fila válida
        //            gastosValidos.Add(new Gasto
        //            {
        //                Fecha = fecha,
        //                Monto = monto,
        //                CategoriaId = categoria.Id,
        //                MetodoPagoId = metodoPago.Id,
        //                Descripcion = fila.Cell(5).GetString(),
        //                UsuarioId = usuarioId
        //            });
        //        }

        //        // Inserción masiva de solo las filas válidas
        //        foreach (var gasto in gastosValidos)
        //            await _unitOfWork.Gastos.AddAsync(gasto);

        //        await _unitOfWork.SaveChangesAsync();

        //        resultado.FilasExitosas = gastosValidos.Count;
        //        resultado.FilasConError = resultado.Errores.Count;

        //        return resultado;
        //    }
        //}
    }
}
