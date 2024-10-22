import React, { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa"; 

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Verificamos si el token existe
    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false); // Terminamos de cargar si hay un token válido
    } else {
      setIsAuthenticated(false);
      setIsLoading(false); // Terminamos de cargar, pero no está autenticado

      // Redirigimos después de 3 segundos si no está autenticado
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
    }
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar una pantalla de carga mientras se verifica la autenticación
  }

  if (!isAuthenticated) {
    // Mostrar modal si no está autenticado
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white w-[700px] rounded-lg shadow-lg">
          <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
            <h2 className="font-page font-semibold items-center text-[25px]">
              No Autorizado
            </h2>
            <img src="/EMDN1.png" alt="Logo" className="h-14" />
          </div>
          <div className="p-6 text-center text-primary text-[20px] font-semibold">
            <FaBan size={50} className="text-red-500 mx-auto mb-4" />
            <p>No tienes acceso al sistema. Serás redirigido al login en unos segundos.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>; // Renderizar el contenido si está autenticado
};

export default AuthGuard;
