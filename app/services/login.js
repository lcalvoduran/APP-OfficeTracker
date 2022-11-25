import Service from '@ember/service';

export default class LoginService extends Service {
  userArray = [];
  constructor() {
    super();
  }

  saveUser(email) {
    if (email.includes('@copyright.com')) {
      this.userArray.push({ email, password: 123456, estado: true });
      localStorage.setItem('currentUser', JSON.stringify(this.userArray));
      return true;
    } else {
      console.log('[CCC] ❌​ Please enter a valid mail address');
      return false;
    }
  }

  leaveSession() {
    let filtrado = this.userArray.filter((element) => element.estado == true);
    if (filtrado.length > 0) {
      let positionFilter = this.userArray.findIndex(
        (element) =>
          element.email == filtrado[0].email &&
          element.estado == filtrado[0].estado
      );
      this.userArray.splice(positionFilter, 1, {
        email: filtrado[0].email,
        password: 1234,
        estado: false,
      });
      localStorage.setItem('currentUser', JSON.stringify(this.userArray));
      location.reload();
    } else {
      console.log('No hay ningún usuario logeado');
    }
  }

  retrieveSessionStorage() {
    let varLocal = localStorage.getItem('currentUser');
    if (varLocal == null) {
      this.userArray = [];
      console.log('No hay usuarios logeados');
      return this.userArray;
    } else {
      this.userArray = [];
      const arr = JSON.parse(localStorage.getItem('currentUser'));
      var foundState = arr.find((estado) => estado.estado == true);
      if (foundState) {
        this.userArray = [...this.userArray, ...arr];
        //return this.userArray[0].email;
        return foundState.email;
      } else {
        this.userArray = [];
        this.userArray = [...this.userArray, ...arr];
        if (foundState == null) {
          return 'Sign In / Register';
        }
      }
    }
  }
}
