using FluentValidation;
using Menudo.Application.DTOs.PaymentMethod;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Validators.PaymentMethod
{
    public class UpdatePaymentMethodDTOValidator : AbstractValidator<UpdatePaymentMethodDTO>
    {
        public UpdatePaymentMethodDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre de la categoria es obligatorio.")
                .Length(5, 40).WithMessage("El nombre debe tener entre 5 y 40 caracteres.");

            RuleFor(x => x.Type)
                .NotEmpty().WithMessage("El tipo de metodo de pago es obligatori.")
                .IsInEnum()
                .WithMessage("El metodo de pago enviado no es válido dentro del catálogo de metodos.");

            RuleFor(x => x.Detail)
                .MinimumLength(5).WithMessage("El detalle debe de tener minimo 5 caracteres.");

            RuleFor(x => x.Icon)
                .NotEmpty().WithMessage("El icono del metodo de pago no puede estar vacio.");

            RuleFor(x => x.Color)
                .NotEmpty().WithMessage("El color del metodo de pago no puede estar vacio.");
        }
    }
}
