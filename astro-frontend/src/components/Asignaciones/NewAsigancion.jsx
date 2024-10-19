import React, { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createAsignacion} from './Asignaciones.api'

export function NewAsignacion({ codigo_asignacion = null, onClose = null, onUserSaved = null }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [toastMessage, setToastMessage] = useState(null);
  const [examenData, setExamenData] = useState(null);
  const [codigoExamen, setCodigoExamen] = useState(null);

  // Fetch exam data when the exam code changes
  useEffect(() => {
    const fetchExamenData = async () => {
      if (codigoExamen) {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/examen/${codigoExamen}`);
          if (response.ok) {
            const data = await response.json();
            setExamenData(data);
          } else {
            toast.error("Error al cargar los datos del examen");
          }
        } catch (error) {
          toast.error("Error al conectar con el servidor");
        }
      }
    };

    fetchExamenData();
  }, [codigoExamen]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await createAsignacion({
        evaluado: formData.evaluado, 
        examen: parseInt(formData.examen), // corregido 'parseInt'
        usuario_ingreso: "apurg"
      });
  
      toast.success("Asignación actualizada exitosamente!", { autoClose: 1500 });
  
      setTimeout(() => {
        onUserSaved();
        onClose();
      }, 1500);
  
    } catch (error) {
      console.error("Error:", error); // Mostrar el error en consola
      toast.error("Error al actualizar el usuario, intente nuevamente");
    }
  });
  
  

  return (
    <div>
      <ToastContainer />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2" onSubmit={onSubmit}>
        <div className="mt-4">
          <label htmlFor="examen" className="block text-[16px] font-page font-semibold text-primary">
            Código del Examen
          </label>
          <input
            type="number"
            id="examen"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            placeholder="Ingrese el código del examen"
            {...register("examen", { required: "*El código del examen es requerido" })}
            onChange={(e) => setCodigoExamen(e.target.value)}
          />
          {errors.examen && <p className="text-red-900 text-sm mb-0">{errors.examen.message}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="evaluado" className="block text-[16px] font-page font-semibold text-primary">
            Evaluado
          </label>
          <input
            type="text"
            id="evaluado"
            placeholder="Ingrese DPI del evaluado"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            {...register("evaluado", { required: "*El evaluado es requerido" })}
          />
          {errors.evaluado && <p className="text-red-900 text-sm mb-0">{errors.evaluado.message}</p>}
        </div>

        {/* Display examen data if available */}
        {examenData && (
          <div className="col-span-full mt-4">
            <table className="table-auto w-full text-left text-primary">
              <thead>
                <tr>
                  <th>Fecha Evaluación</th>
                  <th>Tipo de Examen</th>
                  <th>Motivo del Examen</th>
                  <th>Punteo Máximo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{examenData.fecha_evaluacion}</td>
                  {/* Using relaciones for Tipo Examen and Motivo */}
                  <td>{examenData.tipo_examen.description}</td>
                  <td>{examenData.motivo_examen.nombre_motivo}</td>
                  <td>{examenData.punteo_maximo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            className="bg-[#142957] mt-2 font-normal font-page mb-10 text-white border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out h-[40px] md:w-[300px] hover:bg-white hover:text-primary hover:border-primary"
          >
            Asignar Examen
          </button>
          {toastMessage && <div>{toastMessage}</div>}
        </div>
      </form>
    </div>
  );
}
