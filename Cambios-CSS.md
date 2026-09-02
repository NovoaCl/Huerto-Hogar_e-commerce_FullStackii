# Cambios CSS — Ancho del contenido al 60%

## Archivo modificado
- `HuertoHogar/css/style.css`

## Objetivo
- El **contenido** (textos, tablas, secciones, formularios) ocupa el **60% del ancho** de la pantalla, centrado horizontalmente, con estética de columna de lectura.
- El **banner** (`#hero`), el **menú** (`#menu`) y el **pie de página** (`#piedepagina`) ocupan el **ancho total** de la página.
- El **menú de navegación** se encuentra alineado al **lado derecho**.
- El **pie de página** queda **al fondo** de cada pestaña (no estático, responde a la altura de la ventana).

## Qué se añadió/modificó

### 1. Nueva regla `html`
Fondo blanco en toda la página para que el área fuera del 60% use el mismo color `--blanco` y se vea uniforme.

```css
html {
    background-color: var(--blanco);
}
```

### 2. Regla `body` modificada
Se reemplazó el `max-width: 60%` anterior por un esquema de **flex en columna** con altura mínima de ventana. Esto permite que el contenido se limite al 60%, que el menú/banner/pie queden a ancho completo y que el pie caiga al fondo de cada pestaña.

```css
body {
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--blanco);
    color: var(--gris-oscuro);
    font-family: 'Montserrat', sans-serif;
}
```

### 3. Nueva regla: contenido al 60% centrado
Todos los hijos directos del `body` que **no** sean el menú (`nav`), el banner (`#hero`), el pie (`footer`) ni `script` quedan limitados al 60% y centrados.

```css
body > :not(nav):not(#hero):not(footer):not(script) {
    width: 60%;
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
}
```

### 4. Banner `#hero`: ancho completo con texto interno al 60%
El banner ocupa todo el ancho, pero su título y párrafo se limitan al 60% centrado para que queden simétricos con el resto del cuerpo (corrige el texto que quedaba al tamaño de pantalla).

```css
#hero h1,
#hero p {
    width: 60%;
    max-width: 60%;
    margin: 1rem auto;
}
```

### 5. Regla `#menu` modificada — menú a la derecha
Se alinean los enlaces de navegación hacia el lado derecho con `justify-content: flex-end`. Al quedar el menú a ancho completo de forma natural, ya no se corta el texto "Iniciar sesión".

```css
#menu {
    background-color: var(--verde);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
}
```

### 6. Regla `#piedepagina` modificada — pie al fondo de la pestaña
Con `margin-top: auto`, el pie se empuja al fondo de la ventana gracias a la columna flexible del `body`, en todas las pestañas (incluidas las cortas como Login o Carrito).

```css
#piedepagina {
    background-color: var(--gris-oscuro);
    color: white;
    padding: 1rem;
    margin-top: auto;
}
```

## Notas
- Se eliminó la técnica *full-bleed* anterior (`width: 100vw; margin-left: calc(50% - 50vw)`), que desbordaba el menú y lo recortaba.
- Las tablas y formularios heredan el 60% de su contenedor con `width: 100%`, sin necesidad de modificarlos individualmente.
- En páginas cortas (Login, Carrito) el pie queda al fondo de la pantalla; en páginas largas (Tienda) queda al final del contenido.

## Resultado esperado
- Textos, tablas y secciones centrados al 60% del ancho.
- Banner, menú y pie de página a lo ancho de toda la pantalla.
- Enlaces del menú alineados al lado derecho, sin cortes.
- Pie de página al fondo de cada pestaña.