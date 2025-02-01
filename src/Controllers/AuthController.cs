using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    /*[HttpPost("login")]*/
    /*public IActionResult Login*/

}

