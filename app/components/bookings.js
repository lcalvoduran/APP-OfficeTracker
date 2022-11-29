import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
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
export default class bookingsComponent extends Component {
  @service login;
  @tracked arrayDays = [];
  @tracked finder;
  @tracked selectedDay;

  constructor() {
    super(...arguments);
    this.arrayDays = this.retrieveDaysFromLocalStorage();
  }

  @action updateArray(daysMarkeds, month) {
    const createHash = (oneObject) => {
      const keys = Object.keys(oneObject).sort().join('');
      const values = Object.values(oneObject).sort().join('');
      return `${keys}${values}`;
    };
    const remueveObjetosDuplicados = (someArray) => {
      const history = {};
      const newDeduplicatedArray = [];
      for (let i = 0; i < someArray.length; i += 1) {
        const hash = createHash(someArray[i]);
        if (!history?.[hash]) {
          newDeduplicatedArray.push(someArray[i]);
          history[hash] = true;
        }
      }
      return newDeduplicatedArray;
    };    
    var salvaGuarda = this.retrieveDaysFromLocalStorage();
    this.arrayDays.push(daysMarkeds);
    var flateado = this.arrayDays = this.arrayDays.flat(1).slice(-7);
    var filtradisimo = flateado.filter((estado) => estado.marked == true);
    if (filtradisimo != null) {    
      var concaten = filtradisimo.concat(salvaGuarda);      
      concaten = concaten.filter((value, index, self) => //Eliminar duplicados
      index === self.findIndex((t) => (
        t.dayOfWeek === value.dayOfWeek && t.number === value.number
      )));
      concaten.forEach((item, index) => {
        item.month = months[month];
      })
      return this.compruebameSiHayAlgunAntiguoFalse(concaten, daysMarkeds);      
    }else{
      return this.arrayDays = [];
    }
  }

  @action updateCleared(finder, total){
    this.finder = total;
  }

  compruebameSiHayAlgunAntiguoFalse(array, markeds){
    //Si markeds tiene uno de los elementos que ya estaba seleccionados a true, ponlo a false.
    let intersection = array.filter(x => markeds.includes(x));
    return this.arrayDays = intersection;

  }

  retrieveDaysFromLocalStorage() {
    let variable = this.login.retrieveSessionStorage();
    let daysLocal = JSON.parse(localStorage.getItem(variable));
    if (variable) {
      var day, month, number;
      var arrayLocal = [];
      if (daysLocal == null) {        
        return arrayLocal;
      } else {
        daysLocal = Object.values(daysLocal).forEach((val) => {
          day = val.split(' ')[0];
          month = val.split(' ')[1];
          number = val.split(' ')[2];
          arrayLocal.push({ dayOfWeek: day, month: month, marked: true, number: parseInt(number), weekend: true});
        });
        daysLocal = arrayLocal;
        return daysLocal;
      }
    } else {
    }
  }
}
