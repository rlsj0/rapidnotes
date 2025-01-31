namespace Models;

public class Note
{

    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public int Priority { get; set; }
    public DateTime CreationDate { get; set; }
    public bool IsActive { get; set; }

    public Note()
    {
    }

    public Note(int userid, string title, string text, int priority)
    {
        UserId = userid;
        Title = title;
        Text = text;
        Priority = priority;
        CreationDate = DateTime.Now;
        IsActive = true;
    }

    public Note(int id, int userid, string title, string text, int priority, DateTime creationdate, bool isactive)
    {
        Id = id;
        UserId = userid;
        Title = title;
        Text = text;
        Priority = priority;
        CreationDate = creationdate;
        IsActive = isactive;
    }

}
