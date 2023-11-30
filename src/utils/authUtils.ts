export const saveAuthData = (authData: any) => {
  // Save access token, refresh token, and other relevant information in local storage
  localStorage.setItem('token', authData.access_token);
  localStorage.setItem('refresh_token', authData.refresh_token);
  localStorage.setItem('expires_at', authData.expires_at);
  localStorage.setItem('role', authData.role);

  // Save permissions as a JSON string to local storage
  localStorage.setItem('permissions', JSON.stringify(authData.permissions));
};

export const clearAuthData = () => {
  // Clear authentication data from local storage on logout or when needed
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('role');
  localStorage.removeItem('permissions');
};
