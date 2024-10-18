import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MenuExamen() {
  const [examen, setExamen] = useState(null);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartExam = async () => {
    const id = 20; // Puedes ajustar el ID según necesites
    try {
      const response = await fetch(`http://localhost:3000/api/v1/examen-master/informacion/${id}`);
      const data = await response.json();
      setExamen(data);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  const handleFinishExam = () => {
    if (!examen || !examen.series) {
      return;
    }

    let totalScore = 0;
    let allAnswered = true;

    examen.series.forEach((serie, serieIndex) => {
      serie.preguntas.forEach((pregunta, preguntaIndex) => {
        const selectedOption = document.querySelector(
          `input[name="pregunta-${serieIndex}-${preguntaIndex}"]:checked`
        );

        if (selectedOption) {
          // Encuentra la respuesta seleccionada y verifica si es correcta
          const selectedAnswer = pregunta.respuestas.find(
            (respuesta) => respuesta.descripcion_respuesta === selectedOption.value
          );

          if (selectedAnswer && selectedAnswer.esCorrecta) {
            totalScore++;
          }
        } else {
          allAnswered = false;
        }
      });
    });

    if (!allAnswered) {
      toast.error("Por favor, contesta todas las preguntas antes de finalizar el examen.");
    } else {
      setTotalScore(totalScore);
      setIsExamFinished(true);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.assign("/portal/menu-sistema");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ToastContainer />

      {!examen ? (
        <div className="mt-8 w-[900px]">
          <p className="font-bold text-[20px] text-primary">
            Instrucciones generales:{" "}
            <span className="font-normal">
              Conteste las siguientes preguntas seleccionando las respuestas correctas. Si cierra este examen en el navegador, quedará automáticamente anulado.
            </span>
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleStartExam}
              className="bg-[#142957] font-normal text-white border-2 border-transparent rounded-[20px] text-lg cursor-pointer transition duration-300 ease-in-out h-[50px] w-[85%] lg:w-[300px] hover:bg-white hover:text-primary hover:border-primary"
            >
              Iniciar Evaluación
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[900px] mt-2 space-y-10">
          {/* Información del Examen */}
          <div className="bg-white p-7 rounded-lg border shadow-sm">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex items-center">
                <span className="font-bold text-[20px] text-primary">Fecha de Evaluación:</span>
                <span className="ml-2 text-[20px]">{examen.fecha_evaluacion || "No disponible"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-[20px] text-primary">Punteo:</span>
                <span className="ml-2 text-[20px]">{examen.punteo_maximo || "No disponible"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-[20px] text-primary">Motivo del Examen:</span>
                <span className="ml-2 text-[20px]">{examen.motivo_examen || "No disponible"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-[20px] text-primary">Tipo de Examen:</span>
                <span className="ml-2 text-[20px]">{examen.tipo_examen || "No disponible"}</span>
              </div>
            </div>
          </div>

          {/* Series del Examen */}
          {examen.series && examen.series.map((serie, index) => (
            <div key={index} className="bg-white p-7 rounded-lg border shadow-sm mt-8">
              <h3 className="text-[20px] font-bold text-primary">{serie.serie}</h3>
              <p className="text-[18px] text-primary mt-2">
                <span className="font-bold">Instrucciones:</span> {serie.instrucciones}
              </p>

              {/* Preguntas de la Serie */}
              {serie.preguntas && serie.preguntas.map((pregunta, preguntaIndex) => (
                <div key={preguntaIndex} className="mt-6">
                  <p className="font-semibold text-[18px] text-primary">{pregunta.descripcion_pregunta}</p>
                  <div className="mt-3 grid grid-cols-3 gap-x-4">
                    {pregunta.respuestas && pregunta.respuestas.map((respuesta, respuestaIndex) => (
                      <label key={respuestaIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`pregunta-${index}-${preguntaIndex}`}
                          value={respuesta.descripcion_respuesta}
                          className="appearance-none border border-primary rounded-full w-5 h-5 checked:bg-primary checked:border-transparent checked:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                          disabled={isExamFinished}
                        />
                        <span className="text-primary">{respuesta.descripcion_respuesta}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Botón para finalizar la evaluación */}
          {!isExamFinished && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleFinishExam}
                className="bg-[#142957] font-normal text-white border-2 border-transparent rounded-[20px] text-lg cursor-pointer transition duration-300 ease-in-out h-[50px] w-[85%] lg:w-[300px] hover:bg-white hover:text-primary hover:border-primary"
              >
                Finalizar Evaluación
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal para mostrar la puntuación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg">
            {/* Encabezado del Modal */}
            <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
              <h2 className="font-page font-semibold text-[25px]">
                Resultado del Examen
              </h2>
              <img
                src="/EMDN1.png"
                alt="Logo"
                className="h-14"
              />
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 text-center">
              <p className="text-lg text-primary mb-8">
                Has obtenido {totalScore} de un total de {examen?.punteo_maximo} puntos.
              </p>
              <button
                onClick={handleCloseModal}
                className="bg-[#142957] text-white font-semibold rounded-lg px-6 py-2 hover:bg-white hover:text-primary hover:border hover:border-primary"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuExamen;
