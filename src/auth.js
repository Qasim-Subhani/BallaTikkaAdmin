class Auth {
  constructor() {
    console.log("Local storage", localStorage.getItem("auth"));
    this.authenticated = false;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logOut(cb) {
    this.authenticated = false;
    cb();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
export default new Auth();
