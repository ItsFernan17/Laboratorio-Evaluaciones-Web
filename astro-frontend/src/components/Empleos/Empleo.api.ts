export async function getEmpleoCEOM(ceom: string){
    const response = await fetch(`http://localhost:3000/api/v1/empleo/${ceom}`);
    return await response.json();
}

export async function createEmpleo(newEmpleo: any){
    const response = await fetch('http://localhost:3000/api/v1/empleo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmpleo)
    })

    const data = await response.json();

    console.log(data);
}

export async function updateEmpleo(ceom: string, newEmpleo: any){
    const response = await fetch(`http://localhost:3000/api/v1/empleo/${ceom}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEmpleo)
      }); 
  
      return await response.json();
  }

  export async function desactiveEmpleo(ceom: string){
    const res = await fetch(`http://localhost:3000/api/v1/empleo/${ceom}/estado`, {
        method: 'PATCH',
    });

    return await res.json();
}

