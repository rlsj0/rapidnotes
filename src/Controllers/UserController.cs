using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "User")]
    public IEnumerable<User> Get()
    {
        return UserServices.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var user = UserServices.Get(id);

        if (user == null)
            return NotFound();

        return user;
    }

    [HttpPost(Name = "User")]
    public IActionResult Create(User user)
    {
        UserServices.Add(user);
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, User user)
    {
        if (id != user.Id)
            return BadRequest();

        var existingUser = UserServices.Get(id);
        if (existingUser is null)
            return NotFound();

        UserServices.Update(user);
        return Ok(user);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = UserServices.Get(id);
       
        if (user is null)
            return NotFound();

        UserServices.Delete(id);

        return Ok(id);
    }
}
