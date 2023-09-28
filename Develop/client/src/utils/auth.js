import decode from 'jwt-decode';

class AuthService {

  // Get user data from the token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  // Update Apollo Client cache after login
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    this.client.resetStore(); // Reset Apollo Client cache
    window.location.assign('/');
  }

  // Update Apollo Client cache after logout
  logout() {
    localStorage.removeItem('id_token');
    this.client.resetStore(); // Reset Apollo Client cache
    window.location.assign('/');
  }
}

export default new AuthService();
