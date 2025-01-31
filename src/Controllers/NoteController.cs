using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class NoteController : ControllerBase
{
    private ILogger<NoteController> _logger;

    public NoteController(ILogger<NoteController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{id}")]
    public ActionResult<Note> Get(int id)
    {
        var note = NoteServices.Get(id);

        if (note == null)
            return NotFound();

        return note;
    }

    [HttpGet("notes/{id_user}")]
    public ActionResult<List<Note>> GetAllByUser(int id_user)
    {
        var note = NoteServices.GetAllByUser(id_user);

        if (note == null)
            return NotFound();

        return note;
    }

    [HttpPost(Name = "Note")]
    public IActionResult Create(Note note)
    {
        NoteServices.Add(note);
        return CreatedAtAction(nameof(Get), new { id = note.Id }, note);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Note note)
    {
        if (id != note.Id)
            return BadRequest();

        var existingNote = NoteServices.Get(id);
        if (existingNote is null)
            return NotFound();

        NoteServices.Update(note);
        return Ok(note);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var note = NoteServices.Get(id);

        if (note is null)
            return NotFound();

        NoteServices.Delete(id);

        return Ok(id);
    }

    [HttpGet("search/{idUser}")]
    public ActionResult<List<Note>> Search(int idUser, string? title, DateTime? creationDate, int? priority, bool? IsActive)
    {
        var note = NoteServices.Search(idUser, title, creationDate, priority, IsActive);

        if (note == null)
            return NotFound();

        return note;
    }

}