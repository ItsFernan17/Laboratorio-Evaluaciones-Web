import React from "react";
import { useFetch } from "../../useFetch";

function Serie({ register, errors, seriesIndex }) {
  const { data } = useFetch("http://localhost:3000/api/v1/serie/");
  return (
    <>
      <select
        {...register(`series[${seriesIndex}].serie`, {
          required: "*Seleccione una serie de examen",
          validate: (value) =>
            value !== "0" || "*Seleccione una serie de examen válida",
        })}
        className="bg-[#F7FAFF] h-[34px] w-full mt-3 rounded-sm shadow-sm border border-primary pl-3 font-page"
      >
        <option value="0">Seleccione una Serie de Examen</option>
        {data?.map((serie) => (
          <option key={serie.codigo_serie} value={serie.codigo_serie}>
            {serie.nombre + " - " + serie.instrucciones}
          </option>
        ))}
      </select>
      {errors?.series?.[seriesIndex]?.serie && (
        <p className="text-red-900 text-sm mb-0">
          {errors.series[seriesIndex].serie.message}
        </p>
      )}
    </>
  );
}

export default Serie;
