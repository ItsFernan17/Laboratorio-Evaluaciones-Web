import React from "react";
import { useFetch } from "../useFetch";

function Grado({ register }) {
  const { data } = useFetch("http://localhost:3000/api/v1/grado");
  return (
    <select
      {...register("codigo_grado")}
      className="bg-[#F7FAFF] h-[34px] mb-4 w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione un Grado</option>
      {data?.map((grado, index) => (
        <option key={index} value={index + 1}>
          {grado.nombre_grado}
        </option>
      ))}
    </select>
  );
}

export default Grado;
