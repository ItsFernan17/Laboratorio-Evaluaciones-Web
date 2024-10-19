import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAsignacion, updateAsignacion } from "./Asignaciones.api";

export function NewAsignacion({
  codigo_asignacion = null,
  onClose = null,
  onUserSaved = null
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [toastMessage, setToastMessage] = useState(null);
  const [examenData, setExamenData] = useState(null);
  const [codigoExamen, setCodigoExamen] = useState(null);

  useEffect(() => {
    const fetchExamenData = async () => {
      if (codigoExamen) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/examen/${codigoExamen}`
          );
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

  useEffect(() => {
    const fetchEmpleoData = async () => {
      if (codigo_asignacion) {
        try {
          const empleoResponse = await fetch(
            `http://localhost:3000/api/v1/asignacion/${codigo_asignacion}`
          );
          if (empleoResponse.ok) {
            const empleoData = await empleoResponse.json();
            reset({
              codigo_examen: empleoData.examen.codigo_examen,
              evaluado: empleoData.evaluado.dpi,
            });
          }
        } catch (error) {
          toast.error("Error al cargar los datos del empleo");
        }
      }
    };

    fetchEmpleoData();
  }, [codigo_asignacion, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    if (codigo_asignacion) {
      try {
        await updateAsignacion(codigo_asignacion, {
          evaluado: formData.evaluado,
          evaluacion: parseInt(formData.examen),
          punteo: null,
          usuario_modifica: localStorage.usuario,
        });

        toast.success("Asignación actualizada exitosamente!", {
          autoClose: 1500,
        });

        setTimeout(() => {
          onUserSaved();
          onClose();
        }, 1500);

      } catch (error) {
        console.error("Error al actualizar la asignación:", error);
        toast.error("Error al actualizar la asignación, intente nuevamente");
      }

    } else {
      try {
        const response = await createAsignacion({
          evaluado: formData.evaluado,
          examen: parseInt(formData.examen),
          usuario_ingreso: localStorage.usuario,
        });

        toast.success("Asignación creada exitosamente!", {
          autoClose: 1500,
        });

        setTimeout(() => {
          onUserSaved();
          onClose();
        }, 1500);
      } catch (error) {
        console.error("Error al crear la asignación:", error);

        // Si el error es un conflicto (409), mostrar el mensaje adecuado y limpiar los datos del examen
        if (error.statusCode === 409) {
          toast.error("El evaluado ya tiene asignado este examen.", {
            autoClose: 3000,
          });
          setExamenData(null); // Limpiar los datos del examen en caso de conflicto
        } else {
          toast.error("Error al crear la asignación, intente nuevamente.", {
            autoClose: 3000,
          });
        }
      } finally {
        reset(); // Reseteamos el formulario
      }
    }
  });

  return (
    <div>
      <ToastContainer />
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        onSubmit={onSubmit}
      >
        <div className="mt-4">
          <label
            htmlFor="examen"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Código del Examen
          </label>
          <input
            type="number"
            id="examen"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            placeholder="Ingrese el código del examen"
            {...register("examen", {
              required: "*El código del examen es requerido",
            })}
            onChange={(e) => setCodigoExamen(e.target.value)}
          />
          {errors.examen && (
            <p className="text-red-900 text-sm mb-0">{errors.examen.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="evaluado"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Evaluado
          </label>
          <input
            type="text"
            id="evaluado"
            placeholder="Ingrese DPI del evaluado"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            {...register("evaluado", { required: "*El evaluado es requerido" })}
          />
          {errors.evaluado && (
            <p className="text-red-900 text-sm mb-0">
              {errors.evaluado.message}
            </p>
          )}
        </div>

        {/* Mostrar los datos del examen solo si hay datos válidos */}
        {codigoExamen && examenData && (
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
                  <td>{examenData?.fecha_evaluacion || "N/A"}</td>
                  <td>{examenData?.tipo_examen?.description || "N/A"}</td>
                  <td>{examenData?.motivo_examen?.nombre_motivo || "N/A"}</td>
                  <td>{examenData?.punteo_maximo || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="col-span-full flex justify-center">
          {codigo_asignacion ? (
            <div className="flex justify-end space-x-4 mb-3 w-full">
              <button
                type="submit"
                className="bg-[#0f763d] mt-2 font-bold font-page mb-2 text-white border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out h-[35px] w-[150px] md:w-[120px] hover:bg-white hover:text-[#0f763d] hover:border-[#0f763d]"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#ED8080] mt-2 font-bold font-page mb-2 text-[#090000] border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out h-[35px] w-[150px] md:w-[120px] hover:bg-white hover:text-[#090000] hover:border-[#ED8080]"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="bg-[#142957] mt-2 font-normal font-page mb-10 text-white border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out  h-[40px] md:w-[300px]  hover:bg-white hover:text-primary hover:border-primary"
              >
                Crear Asignación
              </button>
              {toastMessage && <div>{toastMessage}</div>}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
