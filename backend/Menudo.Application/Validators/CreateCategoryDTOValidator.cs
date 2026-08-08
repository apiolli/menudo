using FluentValidation;
using Menudo.Application.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Validators
{
    public class CreateCategoryDTOValidator : AbstractValidator<CreateCategoryDTO>
    {
        public CreateCategoryDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre de la categoria no puede estar vacio.")
                .Length(3, 25).WithMessage("El nombre debe de tener entre 3 y 25 caracteres.");

            RuleFor(x => x.Budget)
                .NotEmpty().WithMessage("El presupuesto no puede estar vacio.")
                .GreaterThan(0).WithMessage("El presupuesto debe de ser mayor que 0");

            RuleFor(x => x.Icon)
                .NotEmpty().WithMessage("El icono de la categoria no puede estar vacio.");

            RuleFor(x => x.Color)
                .NotEmpty().WithMessage("El color de la categoria no puede estar vacio.");

        }
    }
}
