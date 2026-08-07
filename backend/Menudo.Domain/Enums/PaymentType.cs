using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;

namespace Menudo.Domain.Enums
{
    public enum PaymentType
    {
        Transfer,
        Cash,
        DebitCard,
        CreditCard,
        VirtualWallet
    }
}
