# Guía de Integración - HuertoHogar

Este documento registra lo que **se extrajo del HTML** (CSS, JavaScript, Bootstrap) para
desarrollarse en una etapa futura, y cómo integrarlo a los archivos HTML del proyecto.

Los archivos HTML de `final-page/` están escritos **solo con HTML puro**: sin `<link>`,
sin `<script>`, sin clases de Bootstrap ni estilos inline. Cada página conserva
`id` y `class` semánticos listos para ser estilizados y manipulados.

---

## Estructura de archivos

```
final-page/
├── index.html          # Inicio: hero, misión, productos destacados, sucursales
├── tienda.html         # Catálogo: 9 productos en 4 categorías
├── nosotros.html       # Historia, misión, visión, valores, sucursales, mapa placeholder
├── contacto.html       # Formulario de contacto + información
├── registro.html       # Creación de cuenta (solo accesible desde login.html)
├── login.html          # Acceso a cuenta existente (correo + contraseña)
├── perfil.html         # Gestión de perfil + historial de compras (requiere sesión)
├── carrito.html        # Resumen de compras (requiere sesión para ver contenido)
├── style.css           # Estilos CSS (POR CREAR)
├── funciones.js        # Funciones JavaScript (POR CREAR)
└── INTEGRACION.md      # Este archivo
```

---

## 1. Integrar Bootstrap 5.3.8 (opcional)

Los HTML no importan Bootstrap. Para usarlo, agregar en el `<head>` de cada archivo:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
```

Y justo antes de `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

Con Bootstrap se puede convertir el `<nav id="menu">` en una navbar responsive
(`navbar navbar-expand-lg`) y las secciones en contenedores `container`, `row`, `col-md-*`.

---

## 2. Integrar CSS - `style.css`

### 2.1 Vincularlo en el `<head>` de cada HTML

```html
<link rel="stylesheet" href="style.css">
```

### 2.2 Paleta de colores (según el caso de estudio)

```css
:root {
    --verde: #2E8B57;       /* Verde Esmeralda - botones, enlaces, interactivos */
    --amarillo: #FFD700;    /* Amarillo Mostaza - ofertas y promociones */
    --marron: #8B4513;      /* Marrón Claro - títulos y subtítulos */
    --blanco: #F7F7F7;      /* Blanco Suave - fondo principal */
    --gris-oscuro: #333333; /* Texto principal */
    --gris-medio: #666666;  /* Texto secundario */
}

body {
    background-color: var(--blanco);
    color: var(--gris-oscuro);
    font-family: 'Montserrat', sans-serif;
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: var(--marron);
}

#menu {
    background-color: var(--verde);
    color: white;
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
}

#menu a {
    color: white;
    text-decoration: none;
}

#piedepagina {
    background-color: var(--gris-oscuro);
    color: white;
}
```

### 2.3 Fuentes de Google Fonts

Agregar en el `<head>` de cada HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```

### 2.4 Estilizar las secciones con `id` ya presentes

Las secciones ya tienen `id` listos para CSS:
- `#hero`, `#mision`, `#destacados`, `#sucursales` (index.html)
- `#catalogo`, `#frutas`, `#verduras`, `#organicos`, `#lacteos` (tienda.html)
- `#historia`, `#vision`, `#valores`, `#mapa`, `#mapa-tiendas` (nosotros.html)
- `#contacto-info`, `#formulario`, `#contacto-datos` (contacto.html)
- `#menu`, `#piedepagina` (todas)

También se dejó una clase `producto` en cada card de productos de tienda.html
y `campo` en cada campo del formulario, para agrupar su estilo.

---

## 3. Integrar JavaScript - `funciones.js`

### 3.1 Vincularlo antes de `</body>` en cada HTML

```html
<script src="funciones.js"></script>
```

Para que funcione en **todos** los HTML a la vez, cada página debe envolver su
contenido (menos navbar y footer) en un contenedor con el mismo `id`, por ejemplo
`id="contenido-principal"`.

### 3.2 Navegación SPA (sin recargar la página)

```javascript
document.querySelectorAll('#menu a').forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
        e.preventDefault();
        var url = this.getAttribute('href');

        fetch(url)
            .then(function (resp) { return resp.text(); })
            .then(function (html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                var contenido = doc.getElementById('contenido-principal');
                document.getElementById('contenido-principal').innerHTML = contenido.innerHTML;
                history.pushState(null, '', url);
            });
    });
});
```

### 3.3 Validación del formulario de contacto

El formulario en `contacto.html` usa `id` en cada campo (`nombre`, `email`,
`telefono`, `asunto`, `mensaje`) para ser validado:

```javascript
function validarFormulario() {
    var campos = ['nombre', 'email', 'telefono', 'mensaje'];
    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]);
        if (campo.value === '') {
            alert('Por favor completa el campo: ' + campo.id);
            return false;
        }
    }
    alert('Mensaje enviado correctamente. ¡Gracias!');
    return true;
}
```

Para activar la validación, agregar el atributo al botón del formulario:

```html
<button type="submit" onclick="validarFormulario()">Enviar</button>
```

### 3.4 Carrito de compras

Los productos de `tienda.html` están en `<div class="producto">` con un `<h3>` que
contiene el código y nombre (ej. `FR001 - Manzanas Fuji`). Se puede agregar un botón
"Agregar al carrito" a cada uno:

```javascript
var carrito = [];

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto: producto, precio: precio });
    var total = carrito.reduce(function (suma, item) { return suma + item.precio; }, 0);
    alert(producto + ' agregado. Total: $' + total + ' CLP');
}
```

Y en cada card de tienda.html:

```html
<button onclick="agregarAlCarrito('FR001 - Manzanas Fuji', 1200)">Agregar al carrito</button>
```

### 3.5 Registro y autenticación de usuarios

Para esta etapa de front-end (sin backend), el registro y login funcionan en el
navegador usando `localStorage`. Los formularios ya existen en `registro.html`
(`id="formulario-registro"`) y `login.html` (`id="formulario-login"`), con `id` en
cada campo: `nombre`, `email`, `password`, `password2`, `telefono`, `direccion`.

#### Registro (guardar cuenta)

```javascript
function registrarUsuario() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    if (nombre === '' || email === '' || password === '') {
        return alert('Por favor completa todos los campos obligatorios.');
    }
    if (password !== password2) {
        return alert('Las contraseñas no coinciden.');
    }

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    var existe = usuarios.some(function (u) { return u.email === email; });
    if (existe) {
        return alert('Ya existe una cuenta con ese correo.');
    }

    usuarios.push({ nombre: nombre, email: email, password: password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cuenta creada correctamente. Ya puedes iniciar sesión.');
    window.location.href = 'login.html';
}
```

Vincular en `registro.html`:

```html
<button type="submit" onclick="registrarUsuario()">Registrarme</button>
```

#### Login (validar credenciales)

```javascript
function iniciarSesion() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = usuarios.find(function (u) {
        return u.email === email && u.password === password;
    });

    if (!usuario) {
        return alert('Correo o contraseña incorrectos.');
    }

    sessionStorage.setItem('sesion', JSON.stringify(usuario));
    alert('Bienvenido, ' + usuario.nombre + '!');
    window.location.href = 'index.html';
}

function cerrarSesion() {
    sessionStorage.removeItem('sesion');
    window.location.href = 'index.html';
}
```

Vincular en `login.html`:

```html
<button type="submit" onclick="iniciarSesion()">Entrar</button>
```

> **Nota:** El `id` `email`/`password` aparece en varias páginas, pero solo se
> consulta dentro de la página activa, así que no hay conflicto.

#### Estado de sesión en el navbar

Para mostrar si hay un usuario logueado, `funciones.js` puede leer la sesión al
cargar cada página:

```javascript
var sesion = JSON.parse(sessionStorage.getItem('sesion'));

if (sesion) {
    // Mostrar "Hola, <nombre>" y un enlace de "Cerrar sesión" en #menu
    var hola = document.createElement('span');
    hola.textContent = 'Hola, ' + sesion.nombre;
    document.getElementById('menu').appendChild(hola);
}
```

> **Advertencia de seguridad:** `localStorage` y `sessionStorage` guardan la
> contraseña en texto plano dentro del navegador, por lo que **no son seguros**.
> Para este proyecto académico de front-end resultan suficientes como demostración.
> Un sistema real requiere un backend que almacene contraseñas con hash (ej. bcrypt)
> y gestione sesiones o tokens.

### 3.6 Comportamiento del navbar según la sesión

El navbar (`<nav id="menu">`) es estático en el HTML para que la estructura sea
clara. Las páginas principales (`index`, `tienda`, `nosotros`, `contacto`) muestran
**Inicio, Tienda, Nosotros, Contacto, Iniciar sesión y Carrito**. No incluyen
"Registro": esa página solo es accesible desde el enlace interno de `login.html`.

En `INTEGRACION` el JavaScript se encarga de ocultar/mostrar opciones según la sesión:

```javascript
function renderizarMenu() {
    var sesion = JSON.parse(sessionStorage.getItem('sesion'));
    var menu = document.getElementById('menu');

    if (sesion) {
        // Con sesión: reemplazar "Iniciar sesión" por "Hola, <nombre>" y agregar "Perfil"
        var enlaces = menu.querySelectorAll('a');
        enlaces.forEach(function (a) {
            if (a.getAttribute('href') === 'login.html') {
                a.textContent = 'Hola, ' + sesion.nombre;
                a.setAttribute('href', 'perfil.html');
            }
        });

        var perfil = document.createElement('a');
        perfil.setAttribute('href', 'perfil.html');
        perfil.textContent = 'Perfil';
        menu.appendChild(perfil);

        var logout = document.createElement('a');
        logout.textContent = 'Cerrar sesión';
        logout.href = '#';
        logout.addEventListener('click', cerrarSesion);
        menu.appendChild(logout);
    }
}
```

#### Protección del carrito según sesión

El enlace "Carrito" siempre aparece en las páginas principales. Si no hay sesión
iniciada, al entrar a `carrito.html` se debe redirigir a `login.html`:

```javascript
// En carrito.html (y perfil.html)
var sesion = JSON.parse(sessionStorage.getItem('sesion'));
if (!sesion) {
    alert('Inicia sesión para ver tu carrito.');
    window.location.href = 'login.html';
}
```

Con este código, "Carrito" invita a iniciar sesión cuando no hay sesión activa y
muestra el contenido una vez autenticado.

### 3.7 Perfil de usuario (actualización e historial)

`perfil.html` contiene el formulario `#formulario-perfil` con campos `id`:
`nombre`, `email`, `telefono`, `direccion`. Para guardar los cambios:

```javascript
function guardarPerfil() {
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var direccion = document.getElementById('direccion').value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var sesion = JSON.parse(sessionStorage.getItem('sesion'));

    usuarios.forEach(function (u) {
        if (u.email === sesion.email) {
            u.nombre = nombre;
            u.telefono = telefono;
            u.direccion = direccion;
        }
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Perfil actualizado correctamente.');
}
```

El historial de compras (`#tabla-historial`) se completa dinámicamente con los
pedidos guardados en `localStorage` por el carrito.

### 3.8 Carrito de compras (agregar, modificar, totales)

`carrito.html` contiene los contenedores `#carrito-contenido` (productos) y
`#resumen-carrito` con `#subtotal`, `#envio` y `#total`. Ejemplo base de gestión:

```javascript
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
    var carrito = obtenerCarrito();
    var contenedor = document.getElementById('carrito-contenido');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    var html = '<ul>';
    var total = 0;
    carrito.forEach(function (item) {
        html += '<li>' + item.producto + ' x' + item.cantidad + ' = $' + (item.precio * item.cantidad) + ' CLP</li>';
        total += item.precio * item.cantidad;
    });
    html += '</ul>';
    contenedor.innerHTML = html;

    document.getElementById('subtotal').textContent = '$' + total + ' CLP';
    document.getElementById('total').textContent = '$' + total + ' CLP';
}
```

Esta función renderiza productos, soporta cantidades y calcula subtotal y total,
que se reflejan en los `span` del resumen.

---

## 4. Integrar Google Maps

`nosotros.html` contiene el placeholder `<div id="mapa-tiendas">`. Para reemplazarlo
con un mapa real, usar un iframe:

```html
<iframe
    src="https://www.google.com/maps/embed?pb=TU_CODIGO_DE_EMBEBIDO"
    width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy">
</iframe>
```

Obtener el código desde Google Maps > Compartir > Insertar un mapa.

---

## 5. Resumen de pasos

1. (Opcional) Agregar el CDN de Bootstrap en cada HTML.
2. Crear `style.css` con la paleta y fuentes del caso de estudio.
3. Vincular `style.css` en el `<head>` de cada HTML.
4. Editorial: envolver el contenido de cada página en `<div id="contenido-principal">`.
5. Crear `funciones.js` (SPA, validación, carrito).
6. Vincular `funciones.js` antes de `</body>` en cada HTML.
7. Agregar el iframe de Google Maps en `nosotros.html`.
8. Probar la navegación y funcionalidades en el navegador.
