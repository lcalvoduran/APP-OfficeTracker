import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
let months = [
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
export default class selecteddaysComponent extends Component {
  @tracked total;
  @service login;
  constructor() {
    super(...arguments);
  }

  @action saveDates() {
    let keyUser = this.login.retrieveSessionStorage();
    var controllerDates = this.args.arrayDays;
    var dateSelected;
    var arrayDates = [];
    if (controllerDates.length == 0) {
      localStorage.setItem(keyUser, JSON.stringify(controllerDates));
    } else {
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
    }
  }
  @action clearDates(number, month) {
    let findArray = this.total.findIndex(
      (element) => element.number == number && element.month == month
    );
    this.total = this.total.splice(findArray, 1);
    this.args.updateCleared(findArray, this.total);
  }

  get totalSelected() {    
    let fetch = this.buildObjectWithAnString();
    this.total = this.args.arrayDays;
    this.login.saveSelecteds(this.total);    
    //Si habia objetos almacenados concaténalos
    if(fetch.length > 0){
      console.log("entra por el if");
      let buenacampeon = {...fetch, ...this.total};
      return this.total; 
    }else{
      this.total = this.args.arrayDays;
      console.log("entra por el else");
      return this.total;
    }    
  }

  
  retrieveData(){         //Return the "pretty" data of localStorage
    let variable = this.login.retrieveSessionStorage();
    let daysLocal = JSON.parse(localStorage.getItem(variable));
    if (variable) {
      if (daysLocal) {
        daysLocal.reduce((a, v) => ({ ...a, [v]: v }), {});
        return daysLocal;
      } else {
        null;
      }
    } else {
      null;
    }
  }

  buildObjectWithAnString(){
    var object = []; var fetch = this.retrieveData();
    for (let i = 0; i < fetch.length; i++) {
      var diita = fetch[i].split(' ')[0]; var mes = fetch[i].split(' ')[1]; var numerito = fetch[i].split(' ')[2]; var anyo = fetch[i].split(' ')[3];          
      object.push({dayOfWeek: diita, marked: true, month: mes, number: numerito, weekend:true });      
    }
    return object;
  }
}
