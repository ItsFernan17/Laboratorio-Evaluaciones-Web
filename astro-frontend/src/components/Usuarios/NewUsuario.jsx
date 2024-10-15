import { useForm } from "react-hook-form";
import Departamentos from "../Departamentos";
import Grado from "../Grado";
import Poblacion from "../Poblacion";
import Comando from "../Comando";

export function NewUsuario() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        onSubmit={onSubmit}
      >
        <div className="mt-4">
          <label
            htmlFor="dpi"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            DPI
          </label>
          <input
            type="text"
            id="dpi"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm border border-primary pl-3 font-page"
            placeholder="1234123451234"
            {...register("dpi")}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="nombre"
            className="block font-page text-[16px] font-semibold text-primary"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            className="bg-[#F7FAFF] h-[34px] w-[318px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
            placeholder="Nombres y Apellidos"
            {...register("nombre_completo")}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="telefono"
            className="block font-page text-[16px] font-semibold text-primary"
          >
            Número Telefónico
          </label>
          <input
            type="text"
            id="telefono"
            className="bg-[#F7FAFF] h-[34px] mb-4 w-[318px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
            placeholder="1234-5678"
            {...register("telefono")}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="contrasena"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            className="bg-[#F7FAFF] h-[34px] mb-4 w-[318px] mt-1 rounded-sm shadow-sm border border-primary pl-3 font-page"
            placeholder="ejemploNo1"
            {...register("password")}
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="departamento"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Departamento
          </label>
          <Departamentos />
        </div>
        <div className="mt-2">
          <label
            htmlFor="departamento"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Grado Militar
          </label>
          <Grado />
        </div>
        <div className="mt-2">
          <label
            htmlFor="departamento"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Poblacion Militar
          </label>
          <Poblacion />
        </div>
        <div className="mt-2">
          <label
            htmlFor="departamento"
            className="block text-[16px] font-page font-semibold text-primary"
          >
            Comando Militar
          </label>
          <Comando />
        </div>
        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            className="bg-[#142957] font-normal font-page mb-10 text-white border-2 border-transparent rounded-[10px] text-[16px] cursor-pointer transition duration-300 ease-in-out  h-[40px] md:w-[300px]  hover:bg-white hover:text-primary hover:border-primary"
          >
            CREAR USUARIO
          </button>
        </div>
      </form>
    </div>
  );
}
