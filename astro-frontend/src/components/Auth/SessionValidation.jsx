import { useEffect, useState } from 'react';
import { getSession } from './Auth';

const ProtectedPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad de la modal

  useEffect(() => {
    const validateSession = async () => {
      console.log("Validando la sesión...");
      const userSession = await getSession();

      if (!userSession) {
        console.log("Sesión inválida, mostrando modal y redirigiendo al login...");
        setShowModal(true); // Mostrar la modal si la sesión es inválida
        setLoading(false); // Desactivar el estado de carga para mostrar la modal

        // Después de 5 segundos, redirigir al login
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000); // Esperar 5 segundos antes de redirigir
      } else {
        console.log("Sesión válida:", userSession);
        setSession(userSession);
        setLoading(false); // Desactivar el estado de carga si la sesión es válida
      }
    };

    validateSession();
  }, []);

  // Mostrar la pantalla de carga solo si está en estado de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {console.log("Show Modal:", showModal)} {/* Verificar si el estado cambia */}

      {/* Mostrar modal de advertencia si no está autorizado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg">
            <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
              <h2 className="font-page font-semibold items-center text-[25px]">
                Usuario no autorizado
              </h2>
              <img
                src="/EMDN1.png" // Reemplaza con la ruta correcta del logo
                alt="Logo"
                className="h-14"
              />
            </div>
            <div className="p-5">
              <p className="text-center text-lg">
                No tienes autorización para acceder a esta página.
              </p>
              <p className="text-center text-lg">
                Serás redirigido al login en 5 segundos...
              </p>
            </div>
            <div className="flex justify-center p-4">
            </div>
          </div>
        </div>
      )}

      {/* Si la sesión es válida, mostrar el contenido protegido */}
      {session && (
        <div>
         { console.log("Usuario autenticado:", localStorage.getItem('usuario')) }
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
