namespace Models;

public class Note
{

    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public int Priority { get; set; }
    public DateTime CreationDate { get; set; }
    public bool IsActive { get; set; }

    public Note()
    {
    }

    public Note(int id, string title, string text, int priority, DateTime creationdate, bool isactive)
    {
        Id = id;
        Title = title;
        Text = text;
        Priority = priority;
        CreationDate = creationdate;
        IsActive = isactive;
    }

}
