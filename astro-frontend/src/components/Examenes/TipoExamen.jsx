import React from "react";
import { useFetch } from "../../useFetch";

function TipoExamen({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/tipo-examen/");
  return (
    <>
    <select
    {...register("tipo_examen", {
      required: "*Seleccione un tipo de examen",
      validate: (value) =>
        value !== "0" || "*Seleccione un tipo de examen válido",
    })}
      className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione un Tipo de Examen</option>
      {data?.map((tipo_examen,) => (
        <option key={tipo_examen.codigo_tipoE} value={tipo_examen.codigo_tipoE}>
          {tipo_examen.description}
        </option>
      ))}
    </select>
    {errors.tipo_examen && (
        <p className="text-red-900 text-sm mb-0">{errors.tipo_examen.message}</p>
      )}
    </>
  );
}

export default TipoExamen;
