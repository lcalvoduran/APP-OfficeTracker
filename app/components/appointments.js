import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
//Cheatsheet: Date (year, month, day, hour, min, sec, mili)
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
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
  @tracked queue = [
    {
      dayOfWeek: 'Mon',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: true,
      user: [],
    },
    {
      dayOfWeek: 'Tue',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: true,
      user: [],
    },
    {
      dayOfWeek: 'Wed',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: true,
      user: [],
    },
    {
      dayOfWeek: 'Thu',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: true,
      user: [],
    },
    {
      dayOfWeek: 'Fri',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: true,
      user: [],
    },
    {
      dayOfWeek: 'Sat',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: false,
      user: [],
    },
    {
      dayOfWeek: 'Sun',
      marked: false,
      number: 0,
      month: currentMonth,
      weekend: false,
      user: [],
    },
  ];

  constructor() {
    super(...arguments);
    this.showMyCalendar(currentMonth, currentYear);
    this.displayMarkedDays();
    this.editUsernames();
    this.displayedSavedDays();
  }

  currentMonday(d) {
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let variable = new Date(d.setDate(diff));
    return variable;
  }

  showMyCalendar(month, year) {
    this.monthYear = months[currentMonth] + ' ' + currentYear;
    this.currentWeek = this.myCurrentWeek();
    this.currentWeekDays();
  }

  myCurrentWeek() {
    let startDate = new Date(today.getFullYear(), currentMonth, 1);
    let myDays = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(myDays / 7) + 1;
  }

  currentWeekDays() {
    // getDay() 0-6 >> 1 Monday , 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday |||||||||| queue >> 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday
    let hoy = this.currentMonday(today);
    this.queue[0].number = hoy.getDate();
    for (let i = 1; i < this.queue.length; i++) {
      this.queue[i].number = hoy.setMilliseconds(
        hoy.getMilliseconds() + 8.64e7
      );
      this.queue[i].number = hoy.getDate();
    }
  }

  @action changeArray(day, number) {
    this.editUsernames();
    let exceptionDate = new Date(today.getFullYear(), currentMonth, number + 1);
    if (exceptionDate < today) {
      window.alert('You cannot select days older than your current date');
    } else {
      if (day == 'Sat' || day == 'Sun') {
        window.alert('Saturday and Sunday are not allowed');
      } else {
        this.isMarked = !this.isMarked;
        let positionObject = this.queue.findIndex((x) => x.number == number);
        this.queue.splice(
          positionObject, 
          1, 
          {
            dayOfWeek: day,
            marked: this.isMarked,
            number: number,
            weekend: true,
            month: currentMonth,
          }
        );
        let newArray = this.queue;
        this.queue = newArray;
        let dateFormatted = new Date(currentYear, currentMonth, number);
        this.args.updateArray(
          newArray,
          dateFormatted,
          currentMonth,
          !this.isMarked
        );        
      }
    }
  }

  @action next() {
    if (this.currentWeek == 1) {
      this.getNextMonday(1);
    } else {
      this.getNextMonday(0);
    }
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
  }

  getNextMonday(varMonth) {
    let lastDay = this.queue[0].number;
    let lastDate = new Date(currentYear, currentMonth - varMonth, lastDay);
    lastDate.setDate(
      lastDate.getDate() + ((1 + 7 - lastDate.getDay()) % 7 || 7)
    );
    let nextMonday = lastDate.getDate();
    let otherDays = [];
    let markedBoolean = false;
    for (let i = 0; i < this.queue.length - 1; i++) {
      lastDate.setMilliseconds(lastDate.getMilliseconds() + 8.64e7);
      otherDays.push(lastDate.getDate());
      this.queue = [
        {
          dayOfWeek: 'Mon',
          number: nextMonday,
          marked: markedBoolean,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Tue',
          number: otherDays[0],
          marked: markedBoolean,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Wed',
          number: otherDays[1],
          marked: markedBoolean,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Thu',
          number: otherDays[2],
          marked: markedBoolean,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Fri',
          number: otherDays[3],
          marked: markedBoolean,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Sat',
          number: otherDays[4],
          marked: markedBoolean,
          month: currentMonth,
          weekend: false,
          user: [],
        },
        {
          dayOfWeek: 'Sun',
          number: otherDays[5],
          marked: markedBoolean,
          month: currentMonth,
          weekend: false,
          user: [],
        },
      ];
    }
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
    this.displayedSavedDays();
  }

  getPreviousMonday(varMonth) {
    let lastDay = this.queue[0].number;
    let lastDate = new Date(currentYear, currentMonth - varMonth, lastDay);
    lastDate.setDate(
      lastDate.getDate() - ((1 + 7 - lastDate.getDay()) % 7 || 7)
    );
    let nextMonday = lastDate.getDate();
    let otherDays = [];
    for (let i = 0; i < this.queue.length - 1; i++) {
      lastDate.setMilliseconds(lastDate.getMilliseconds() + 8.64e7);
      otherDays.push(lastDate.getDate());
      this.queue = [
        {
          dayOfWeek: 'Mon',
          number: nextMonday,
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Tue',
          number: otherDays[0],
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Wed',
          number: otherDays[1],
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Thu',
          number: otherDays[2],
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Fri',
          number: otherDays[3],
          month: currentMonth,
          weekend: true,
          user: [],
        },
        {
          dayOfWeek: 'Sat',
          number: otherDays[4],
          month: currentMonth,
          weekend: false,
          user: [],
        },
        {
          dayOfWeek: 'Sun',
          number: otherDays[5],
          month: currentMonth,
          weekend: false,
          user: [],
        },
      ];
    }
    let markedVariable = this.retrieveData();
    markedVariable != null ? markedVariable : 0;

    for (let i = 0; i < this.queue.length; i++) {
      var match = false;
      if (markedVariable == null) {
        return 0;
      }
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
    this.displayedSavedDays();
  }

  @action back() {
    if (this.currentWeek == 1) {
      this.getPreviousMonday(1);
    } else {
      this.getPreviousMonday(0);
    }

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
  }

  editUsernames() {
    let variable = this.login.retrieveSessionStorage();
    this.Usuario = variable.replace('@copyright.com', '');
  }

  retrieveData() {
    let variable = this.login.retrieveSessionStorage();
    let daysLocal = JSON.parse(localStorage.getItem(variable));
    console.log(daysLocal);
    console.log(this.args.arrayDays);
    if (variable) {
      if (daysLocal) {
        daysLocal.reduce((a, v) => ({ ...a, [v]: v }), {});
        return daysLocal;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  displayMarkedDays() {
    var numerito2;
    var day2;
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

  displayedSavedDays() {
    for (var key in localStorage) {
      if (key.includes('@')) {
        this.userList.push({ user: key });
      }
    }
    for (let i = 0; i < this.userList.length; i++) {
      var daysStored = JSON.parse(localStorage.getItem(this.userList[i].user));
      this.userList[i].days = daysStored;
    }

    //Si el día, el mes y el number coinciden con algunos de los dias de la semana le colocas a esa posicion del this.queue el usuario correspondiente a ese día.
    //Funciona para un usuario y para el último dia de ese usuario
    var objectU;
    let objectX;
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
}
