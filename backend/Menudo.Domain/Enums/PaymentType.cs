using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;

namespace Menudo.Domain.Enums
{
    public enum PaymentType
    {
        Transfer = 1,
        Cash = 2,
        DebitCard = 3,
        CreditCard = 4,
        VirtualWallet = 5
    }
}
