import React from "react";
import { useFetch } from "../useFetch";

function Grado({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/grado");
  return (
    <>
    <select
    {...register("grado", {
      required: "*Seleccione un grado",
      validate: (value) =>
        value !== "0" || "*Seleccione un grado válido",
    })}
      className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione un Grado</option>
      {data?.map((grado, index) => (
        <option key={index} value={index + 1}>
          {grado.nombre_grado}
        </option>
      ))}
    </select>
    {errors.grado && (
        <p className="text-red-900 text-sm mb-0">{errors.grado.message}</p>
      )}
    </>
  );
}

export default Grado;
