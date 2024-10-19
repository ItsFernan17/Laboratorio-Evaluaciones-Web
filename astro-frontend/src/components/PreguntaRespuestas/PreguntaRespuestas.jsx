import React, { useState, useEffect } from 'react';

function PreguntaRespuesta() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  // const [usuarioIngreso, setUsuarioIngreso] = useState(''); // Comentado si deseas fijar el usuario
  const usuarioIngreso = '1'; // Usuario de ingreso, puesto a '1' y dejado comentado

  // Obtener la lista de preguntas al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/pregunta-respuesta') // Asegúrate de que esta URL sea correcta
      .then((res) => res.json())
      .then((data) => setPreguntas(data))
      .catch((error) => console.error('Error al obtener preguntas:', error));
  }, []);

  // Obtener la lista de respuestas al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/respuesta') // Asegúrate de que esta URL sea correcta
      .then((res) => res.json())
      .then((data) => setRespuestas(data))
      .catch((error) => console.error('Error al obtener respuestas:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pregunta: parseInt(preguntaSeleccionada),
      respuesta: parseInt(respuestaSeleccionada),
      usuario_ingreso: usuarioIngreso,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/pregunta-respuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Pregunta Respuesta creada:', result);
        alert('Pregunta Respuesta creada exitosamente');
        // Reiniciar el formulario
        setPreguntaSeleccionada('');
        setRespuestaSeleccionada('');
        // setUsuarioIngreso('');
      } else {
        const errorData = await response.json();
        console.error('Error al crear la Pregunta Respuesta:', errorData);
        alert('Error al crear la Pregunta Respuesta: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Nueva Pregunta Respuesta</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Pregunta:</label>
        <select
          value={preguntaSeleccionada}
          onChange={(e) => setPreguntaSeleccionada(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Seleccione una pregunta</option>
          {preguntas.map((pregunta) => (
            <option key={pregunta.codigo_pregunta} value={pregunta.codigo_pregunta}>
              {pregunta.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Respuesta:</label>
        <select
          value={respuestaSeleccionada}
          onChange={(e) => setRespuestaSeleccionada(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Seleccione una respuesta</option>
          {respuestas.map((respuesta) => (
            <option key={respuesta.codigo_respuesta} value={respuesta.codigo_respuesta}>
              {respuesta.respuesta}
            </option>
          ))}
        </select>
      </div>
      {/* Comentado si estableces el usuario_ingreso fijo
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
      */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Crear Pregunta Respuesta
      </button>
    </form>
  );
}

export default PreguntaRespuesta;
