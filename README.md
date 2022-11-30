# APP-OfficeTracker


BUG/FIXES

> TODO al seleccionar NEXT o BACK se pierden los selected days anteriores y eso conlleva a que se me borre de la BBDD.
ENCONTRADO bug --> En la linea 62 de bookings.js el return con intersection no está bien hecho

> Tengo que arreglar lo de que pilla el mes que no es, por ende en el selected day pues se le cambia al siguiente mes cuando resulta que es el anterior.
