import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginForm() {
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    toast.dismiss();
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        // Verificar si el servidor devolvió los tokens
        if (responseData.accessToken && responseData.refreshToken) {
          // Almacenar los tokens en localStorage
          localStorage.setItem('accessToken', responseData.accessToken);
          localStorage.setItem('refreshToken', responseData.refreshToken);
          localStorage.setItem('usuario', responseData.usuario);
          console.log('Tokens almacenados en localStorage.');
          window.location.href = '/portal/menu-sistema'; // Redirige a una página protegida
        } else {
          console.error('No se encontraron tokens en la respuesta del login.');
          toast.error("Error al iniciar sesión: no se encontraron tokens.");
        }
      } else {
        const errorData = await response.json();
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      toast.error("Ocurrió un error. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Contenedor de Toast */}
      <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(handleLogin)}>
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex items-center mb-6 w-full mt-4 justify-center">
            <FaUser className="text-primary size-7 mr-2" />
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              {...register("usuario")}
              className="border-b-2 border-[#142957] h-10 w-[85%] lg:w-[320px] ml-2 font-normal text-lg"
            />
          </div>

          <div className="flex items-center mb-6 w-full justify-center">
            <FaLock className="text-primary size-7 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              {...register("password")}
              className="border-b-2 border-primary h-10 w-[85%] lg:w-[320px] ml-2 mt-4 font-normal text-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#142957] font-normal text-white border-2 border-transparent rounded-[20px] text-lg cursor-pointer transition duration-300 ease-in-out h-[50px] w-[85%] lg:w-[300px] mt-2 mb-2 hover:bg-white hover:text-primary hover:border-primary"
        >
          Iniciar Sesión
        </button>
      </form>

      <a className="font-normal block mb-2 mt-5 text-primary" href="http://www.google.com">
        ¿No tienen usuario? Contáctanos
      </a>
      <a className="font-normal block mb-2 text-primary" href="http://www.google.com">
        ¿Olvidaste tu Contraseña?
      </a>
      <a className="font-normal block text-primary" href="https://www.mindef.mil.gt/" target="_blank">
        Conoce más acerca del MINDEF
      </a>
    </div>
  );
}
