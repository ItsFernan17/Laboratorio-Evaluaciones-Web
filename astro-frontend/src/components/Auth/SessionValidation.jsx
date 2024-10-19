import { useEffect, useState } from 'react';
import { getSession } from './Auth';

const ProtectedPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      console.log("Validando la sesión...");
      const userSession = await getSession();

      if (!userSession) {
        console.log("Sesión inválida, mostrando modal y redirigiendo al login...");
        setShowModal(true);
        setLoading(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        console.log("Sesión válida");
        setSession(userSession);
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg">
            <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
              <h2 className="font-page font-semibold items-center text-[25px]">
                Usuario no autorizado
              </h2>
              <img
                src="/EMDN1.png"
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

      {session && (
        <div>
         { console.log("Usuario autenticado:", localStorage.getItem('usuario')) }
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
