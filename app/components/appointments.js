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
  @tracked usuario;
  @tracked queue = [];

  constructor() {
    super(...arguments);
    this.showMyCalendar(currentMonth, currentYear);
    this.displayMarkeds();
    this.displayUsers();
    

  }
  showMyCalendar(month, year) {
    this.monthYear = months[currentMonth] + ' ' + currentYear; // Método para obtener el mes actual        
    this.currentWeek = Math.ceil(myDays/7)+1; //Método para obtener la semana actual
    let hoy = this.currentMonday(today);
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
  }

  // - - - - - - - - - - - - - - - - -
  // FUNCIONES AUXILIARES
  // - - - - - - - - - - - - - - - - -

  currentMonday(d) {      //Return the currentMonday of this week
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let variable = new Date(d.setDate(diff));
    return variable;
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

  displayMarkeds(){     //Change the "marked" property to true
    var numerito, diita;
    let markedVariable = this.retrieveData();
    if (markedVariable != null) {
      for (let i = 0; i < this.queue.length; i++) {
        var match = false;
        for (let j = 0; j < markedVariable.length; j++) {
          var numerito = markedVariable[j].split(' ')[2];
          var diita = markedVariable[j].split(' ')[0];
          if (this.queue[i].number == numerito && this.queue[i].dayOfWeek == diita) {
            match = true;
            this.queue[i].marked = true;            
            break;
          }
        }
      }
    } else {
      return 0;
    }    
  }

  displayUsers(){
    for(var key in localStorage){
      if (key.includes('@')) {
        this.userList.push({user: key});
      }
    }
    for (let i = 0; i < this.userList.length; i++) {
      var daysStored = JSON.parse(localStorage.getItem(this.userList[i].user));
      this.userList[i].days = daysStored;
    }

    var objectU, objectX;
    for (let i = 0; i < this.userList.length; i++) {
      objectU = this.userList[i].user.replace('@copyright.com', '');
      objectX = this.userList[i].days;
      for (let i = 0; i < objectX.length; i++) {
        var numerito = objectX[i].split(' ')[2];
        var finder = this.queue.findIndex((o) => o.number == numerito);
        if (finder >= 0) {
          this.queue[finder].user.push(objectU);
          this.queue[finder].user = [...new Set(this.queue[finder].user)]; //Eliminando duplicados
        }
      }
    }
  }
  
  get getQueue() {
    if(this.args.finder){
      var objetoFindeado = this.queue.findIndex((x) => x.number == this.args.finder[0].number);
      this.queue.splice(
        objetoFindeado, 
        1, 
        {
          dayOfWeek: this.args.finder[0].dayOfWeek,
          marked: false,
          number: this.args.finder[0].number,
          weekend: true,
          month: this.args.finder[0].month,
          user: this.args.finder[0].user,
        }
      );
      return this.queue;
    }else{
      return this.queue;
    }
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
    this.queue = [];
    myNumber = [];
    for (let i = 0; i < 7; i++) {      
      myNumber.push(lastDate.getDate());
      lastDate.setMilliseconds(lastDate.getMilliseconds()+8.64e7);
      this.queue.push({dayOfWeek: diasSemana[i], number: myNumber[i], month: currentMonth, marked: false, weekend: false, user: [],});     
    }
    //Controlador de marcadores
    let markedVariable = this.retrieveData();
    markedVariable != null ? markedVariable : 0;
    if (markedVariable == null) {
      return 0;
    }
    for (let i = 0; i < this.queue.length; i++) {
      var match = false;
      for (let j = 0; j < markedVariable.length; j++) {
        var numerito = markedVariable[j].split(' ')[2];
        var diita = markedVariable[j].split(' ')[0];
        if (this.queue[i].number == numerito && this.queue[i].dayOfWeek == diita) {
          match = true;
          this.queue[i].marked = true;
          break;
        }
      }
    }
    this.displayMarkeds();
    this.displayUsers();
  }

  @action back() {
    //Controlador de días de la semana
    let lastDay = this.queue[0].number;
    let lastDate;
    if (this.currentWeek == 1){
      lastDate = new Date(currentYear, currentMonth - 1 , lastDay);
    }else{
      lastDate = new Date(currentYear, currentMonth - 0, lastDay);
    }
    lastDate.setDate(lastDate.getDate() - ((1 + 7 - lastDate.getDay()) % 7 || 7));
    let nextMonday = lastDate.getDate();
    this.queue = [];
    myNumber = [];
    for (let i = 0; i < 7; i++) {      
      myNumber.push(lastDate.getDate());
      lastDate.setMilliseconds(lastDate.getMilliseconds()+8.64e7);
      this.queue.push({dayOfWeek: diasSemana[i], number: myNumber[i], month: currentMonth, marked: false, weekend: false, user: [],});     
    }
    //Controlador de semanas
    this.currentWeek = this.currentWeek - 1;
    if (this.currentWeek <= 0) {
      this.currentWeek = 5;
    }
    if (this.currentWeek == 5) {
      if (currentMonth === 0) {
        currentYear = currentYear - 1;
        currentMonth = 11;
      } else {
        currentYear;
        currentMonth = currentMonth - 1;
      }
      this.monthYear = this.monthYear =
        months[currentMonth] + ' ' + currentYear;
    }

    //Controlador de marcadores
    let markedVariable = this.retrieveData();
    markedVariable != null ? markedVariable : 0;
    if (markedVariable == null) {
      return 0;
    }
    for (let i = 0; i < this.queue.length; i++) {
      var match = false;
      for (let j = 0; j < markedVariable.length; j++) {
        var numerito = markedVariable[j].split(' ')[2];
        var diita = markedVariable[j].split(' ')[0];
        if (this.queue[i].number == numerito && this.queue[i].dayOfWeek == diita) {
          match = true;
          this.queue[i].marked = true;
          break;
        }
      }
    }
    this.displayMarkeds();
    this.displayUsers();    
  }


  @action changeArray(day, number) {
    let user = this.login.retrieveSessionStorage();
    this.usuario = user.replace('@copyright.com', '');
    let exceptionDate = new Date(today.getFullYear(), currentMonth, number + 1);
    if (exceptionDate < today) {
      window.alert('You cannot select days older than your current date');
    } else {
      if (day == 'Sat' || day == 'Sun') {
        window.alert('Saturday and Sunday are not allowed');
      } else {
        this.isMarked = !this.isMarked; 
        let positionObject = this.queue.findIndex((x) => x.number == number);
        this.comprobacionDia();
        this.queue.splice(
          positionObject, 
          1, 
          {
            dayOfWeek: day,
            marked: this.isMarked,
            number: number,
            weekend: true,
            month: currentMonth,
            user: this.usuario,
          }
        );
        let queueCopy = [... this.queue];
        this.queue = queueCopy;
        this.args.updateArray(this.queue, currentMonth);
      }
    }
     
  }

  comprobacionDia(){
    //Si encuentro un dia "1" y los de atrás son mayores que 28 entonces les corresponde otro mes
    for (let i = 0; i < this.queue.length; i++) {
      if(this.queue[i].number==1 && this.queue[i].dayOfWeek != "Mon"){
        var founded = this.queue.indexOf(this.queue[i]);
        //console.log(founded);
        //Desde ese momento los que están detrás del "1" serán "currentMoth - 1"  |   Y los demás serán "currentMonth"
      }
    }
  }
  
}
