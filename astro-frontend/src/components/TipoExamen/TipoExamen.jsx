import React, { useState, useEffect } from 'react';

function TipoExamen() {
  // Estados para gestionar los datos del formulario y la lista de tipos de examen
  const [descripcion, setDescripcion] = useState(''); // Descripción del tipo de examen
  const [ceom, setCeom] = useState(''); // CEOM asociado
  const [usuarioIngreso, setUsuarioIngreso] = useState('apurg'); // Usuario que ingresa el registro
  const [usuarioModifica, setUsuarioModifica] = useState('apurg'); // Usuario que modifica el registro
  const [tiposExamen, setTiposExamen] = useState([]); // Lista de tipos de examen obtenidos del servidor
  const [editando, setEditando] = useState(false); // Estado para saber si estamos en modo edición
  const [idEditando, setIdEditando] = useState(null); // ID del tipo de examen que se está editando
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para obtener todos los tipos de examen desde el servidor
  const obtenerTiposExamen = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/tipo-examen');
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      const data = await response.json();
      console.log('Datos recibidos:', data); // Añadido para debug
      setTiposExamen(data); // Almacenar los tipos de examen en el estado
    } catch (error) {
      console.error('Error al obtener los tipos de examen:', error);
      setError('Hubo un problema al cargar los datos. Intente nuevamente.');
    }
  };

  // useEffect para cargar los tipos de examen cuando se carga el componente
  useEffect(() => {
    obtenerTiposExamen(); // Obtener los datos al montar el componente
  }, []);

  // Función que maneja el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    let data = {
      descripcion,
      ceom,
    };

    if (!editando) {
      // Incluir el usuario de ingreso solo al crear un nuevo tipo de examen
      data = {
        ...data,
        usuario_ingreso: usuarioIngreso,
      };
    } else {
      // Incluir el usuario que modifica solo en la actualización
      data = {
        ...data,
        usuario_modifica: usuarioModifica,
      };
    }

    try {
      let response;
      if (editando) {
        // Si estamos editando, hacemos una petición PUT para actualizar el tipo de examen
        response = await fetch(`http://localhost:3000/api/v1/tipo-examen/${idEditando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Si no estamos editando, hacemos una petición POST para crear un nuevo tipo de examen
        response = await fetch('http://localhost:3000/api/v1/tipo-examen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        const result = await response.json();
        alert(editando ? 'Tipo de examen actualizado exitosamente' : 'Tipo de examen creado exitosamente');
        obtenerTiposExamen(); // Actualizar la lista de tipos de examen
        // Reiniciar el formulario
        setDescripcion('');
        setCeom('');
        setEditando(false);
        setIdEditando(null);
      } else {
        const errorData = await response.json();
        alert('Error al guardar el tipo de examen: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert('Error en la solicitud: ' + error.message);
    }
  };

  // Función que gestiona la edición de un tipo de examen
  const manejarEdicion = (tipo) => {
    setDescripcion(tipo.description); // Cargar la descripción en el formulario
    setCeom(tipo.ceom.ceom); // Asegúrate de acceder a la propiedad correcta de ceom
    setEditando(true); // Activar modo edición
    setIdEditando(tipo.codigo_tipoE); // Guardar el ID del tipo de examen que estamos editando
  };

  // Función que gestiona la eliminación de un tipo de examen
  const manejarEliminar = async (id) => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este tipo de examen?');
    if (confirmarEliminacion) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/tipo-examen/${id}/estado`, {
          method: 'PATCH', // Usamos PATCH para desactivar
        });

        if (response.ok) {
          alert('Tipo de examen eliminado exitosamente');
          obtenerTiposExamen(); // Actualizar la lista después de eliminar
        } else {
          alert('Error al eliminar el tipo de examen');
        }
      } catch (error) {
        alert('Error en la solicitud: ' + error.message);
      }
    }
};



  return (
    <div>
      {/* Si hay un error al cargar los datos, mostrar el mensaje */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para crear o editar un tipo de examen */}
      <form onSubmit={manejarEnvio} className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editando ? 'Editar Tipo de Examen' : 'Crear Nuevo Tipo de Examen'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CEOM:</label>
          <input
            type="text"
            value={ceom}
            onChange={(e) => setCeom(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {!editando && (
          <div className="mb-6">
            <label className="block text-gray-700">Usuario de Ingreso:</label>
            <input
              type="text"
              value={usuarioIngreso}
              onChange={(e) => setUsuarioIngreso(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}

        {editando && (
          <div className="mb-6">
            <label className="block text-gray-700">Usuario que Modifica:</label>
            <input
              type="text"
              value={usuarioModifica}
              onChange={(e) => setUsuarioModifica(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editando ? 'Actualizar Tipo de Examen' : 'Crear Tipo de Examen'}
        </button>
      </form>

      {/* Tabla para mostrar la lista de tipos de examen */}
      <div className="mt-8 flex justify-center">
        <div className="w-[90%]">
          <h2 className="text-xl font-bold mb-4 text-center">Lista de Tipos de Examen</h2>
          <table className="w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Descripción</th>
                <th className="py-2 px-4 border">CEOM</th>
                <th className="py-2 px-4 border w-[400px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiposExamen.map((tipo) => (
                <tr key={tipo.codigo_tipoE}>
                  {/* Mostrar la descripción del tipo de examen */}
                  <td className="py-2 px-4 border">
                    {tipo.description ? `${tipo.description}` : 'Descripcion no disponible'}
                  </td>

                  {/* Mostrar el CEOM (empleo asociado) */}
                  <td className="py-2 px-4 border">
                    {tipo.ceom ? `${tipo.ceom.ceom}` : 'CEOM no disponible'}
                  </td>
            
                  <td className="py-2 px-4 flex border justify-center items-center space-x-2">
                    <button
                      onClick={() => manejarEdicion(tipo)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => manejarEliminar(tipo.codigo_tipoE)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TipoExamen;
