import React from 'react'
import { useFetch } from '../useFetch'

function Departamentos({ register }) {
  const { data } = useFetch('http://localhost:3000/api/v1/departamento')

  return (
    <select
      {...register('codigo_departamento')}
      className="bg-[#F7FAFF] h-[34px] mb-4 w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
    >
      <option value="0">Seleccione un Departamento</option>
      {data?.map((departamento, index) => (
        <option key={index} value={index + 1}> 
          {departamento.nombre_departamento}
        </option>
      ))}
    </select>
  )
}

export default Departamentos
