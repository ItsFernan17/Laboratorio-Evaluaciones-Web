import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createEmpleo, updateEmpleo } from "./Empleo.api";

export function NewEmpleo({ ceom = null, onClose = null, onUserSaved = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchEmpleoData = async () => {
      if (ceom) {
        try {
          const empleoResponse = await fetch(
            `http://localhost:3000/api/v1/empleo/${ceom}`
          );
          if (empleoResponse.ok) {
            const empleoData = await empleoResponse.json();
            reset({
              ceom: empleoData.ceom,
              descripcion: empleoData.descripcion,
            });
          }
        } catch (error) {
          toast.error("Error al cargar los datos del empleo");
        }
      }
    };

    fetchEmpleoData();
  }, [ceom, reset]);

  const onSubmit = handleSubmit(async (dataEmpleo) => {

    if(ceom){
      try{
        await updateEmpleo(ceom, {
          descripcion: dataEmpleo.descripcion,
          usuario_modifica: 'apurg',
        });
        toast.success("Empleo actualizado exitosamente!", {autoClose: 1500});
        setTimeout(() => {
          onUserSaved();
          onClose();
        }, 1500);
      } catch (error) {
        toast.error("Error al actualizar el usuario, intente nuevamente");
      }
    } else {
      try {
        await createEmpleo({
          ceom: dataEmpleo.ceom,
          descripcion: dataEmpleo.descripcion,
          usuario_ingreso: 'apurg',
        });
  
        toast.success(
          <div>
            <strong>¡Empleo creado exitosamente!</strong>
          </div>,
          {
            autoClose: 2500,
            render: (message) => (
              <div dangerouslySetInnerHTML={{ __html: message }} />
            ),
          }
        );
      } catch (error) {
        toast.error("Error al crear el empleo, intente nuevamente");
      } finally {
        reset();
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
            htmlFor="ceom"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            CEOM
          </label>
          <input
            type="text"
            id="ceom"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            placeholder="Ejemplo: E71A20"
            disabled={!!ceom}
            {...register("ceom", { required: "*CEOM es requerido" })}
          />
                    {errors.ceom && (
            <p className="text-red-900 text-sm mb-0">{errors.ceom.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="descripcion"
            className="block font-page text-[16px] font-semibold text-primary"
          >
            Descripcion
          </label>
          <input
            type="text"
            id="descripcion"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
            placeholder="Descripcion del Empleo"
            {...register("descripcion" , { required: "*Descripcion es requerida" })}
          />
          {errors.descripcion && (
            <p className="text-red-900 text-sm mb-0">{errors.descripcion.message}</p>
          )}
        </div>
        <div className="col-span-full flex justify-center">
          {ceom ? (
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
                Crear Empleo
              </button>
              {toastMessage && <div>{toastMessage}</div>}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
