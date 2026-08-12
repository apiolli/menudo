using Menudo.Application.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Interfaces
{
    public interface IDashboardService
    {
        DashboardDTO GetDashboardData();
    }
}
