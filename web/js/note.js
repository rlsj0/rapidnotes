class Note {


    async getNotesByUserId(userid, callback) {
        return await fetch(`http://localhost:5207/Note/notes/${userid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                if (callback){
                    console.log("Realizando función callback")
                    callback(data);
                }
                return data;});
    }

    

    async addNote(userId, title, text, priority, callback) {
        return await fetch("http://localhost:5207/Note", {
            method: "POST",
            body: JSON.stringify({
                "userId": userId,
                "title": title,
                "text": text,
                "priority": priority,
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)  
                
                if (callback){
                    console.log("Realizando función callback")
                    callback();
                }
            });
    }


    modifyNote(id, title, text, priority, isActive) {
        fetch(`http://localhost:5207/Note/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": title,
                "text": text,
                "priority": priority,
                "isActive": isActive,
            }),
        }).then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    deleteNote(id) {
        fetch(`http://localhost:5207/Note/${id}`, {
            method: "DELETE",
        }).catch((error) => console.log(error));
    }

    async searchNote(userId, title, creationDate, priority, isActive) {
        return await fetch(
            `http://localhost:5207/Note/search/${userId}?title=${title}&creationDate=${creationDate}&priority=${priority}&IsActive=${isActive}`,
        )
            .then((response) => response.json)
            .then((data) => console.log(data));
    }
}

export default Note;
