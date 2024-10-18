
function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    console.log('Tiempo actual:', currentTime, 'Expiración del token:', payload.exp);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.log('No se encontró refreshToken, redirigiendo al login.');
    return null;
  }

  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }), 
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      console.log('Nuevo accessToken generado:', data.accessToken);
      return data.accessToken;
    } else {
      console.error('Error al refrescar el token. Redirigiendo al login.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  } catch (error) {
    console.error('Error al intentar refrescar el token:', error);
    return null;
  }
}

export async function getSession(): Promise<any | null> {
  let accessToken = localStorage.getItem('accessToken');
  console.log('accessToken encontrado:', accessToken);

  if (!accessToken || isTokenExpired(accessToken)) {
    console.log('Token expirado o no existe. Intentando refrescar...');
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.log('No se pudo refrescar el token. Redirigiendo al login.');
      return null;
    }
  }

  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token validado correctamente:', data);
      return data;
    } else {
      console.error('El token no es válido. Redirigiendo al login.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}