import React from "react";
import { useFetch } from "../../useFetch";

function TipoMotivo({ register, errors }) {
  const { data } = useFetch("http://localhost:3000/api/v1/motivo");

  // Filtrar motivos cuyo código sea mayor o igual a 100
  const filteredData = data?.filter((motivo) => motivo.codigo_motivo >= 100 && motivo.codigo_motivo < 200);

  return (
    <>
      <select
        {...register("motivo", {
          required: "*Seleccione un motivo del examen",
          validate: (value) =>
            value !== "0" || "*Seleccione un motivo del examen válido",
        })}
        className="bg-[#F7FAFF] h-[34px] w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
      >
        <option value="0">Seleccione un Motivo del Examen</option>
        {filteredData?.map((motivo) => (
          <option key={motivo.codigo_motivo} value={motivo.codigo_motivo}>
            {motivo.nombre_motivo}
          </option>
        ))}
      </select>
      {errors.motivo && (
        <p className="text-red-900 text-sm mb-0">{errors.motivo.message}</p>
      )}
    </>
  );
}

export default TipoMotivo;
