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
