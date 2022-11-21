import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
//Cheatsheet: Date (year, month, day, hour, min, sec, mili)
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let myNumber;
let startDate = new Date(today.getFullYear(), currentMonth, 1); 
let myDays = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
let diasSemana = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
let newArray = [];
export default class appointmentsComponent extends Component {
  @service login;
  @tracked monthYear;
  @tracked currentWeek;
  @tracked isMarked = false;
  @tracked userList = [];
  @tracked Usuario;
  @tracked queue = [];

  constructor() {
    super(...arguments);
    this.showMyCalendar(currentMonth, currentYear);

  }
  showMyCalendar(month, year) {
    this.monthYear = months[currentMonth] + ' ' + currentYear; // Método para obtener el mes actual        
    this.currentWeek = Math.ceil(myDays/7)+1; //Método para obtener la semana actual
    let hoy = this.currentMonday(today);
    hoy.getDate();
    myNumber = [];
    for (let i = 0; i < 7; i++) {
      myNumber.push(hoy.getDate());
      hoy.setMilliseconds(hoy.getMilliseconds() + 8.64e7);
      this.queue.push(
        {
            dayOfWeek: diasSemana[i],
            number: myNumber[i],
            month: currentMonth,
            marked: false,
            weekend: false,
            user: [],
        }
      );
      if (this.queue[i].dayOfWeek == 'Sat' || 'Sun'){
        this.queue[i].weekend = true;
      }
    }

    console.log(this.queue);
  }

  currentMonday(d) {
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let variable = new Date(d.setDate(diff));
    return variable;
  }

  get getQueue() {
    //console.log(this.args.arrayDays);
    //this.queue = this.args.arrayDays;
    return this.queue;
  }


  @action next() {
    //Controlador de semanas
    this.currentWeek = this.currentWeek + 1;
    if (this.currentWeek >= 6) {
      this.currentWeek = 1;
    }
    if (this.currentWeek == 1) {
      if (currentMonth === 11) {
        currentYear = currentYear + 1;
      } else {
        currentYear;
      }
      currentMonth = (currentMonth + 1) % 12;
      this.monthYear = months[currentMonth] + ' ' + currentYear;
    }

    //Controlador de días de la semana
    let lastDay = this.queue[0].number;
    let lastDate;
    if (this.currentWeek == 1){
      lastDate = new Date(currentYear, currentMonth - 1 , lastDay);
    }else{
      lastDate = new Date(currentYear, currentMonth - 0, lastDay);
    }
    lastDate.setDate(lastDate.getDate() + ((1 + 7 - lastDate.getDay()) % 7 || 7));
    let nextMonday = lastDate.getDate();
    console.log(nextMonday);
    for (let i = 0; i < 7; i++) {    ;  
      lastDate.setMilliseconds(lastDate.getMilliseconds()+8.64e7);
      console.log(lastDate.getDate());
    }
  }
}
