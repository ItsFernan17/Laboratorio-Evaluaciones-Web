import React from 'react'
import { useFetch } from '../useFetch'

function Comando() {
  const { data } = useFetch('http://localhost:3000/api/v1/comando')
  return (
    <select className="bg-[#F7FAFF] h-[34px] mb-4 w-[320px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page">
      <option value="0">Seleccione un Comando</option>
      {data?.map((comando, index) => (
        <option key={index} value={comando.nombre_comando}>
          {comando.nombre_comando}
        </option>
      ))}
    </select>
  )
}

export default Comando