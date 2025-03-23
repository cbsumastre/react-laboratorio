## Listado imágenes

En este ejercicio vamos a prácticar con React route y contexto.

### Enunciado

Como miembro de un portal de un banco de imágenes nos piden tener un carrito de la compra siempre visible: - El usuario tiene un area principal en la que se muestra una página con imágenes, cada imagen tiene un checkbox que permite seleccionarlo y añadirlo al carrito de la compra (cada imagen tiene un ID). ✅

- Para simplificar vamos a tener dos páginas distintas con imágenes seleccionables - A la derecha (fuera de React-router) mostramos un carrito de la compra. ✅

- Cada vez que el usuario selecciona una imagen en una de las páginas se añade al carrito. - Si un usuario borra la imagen del carrtio se deselecciona de la página (en cado de que esté activa). ✅

**Pistas**

- Arranca por montar las páginas y que tenga unos datos mockeados con el siguiente interfaz para cada imagen.

```ts
interface PictureInfo {
    id: string;
    picUrl: string;
    title: string;
}
```

- Create un componente carrito y muéstralo fuera del routing (o si quieres podrías definir un layout para esto).

- Una vez funcionando, piensa que para el carrito de la compra sólo te hace falta ua lista de id`s de imágenes:
    - Arranca vacía ✅
    - Cada vez que selecciono una imagen la añado a ese array del contexto. ✅
    - Si la eliminas del area del carrito se tiene que deseleccionar de la ventana que se este mostrando. ✅
    - ¿Como hacemos esto?
    - Al cargar una página create un ViewMOdel con el siguiente campo de más:

```diff
interface PictureInfo {
    id: string;
    picUrl: string;
    title: string;
+   selected: boolean;    
}
```
- Nada más cargar la página mira el contexto y pon a true los selected que toquen. ✅

- Si marco en la página pongo el campo a true/false, y además hago un Set al contexto para actualizarlo (automáticamente se actualizará en el carrito). ✅

- En el carrio iría de la otra manera, si deschequo el carrito hago un check y la ventana de turno estará usando un useEffect escuchando la ventana del carrito para actualizar sus datos. ✅

#### Ideas opcionales:
- Haz que el carrito se pueda ocultar. 
- Implementa una página de "checkout" para hacer el pedido.
- Estílalo con Material UI.
- Añade una opción de vaciar carrito.
- Catálogo en local storage 



