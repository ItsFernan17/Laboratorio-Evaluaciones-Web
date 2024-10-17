import React from "react";
import { useFetch } from "../useFetch";

function Poblacion({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/poblacion");
  return (
    <>
      <select
        {...register("poblacion", {
          required: "*Seleccione una poblacion",
          validate: (value) =>
            value !== "0" || "*Seleccione una poblacion válida",
        })}
        className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
      >
        <option value="0">Seleccione una Poblacion</option>
        {data?.map((poblacion, index) => (
          <option key={index} value={index + 1}>
            {poblacion.nombre_poblacion}
          </option>
        ))}
      </select>
      {errors.poblacion && (
        <p className="text-red-900 text-sm mb-0">{errors.poblacion.message}</p>
      )}
    </>
  );
}

export default Poblacion;
