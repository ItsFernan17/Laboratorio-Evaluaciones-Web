
function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
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
      return data.accessToken;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<any | null> {
  let accessToken = localStorage.getItem('accessToken');

  if (!accessToken || isTokenExpired(accessToken)) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
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
      return data;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}