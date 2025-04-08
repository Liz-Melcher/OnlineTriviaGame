import { JwtPayload, jwtDecode } from 'jwt-decode';

interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}

class TokenServices {
  private decode() {
    return jwtDecode<JwtPayloadWithUsername>(this.get())
  }

  getUsername() {
    if (!this.get()) { return "" }
    return this.decode().username;
  }

  loggedIn() {
    return !!this.get();
  }
  
  isTokenExpired() {
    if (!this.get()) { return false }
    const decodedToken = this.decode();

    const currentTime = Date.now() / 1000;
    if(decodedToken.exp && decodedToken.exp < currentTime) {
      return true;
    }
    return false;
  }

  getBearer(): string {
    return `Bearer: ${this.get()}`;
  }

  get(): string {
    return localStorage.getItem("token") ?? "";
  }

  store(idToken: string): void {
    if (idToken) {
      localStorage.setItem("token", idToken);
    }
  }

  destroy(): void {
    localStorage.removeItem("token");
  }
}

export default new TokenServices();
