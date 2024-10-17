import React from "react";
import { useFetch } from "../useFetch";

function Departamentos({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/departamento");

  return (
    <>
      <select
        {...register("residencia", {
          required: "*Seleccione un departamento",
          validate: (value) =>
            value !== "0" || "*Seleccione un departamento válido",
        })}
        className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
        defaultValue="0" // Always default to "Seleccione un Departamento"
      >
        <option value="0">Seleccione un Departamento</option>
        {data?.map((departamento) => (
          <option
            key={departamento.codigo_departamento}
            value={departamento.codigo_departamento}
          >
            {departamento.nombre_departamento}
          </option>
        ))}
      </select>
      {errors.residencia && (
        <p className="text-red-900 text-sm mb-0">{errors.residencia.message}</p>
      )}
    </>
  );
}

export default Departamentos;
