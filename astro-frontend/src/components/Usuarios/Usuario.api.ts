
export async function getUsuarioDpi(dpi: string){
    const response = await fetch(`http://localhost:3000/api/v1/usuario/${dpi}`);
    return await response.json();
}



export async function createUsuario(newUsuario: any){

    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario)
    })

    const data = await response.json();

    console.log(data);
}

export async function updateUsuario(dpi: string, newUsuario: any){
  const response = await fetch(`http://localhost:3000/api/v1/usuario/${dpi}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario)
    }); 

    return await response.json();
}

export async function desactiveUsuario(dpi: string){
    const res = await fetch(`http://localhost:3000/api/v1/usuario/${dpi}/estado`, {
        method: 'PATCH',
    });

    return await res.json();
}