# APP-OfficeTracker


BUG/FIXES

> TODO al seleccionar NEXT o BACK se pierden los selected days anteriores y eso conlleva a que se me borre de la BBDD.
"Nos encontramos con el problema en login.js en la linea 34 para "saveSelecteds" que nos vuelve a colocar el array a [], hay que arreglarlo"

> Tengo que arreglar lo de que pilla el mes que no es, por ende en el selected day pues se le cambia al siguiente mes cuando resulta que es el anterior.
