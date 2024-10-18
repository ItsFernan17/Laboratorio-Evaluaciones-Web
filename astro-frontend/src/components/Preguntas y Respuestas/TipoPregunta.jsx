import React from "react";
import { useFetch } from "../../useFetch";

function TipoPregunta({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/tipo-pregunta");

  return (
    <>
      <select
        {...register("tipo_pregunta", {
          required: "*Seleccione un Tipo de Pregunta",
          validate: (value) =>
            value !== "0" || "*Seleccione un tipo de pregunta válido",
        })}
        className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
        defaultValue="0"
      >
        <option value="0">Seleccione Tipo de Pregunta</option>
        {data?.map((tipo_pregunta) => (
          <option key={tipo_pregunta.codigo_tipoP} value={tipo_pregunta.codigo_tipoP}>
            {tipo_pregunta.descripcion}
          </option>
        ))}
      </select>
      {errors.tipo_pregunta && (
        <p className="text-red-900 text-sm mb-0">{errors.tipo_pregunta.message}</p>
      )}
    </>
  );
}

export default TipoPregunta;
