
import {useForm } from "react-hook-form";

 export function NewEmpleo() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  
  return (
    <div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2" onSubmit={onSubmit}>
        <div className="mt-4">
          <label htmlFor="ceom" className="block text-[16px] font-page font-semibold text-primary">
            CEOM
          </label>
          <input
            type="text"
            id="ceom"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            placeholder="Ejemplo: E71A20"
            {...register("ceom")}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="descripcion" className="block font-page text-[16px] font-semibold text-primary">
            Descripcion
          </label>
          <input
            type="text"
            id="descripcion"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
            placeholder="Descripcion del Empleo"
            {...register("descripcion")}
          />
        </div>
        <div className="col-span-full flex justify-center">
          <button type="submit" className="bg-[#142957] font-normal font-page mb-10 text-white border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out  h-[40px] md:w-[300px]  hover:bg-white hover:text-primary hover:border-primary">
            CREAR Empleo
          </button>
        </div>
      </form>
    </div>
  );
}