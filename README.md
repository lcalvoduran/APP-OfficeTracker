# APP-OfficeTracker


BUG/FIXES

> TASK 3

    Vamos guardando en el localStorage pero por fechas de esta manera
    var prueba = new Date(2022, 9, 19)
    localStorage.setItem('pruebecilla', prueba)
    prueba = new Date(localStorage.getItem(prueba))

    /**
    De esta manera estamos metiendo fechas que luego se convertirán en Strings en el localStorage, pero no pasa nada, porque las sacaremos y las volveremos a convertir en fechas para
    finalmente poder hacerles un getDate() para que me de el número, o un getMonth() para que me de el mes.
    **/

> Tengo que arreglar lo de que pilla el mes que no es, por ende en el selected day pues se le cambia al siguiente mes cuando resulta que es el anterior.

  @action changeArray(day, number) {
    let user = this.login.retrieveSessionStorage();
    console.log("currentMonth: " + months[currentMonth]);
    this.Usuario = user.replace('@copyright.com', '');
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
            user: this.Usuario,
          }
        );
        let queueCopy = [... this.queue];
        this.queue = queueCopy;
        this.args.updateArray(this.queue, currentMonth);
      }
    }
  }

  /**
    Si por ejemplo tenemos algún día que sea "1" después del Lunes, tenemos que darnos cuenta de que los días anteriores a ese "1" van a ser de UN MES POSTERIOR
  **/