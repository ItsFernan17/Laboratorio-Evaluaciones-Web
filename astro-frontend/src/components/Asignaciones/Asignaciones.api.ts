export async function createAsignacion(newAsignacion: any){
    const response = await fetch('http://localhost:3000/api/v1/asignacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsignacion)
    })

    const data = await response.json();

    console.log(data);
}