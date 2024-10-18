
export async function getEmpleoCEOM(id: number){
    const response = await fetch(`http://localhost:3000/api/v1/pregunta-respuesta/registrar-pregunta/preguntas/${id}`);
    return await response.json();
}


export async function createPregunta(newPregunta: any){
    const response = await fetch('http://localhost:3000/api/v1/pregunta-respuesta/registrar-pregunta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPregunta)
    })

    const data = await response.json();

    console.log(data);
}

export async function updatePregunta(id: number, newPregunta: any){
    const response = await fetch(`http://localhost:3000/api/v1/pregunta-respuesta/actualizar-pregunta/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPregunta)
      }); 
  
      return await response.json();
  }



export async function desactivePreguntaRespuesta(codigo_pregunta: number){
    const res = await fetch(`http://localhost:3000/api/v1/pregunta-respuesta/pregunta/${codigo_pregunta}/estado`, {
        method: 'PATCH',
    });

    return await res.json();
}