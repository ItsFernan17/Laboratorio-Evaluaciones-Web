export async function createExamen(newExamen: any){

    const response = await fetch('http://localhost:3000/api/v1/examen-master/crear-examen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExamen)
    })

    const data = await response.json();

    console.log(data);
}


export async function updateExamen(codigo_examen: number, newExamen: any){
    const response = await fetch(`http://localhost:3000/api/v1/examen-master/actualizar/${codigo_examen}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newExamen)
      }); 
  
      return await response.json();
  }


  export async function desactiveExamen(codigo_examen: number){
    const res = await fetch(`http://localhost:3000/api/v1/examen-master/anular/${codigo_examen}/estado`, {
        method: 'PATCH',
    });

    return await res.json();
}