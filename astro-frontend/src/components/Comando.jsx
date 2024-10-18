import React from "react";
import { useFetch } from "../useFetch";

function Comando({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/comando");
  return (
    <>
    <select
    {...register("comando", {
      required: "*Seleccione un comando",
      validate: (value) =>
        value !== "0" || "*Seleccione un comando válido",
    })}
      className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione un Comando</option>
      {data?.map((comando, index) => (
        <option key={comando.codigo_comando} value={comando.codigo_comando}>
          {comando.nombre_comando}
        </option>
      ))}
    </select>
    {errors.comando && (
        <p className="text-red-900 text-sm mb-0">{errors.comando.message}</p>
      )}
    </>
  );
}

export default Comando;
