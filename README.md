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