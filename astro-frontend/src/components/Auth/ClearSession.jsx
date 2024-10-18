import { useEffect } from 'react';

const ClearSession = () => {
  useEffect(() => {
    // Limpiar la sesión al cargar el componente
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('toastShown');
    localStorage.removeItem('usuario');
    console.log('Sesión eliminada al usar el layout público.');
  }, []);

  return null; // Este componente no necesita renderizar nada
};

export default ClearSession;
