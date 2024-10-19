export async function createAsignacion(newAsignacion: any){
    const response = await fetch('http://localhost:3000/api/v1/asignacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsignacion)
    })

    if (!response.ok) {
        const errorData = await response.json(); // Obtener los datos de error
        throw errorData; // Lanzar los datos del error para que se capture en el bloque catch
      }

      const data = await response.json();

      console.log(data);
  
      return response;

}

export async function updateAsignacion(codigo_asignacion: number, newAsignacion: any){
    const response = await fetch(`http://localhost:3000/api/v1/asignacion/${codigo_asignacion}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAsignacion)
      }); 
  
      return await response.json();
  }

export async function desactiveAsignacion(codigo_asignacion: number){
    const res = await fetch(`http://localhost:3000/api/v1/asignacion/${codigo_asignacion}/estado`, {
        method: 'PATCH',
    });

    return await res.json();
}

