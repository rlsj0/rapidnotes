class User {

    async getUserById(id) {
        return await fetch(`http://localhost:5207/User/${id}`)
            .then(response => response.json)
            .then(datos => { return (datos) })
            .catch(error => console.log(error))
    }

    static addNewUser(name, email, password) {
        fetch(`http://localhost:5207/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
            })
        })
            .then(response => response.json())
            .then(datos => console.log(datos))

    }

    //  static loginUser(email, password) {
    //     fetch(`http://localhost:5207/Auth/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           email,password
    //         })
    //     })

    //         .then(response => response.json())
    //         .then(datos =>  {
    //             console.log(datos)
    //             return datos;})
            
    // }

    static async loginUser(email, password) {
        try {
            const response = await fetch(`http://localhost:5207/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error("Error en la autenticación"); // Manejo de error
            }
    
            //const datos = await response.json();
            console.log(response);
            //console.log(datos);
            return response.json();; // Ahora sí devuelve los datos correctamente
        } catch (error) {
            console.error("Error en loginUser:", error);
            return null; // Retorna `null` en caso de error
        }
    }

    modifyUser(id, name, email, password, createDate, softDelete) {
        console.log(id);
        fetch(`http://localhost:5207/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "name": name,
                "email": email,
                "password": password,
                "createDate": createDate,
                "softDelete": softDelete
            })
        }).then(response => console.log(response))
            .catch(error => console.log(error))
    }

    deleteUser(id) {
        fetch(`http://localhost:5207/User/${id}`, {
            method: 'DELETE',
        }).catch(error => console.log(error))
    }
}


export default User;