# Workspace para libreria de prueba de Innovadeluxe

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Comenzar

Build libreria: 
```
 $ ng build idx-lib --prod
```

Correr aplicación para testing
```
$ ng serve tester-app
```

Ir a `localhost:4200/`

## Para desarrollo 

Build libreria (con Ivy): 
``` 
$ ng build idx-lib --watch 
```

Correr aplicación para testing
```
$ ng serve tester-app
```

Ir a `localhost:4200/`

## Explicación de los componentes
Para una mejor entendimiento, revisar junto a [app.component.html](./projects/tester-app/src/app/app.component.html)

### Clock
Este componente tiene como selector `idx-clock` al cual se le puede pasar el modo con el atributo `[mode]`.

Los modos son: 
* Reloj con hora actual: `[mode]="'clock'"`
* Temporizador: `[mode]="'timer'"`
* Cronometro: `[mode]="'stopwatch'"`

Si el modo no es especificaco, `clock` es el predeterminado.

Si el modo es Temporizador o Cronometro, se monstrara un boton para EMPEZAR su respectiva acción. Una vez empezado, se
monstraran botones para PARAR el temporizador y este sera reseteado o PAUSAR el tiempo.

Modo temporizador, cuando el tiempo se acabe, emitirá un evento al cual se puede acceder con `(evTimeout)`,
y este no pasara ningun parametro.
Modo cronometro, este emitirá un evento si el cronometro llega a 24h, sin pasar ningun parametro.

### Wizard

Este componente tiene la tag `ìdx-wizard` al cual se le puede pasar el titulo del wizard `[title]` el cual será mostrado
en pantalla. Este componente va de la mano de `ìdx-wizard-step`, el cual limitara cada vista del wizard. `idx-wizard-step`
también tiene un atributo `[title]`, el cual mostrara el titulo de la respectiva vista.

`idx-wizard` solo monstrará componentes `idx-wizard-step` que esten dentro de su tag. Dentro de `idx-wizard-step` se deberán
pasar los respectivos inputs de la vista. `idx-wizard-step` se comporta como un `form` tag, si un input es`required`, la vista no
será valida y el usuario no podrá avanzar la siguiente vista. 

Componente Wizard posee 4 botones disponibles:

1. INICIO: Llevará al usuario a la primera vista. Desabilitado si el usuario ya esta en la primera vista.

1. ATRAS: Llevará al usuario a la vista anterior. Desabilitado si no hay vistas anteriores.

1. SIGUIENTE: Llevara al usuario a la siguiente vista. Desabilitado si la vista no es valida, por ejemplo un `required` input
está vacio. Solo se mostrará si la vista actual NO es la última.

1. FINALIZAR: Finalizará el wizard.

Al finalizar el wizard, este emitira un evento en el componente maestro `idx-wizard` `(evFinish)` el cual pasará como parametro
un `FormData`, obviamente con los datos del wizard.

### Calendar

Este componente tiene como selector `idx-calendar` y no recive ningún parametro. Mostrará y seleccionara de manera predeterminada
la fecha actual.

Se puede cambiar el año y el mes mediante sus respectivas flechas de `<` interacción `>` o haciendo click sobre el año o mes.
En el caso del año, el usuario podra ingresar el año, y en el caso del mes el usuario podra seleccionar un mes de la lista.

El usuario tambien podra seleccionar una fecha haciendo click en los dias, esta acción actualizara la fecha seleccionada en la parte de
abajo del componente y emitirá un evento `(evSelect)` el cual pasará como parametro un `Date` con la fecha seleccionada.

Cambiar de año o mes NO cambiara la fecha seleccionada.

## Conclusiones

Una prueba bastante interesante con todos los requerimientos cumplidos. La división de subcomponentes puede mejorar, pero por cuestiones
de tiempo decidí obviar y apegarme a lo funcional SIN pender legibilidad en el código o practicidad.
