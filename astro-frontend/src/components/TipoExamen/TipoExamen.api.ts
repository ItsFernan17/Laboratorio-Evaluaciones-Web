// Definimos los tipos de los datos que vamos a manejar
export interface TipoExamen {
    codigo_tipoE?: number;
    descripcion: string;
    ceom: string;
    usuario_ingreso?: string;
    usuario_modifica?: string;
    estado?: boolean;
  }

   
  // Función para obtener un tipo de examen por su código
  export async function getTipoExamenByCodigo(codigo_tipoE: number): Promise<TipoExamen> {
    const response = await fetch(`http://localhost:3000/api/v1/tipo-examen/${codigo_tipoE}`);
    if (!response.ok) {
      throw new Error('Error al obtener el tipo de examen');
    }
    return await response.json();
  }
  
  // Función para crear un nuevo tipo de examen
  export async function createTipoExamen(newTipoExamen: TipoExamen): Promise<TipoExamen> {
    const response = await fetch('http://localhost:3000/api/v1/tipo-examen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTipoExamen),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear el tipo de examen');
    }
  
    return await response.json();
  }
  
  // Función para actualizar un tipo de examen existente
  export async function updateTipoExamen(codigo_tipoE: number, updatedTipoExamen: Partial<TipoExamen>): Promise<TipoExamen> {
    const response = await fetch(`http://localhost:3000/api/v1/tipo-examen/${codigo_tipoE}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTipoExamen),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el tipo de examen');
    }
  
    return await response.json();
  }
  
  // Función para desactivar un tipo de examen (cambiar estado a false)
  export async function desactiveTipoExamen(codigo_tipoE: number): Promise<{ message: string }> {
    const response = await fetch(`http://localhost:3000/api/v1/tipo-examen/${codigo_tipoE}/estado`, {
      method: 'PATCH',
    });
  
    if (!response.ok) {
      throw new Error('Error al desactivar el tipo de examen');
    }
  
    return await response.json();
  }
  