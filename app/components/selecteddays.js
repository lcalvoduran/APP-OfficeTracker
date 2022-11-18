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
        ).toDateString(); //2022-10-1
        arrayDates.push(dateSelected);
      });
      for (let i = 0; i < arrayDates.length; i++) {
        localStorage.setItem(keyUser, JSON.stringify(arrayDates));
      }
    }
    //window.alert('The changes will be stored in the local Database');
    //window.location.reload();
  }
  @action clearDates(number, month) {

    let findArray = this.total.findIndex(
      (element) => element.number == number && element.month == month
    );
    this.args.updateCleared(findArray);
    //this.total = this.total.splice(findArray, 1);
    
    
  }

  get totalSelected() {
    this.total = this.args.arrayDays;
    return this.total;
  }
}
