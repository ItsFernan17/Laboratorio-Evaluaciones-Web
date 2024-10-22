import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función para extraer el payload del JWT sin usar jwt-decode
  const getRoleFromJWT = (token) => {
    try {
      // Dividir el token en sus tres partes (header, payload, signature)
      const payloadBase64 = token.split('.')[1];

      // Decodificar el payload de Base64
      const decodedPayload = atob(payloadBase64);

      // Parsear el JSON del payload
      const payload = JSON.parse(decodedPayload);

      // Retornar el rol del payload
      return payload.role || payload.rol; // Si usas 'role' o 'rol', ajusta según tu backend
    } catch (error) {
      console.error('Error decodificando el JWT:', error);
      return null;
    }
  };

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
  
        if (responseData.accessToken && responseData.refreshToken) {
          // Extraer el rol directamente del JWT
          const role = getRoleFromJWT(responseData.accessToken);
  
          // Guardar tokens y rol en localStorage
          localStorage.setItem("accessToken", responseData.accessToken);
          localStorage.setItem("refreshToken", responseData.refreshToken);
          localStorage.setItem("usuario", responseData.usuario);
          localStorage.setItem("role", role);
          localStorage.setItem("dpi", responseData.dpi); // Guardar el dpi también
  
          console.log("Tokens, rol y DPI almacenados en localStorage.");
  
          // Redirigir según el rol
          if (role === "evaluado") {
            window.location.href = "/portal/mis-asignaciones";
          } else {
            window.location.href = "/portal/menu-sistema";
          }
        } else {
          console.error("No se encontraron tokens en la respuesta del login.");
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
          {/* Campo de Usuario */}
          <div className="flex items-center mb-6 w-full mt-4 justify-center">
            <FaUser className="text-primary size-7 mr-2" />
            <input
              type="text"
              placeholder="Usuario"
              {...register("usuario", { required: "El campo de usuario es obligatorio" })}
              className="border-b-2 border-[#142957] h-10 w-[85%] lg:w-[320px] ml-2 font-normal text-lg"
            />
          </div>
          {errors.usuario && <p className="text-red-600">{errors.usuario.message}</p>}

          {/* Campo de Contraseña */}
          <div className="flex items-center mb-6 w-full justify-center">
            <FaLock className="text-primary size-7 mr-2" />
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="border-b-2 border-primary h-10 w-[85%] lg:w-[320px] ml-2 mt-4 font-normal text-lg"
            />
          </div>
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        {/* Botón de Iniciar Sesión */}
        <button
          type="submit"
          className="bg-[#142957] font-normal text-white border-2 border-transparent rounded-[20px] text-lg cursor-pointer transition duration-300 ease-in-out h-[50px] w-[85%] lg:w-[300px] mt-2 mb-2 hover:bg-white hover:text-primary hover:border-primary"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Enlaces Adicionales */}
      <a className="font-normal block mb-2 mt-5 text-primary" href="http://www.google.com">
        ¿No tienes usuario? Contáctanos
      </a>
      <a className="font-normal block mb-2 text-primary" href="http://www.google.com">
        ¿Olvidaste tu Contraseña?
      </a>
      <a className="font-normal block text-primary" href="https://www.mindef.mil.gt/" target="_blank" rel="noreferrer">
        Conoce más acerca del MINDEF
      </a>
    </div>
  );
}
