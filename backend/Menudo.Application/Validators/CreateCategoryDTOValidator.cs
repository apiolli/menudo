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

        }
    }
}
