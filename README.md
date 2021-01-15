# Workspace para librería de prueba de Innovadeluxe

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 11.0.6.

## Comenzar

Build librería:
```
 $ ng build idx-lib --prod
```

Correr aplicación para testing
```
$ ng serve tester-app
```

Ir a `localhost:4200/`

## Para desarrollo

Build librería (con Ivy):
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

Si el modo no es especificado, `clock` es el predeterminado.

Si el modo es Temporizador o Cronometro, se mostrará un botón para EMPEZAR su respectiva acción. Una vez empezado, sé
mostrarán botones para PARAR el temporizador resetearlo o PAUSAR el tiempo.

Modo temporizador, cuando el tiempo se acabe, emitirá un evento al cual se puede acceder con `(evTimeout)`,
y este no pasará ningún parámetro.
Modo cronometró, este emitirá un evento si el cronómetro llega a 24 h, sin pasar ningún parámetro.

### Wizard

Este componente tiene la tag `ìdx-wizard` al cual se le puede pasar el titulo del wizard `[title]` el cual será mostrado
en pantalla. Este componente va de la mano de `ìdx-wizard-step`, el cual limitara cada vista del wizard. `idx-wizard-step`
también tiene un atributo `[title]`, el cual mostrara el título de la respectiva vista.

`idx-wizard` solo mostrará componentes `idx-wizard-step` que esten dentro de su tag. Dentro de `idx-wizard-step` se deberán
pasar los respectivos inputs de la vista. `idx-wizard-step` se comporta como un `form` tag, si un input es`required`, la vista no
será válida y el usuario no podrá avanzar la siguiente vista.

Componente Wizard posee 4 botones disponibles:

1. INICIO: Llevará al usuario a la primera vista. Deshabilitado si el usuario ya está en la primera vista.

1. ATRAS: Llevará al usuario a la vista anterior. Deshabilitado si no hay vistas anteriores.

1. SIGUIENTE: Llevará al usuario a la siguiente vista. Deshabilitado si la vista no es válida, por ejemplo un `required` input
está vacío. Solo se mostrará si la vista actual NO es la última.

1. FINALIZAR: Finalizará el wizard.

Al finalizar el wizard, este emitirá un evento en el componente maestro `idx-wizard` `(evFinish)` el cual pasará como parámetro
un `FormData`, obviamente con los datos del wizard.

### Calendar

Este componente tiene como selector `idx-calendar` y no recibe ningún parámetro. Mostrará y seleccionará de manera predeterminada
la fecha actual.

Se puede cambiar el año y el mes mediante sus respectivas flechas de `<` interacción `>` o haciendo clic sobre el año o mes.
En el caso del año, el usuario podrá ingresar el año, y en el caso del mes el usuario podrá seleccionar un mes de la lista.

El usuario también podrá seleccionar una fecha haciendo clic en los días, esta acción actualizará la fecha seleccionada en la parte de
abajo del componente y emitirá un evento `(evSelect)` el cual pasará como parámetro un `Date` con la fecha seleccionada.

Cambiar de año o mes NO cambiará la fecha seleccionada.

## Conclusiones

Una prueba bastante interesante con todos los requerimientos cumplidos. La división de subcomponentes puede mejorar, pero por cuestiones
de tiempo decidí obviar y apegarme a lo funcional SIN pender legibilidad en el código o practicidad.
