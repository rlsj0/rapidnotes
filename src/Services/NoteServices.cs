namespace Services;

using Models;

public static class NoteServices
{
    static List<Note> Notes { get; }
    static int nextId = 1;
    static NoteServices()
    {
        Notes = new List<Note> { };
    }

    public static Note? Get(int id) => Notes.FirstOrDefault(p => p.Id == id);

    public static List<Note>? GetAllByUser(int userid) => Notes.Where(p => p.UserId == userid).ToList<Note>();

    public static void Add(Note note)
    {
        note.Id = nextId++;
        Notes.Add(note);
    }

    public static void Delete(int id)
    {
        var note = Get(id);
        if (note is null)
            return;

        Notes.Remove(note);
    }

    public static void Update(Note note)
    {
        var index = Notes.FindIndex(p => p.Id == note.Id);
        if (index == -1)
            return;

        Notes[index] = note;
    }

    public static List<Note>? Search(int idUser, string? title, DateTime? creationDate, int? priority, bool? IsActive)
    {
        var searchNote = Notes.Where(note => note.UserId == idUser &&
            (
                (title == null || note.Title.Contains(title)) && 
                (creationDate == null || note.CreationDate == creationDate) &&
                (priority == null || note.Priority == priority) &&
                (IsActive == null || note.IsActive == IsActive)
            )
            ).ToList<Note>();

        return searchNote;
    }
}
