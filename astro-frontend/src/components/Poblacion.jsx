import React from "react";
import { useFetch } from "../useFetch";

function Poblacion({ register }) {
  const { data } = useFetch("http://localhost:3000/api/v1/poblacion");
  return (
    <select
      {...register("codigo_poblacion")}
      className="bg-[#F7FAFF] h-[34px] mb-4 w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione una Poblacion</option>
      {data?.map((poblacion, index) => (
        <option key={index} value={index + 1}>
          {poblacion.nombre_poblacion}
        </option>
      ))}
    </select>
  );
}

export default Poblacion;
