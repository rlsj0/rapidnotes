class Note {
    constructor() {
        this.baseUrl =
            `${window.location.protocol}//${window.location.hostname}:8080/Note`;
    }

    async getNoteById(noteid, callback) {
        return await fetch(`${this.baseUrl}/${noteid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de getNotesByIdNote",
                    );
                    callback(data);
                }
                return data;
            });
    }

    async getNotesByUserId(userid, callback) {
        return await fetch(`${this.baseUrl}/notes/${userid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de getNotes",
                    );
                    callback(data);
                }
                return data;
            });
    }

    async addNote(userId, title, text, priority, callback) {
        return await fetch(this.baseUrl, {
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
                console.log(data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de addNote",
                    );
                    callback();
                }
            });
    }

    modifyNote(id, userId, title, text, priority, isActive, callback) {
        fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": id,
                "userId": userId,
                "title": title,
                "text": text,
                "priority": priority,
                "creationDate": new Date(Date.now()).toISOString(),
                "isActive": isActive,
            }),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de modifyNote",
                    );
                    callback();
                }
            });
    }

    async deleteNote(id, callback) {
        return await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`,
                    );
                }

                console.log("Nota eliminada con éxito");

                return response.status === 204 ? null : response.json();
            })
            .then((data) => {
                console.log("Nota eliminada:" + data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de deleteNote",
                    );
                    callback();
                }
            })
            .catch((error) => {
                console.error("Error al eliminar la nota: " + error);
            });
    }

    async searchNote(
        userId,
        title,
        creationDate,
        priority,
        isActive,
        callback,
    ) {
        const url = new URL(`${this.baseUrl}/search/${userId}`);

        if (title) url.searchParams.append("title", title);
        if (creationDate) url.searchParams.append("creationDate", creationDate);
        if (priority) url.searchParams.append("priority", priority);
        if (isActive) url.searchParams.append("IsActive", isActive);

        return await fetch(url.toString())
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (callback) {
                    console.log(
                        "Realizando función callback después de searchNote",
                    );
                    callback(data);
                }
                return data;
            })
            .catch((error) => {
                console.error("Error al buscar: " + error);
            });
    }
}

export default Note;
