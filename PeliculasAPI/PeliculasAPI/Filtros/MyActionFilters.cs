using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Filtros
{
    public class MyActionFilters : IActionFilter
    {
        
        //antes de ejecutar la accion
        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine(" Antes de la accion");
           // throw new NotImplementedException();
        }
        //Despues de ejecutar la acción
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("Despues de una accion");
           // throw new NotImplementedException();
        }
    }
       

        
}
