import Service from '@ember/service';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
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

  saveSelecteds(argumentos){
    let keyUser = this.retrieveSessionStorage();
    let varLocal = localStorage.getItem(keyUser);
    var controllerDates = argumentos;
    //Si el length es 0 comprobar si hay cosas antiguas en el localStorage, si no pues metemos el chorizo.
    var dateSelected;
    var arrayDates = [];
    if (controllerDates.length == 0 && varLocal.length == 2) { //Si no hay argumentos y no hay nada en localStorage pues eso.
      console.log("primer if: NO HAY ARGUMENTOS Y LA LOCALSTORAGE ESTÁ VACÍA")  
      localStorage.setItem(keyUser, JSON.stringify(controllerDates));    
    }else if(controllerDates.length == 0 && varLocal.length > 2){ 
      console.log("segundo if: NO HAY ARGUMENTOS PERO LA LOCALSTORAGE TIENE COSAS " + varLocal.length)
    }else if(controllerDates.length > 0 && varLocal.length == 2){
      console.log("tercer if: HAY ARGUMENTOS Y LA LOCALSTORAGE ESTÁ VACÍA");
      const arrayDates = Object.values(controllerDates).map(val => new Date(2022, months.indexOf(val.month), val.number).toDateString());
      for (let i = 0; i < arrayDates.length; i++) {
        localStorage.setItem(keyUser, JSON.stringify(arrayDates));
      }      
    }else{
      console.log("cuarto if: HAY ARGUMENTOS Y LA LOCALSTORAGE ESTÁ LLENA");
    }
}

/**
  
      controllerDates = Object.values(controllerDates).forEach((val) => {
        dateSelected = new Date(
          2022,
          months.indexOf(val.month),
          val.number
        ).toDateString();
        arrayDates.push(dateSelected);
      });   
      for (let i = 0; i < arrayDates.length; i++) {
        localStorage.setItem(keyUser, JSON.stringify(arrayDates));
      }
 
 **/

  /**
  saveSelecteds(argumentos) {
  let keyUser = this.retrieveSessionStorage();
  let savedData = localStorage.getItem(keyUser);

  if (savedData === null) {
    localStorage.setItem(keyUser, JSON.stringify(controllerDates));
  } else {
    let arrayDates = [];    
    let controllerDates = argumentos;
    Object.values(controllerDates).forEach((val) => {
      let dateSelected = new Date(
        2022,
        months.indexOf(val.month),
        val.number
      ).toDateString();
      arrayDates.push(dateSelected);
    });   
    localStorage.setItem(keyUser, JSON.stringify(arrayDates));
  }
  }

   **/

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
