# GIFinder - Explorador de contenido multimedia

Este proyecto es una aplicación web interactiva para explorar una colección local de GIFs, desarrollada como parte de la evaluación **EC1 - Fundamentos de TypeScript**.

## Funcionalidades actuales

- Representación tipada de GIFs mediante interfaces y tipos literales.
- Galería de tarjetas generada dinámicamente desde un arreglo local[cite: 1].
- Búsqueda funcional por título, autor, etiqueta y descripción (ignorando mayúsculas y espacios externos)[cite: 1].
- Manejo del caso sin resultados, mostrando un estado vacío claro[cite: 1].

## Estado del proyecto

EC1 F1 A2 completada. Los datos aún son locales; la integración con Giphy API se realizará después[cite: 1].

---

## Investigación Adicional: Conceptos Clave de JavaScript / TypeScript

### 1. Arrow Functions (Funciones Flecha)

Las _Arrow Functions_ son una sintaxis más corta y moderna para escribir funciones en JavaScript (introducidas en ES6).

- **Sintaxis concisa:** Permiten omitir la palabra `function`, las llaves `{}` y la palabra `return` si el bloque de código tiene una sola línea.
- **Contexto de `this`:** A diferencia de las funciones tradicionales, las arrow functions no crean su propio contexto `this`, sino que lo heredan del ámbito (scope) donde fueron creadas.
- _Ejemplo usado en este proyecto:_ `const safeGifs = gifs.filter((gif) => gif.rating === 'g');`

### 2. Destructuración (Destructuring)

La destructuración es una expresión que permite desempacar o extraer valores de arreglos, o propiedades de objetos, y asignarlos a variables distintas de forma directa.

- **Ventaja:** Reduce la cantidad de código, ya que extrae las propiedades sin necesidad de repetir el nombre del objeto constantemente (ej. evitar escribir `gif.title`, `gif.url`)[cite: 1].
- **Valores por defecto:** Permite asignar valores predeterminados en caso de que la propiedad original sea `undefined`[cite: 1].
- _Ejemplo usado en este proyecto:_
  \`\`\`typescript
  const { title, url, username = 'Autor no disponible' } = gif;
  \`\`\`

### 3. Recursividad

La recursividad es un concepto de programación donde una función **se llama a sí misma** para resolver un problema.

- **Casos de uso:** Es sumamente útil para recorrer estructuras de datos anidadas, como árboles (el DOM del navegador) o carpetas de archivos.
- **Estructura obligatoria:** Toda función recursiva debe tener una "condición base" (para detenerse) y un "caso recursivo" (donde se llama a sí misma con un problema más pequeño). Si se omite la condición base, el navegador colapsará por un ciclo infinito (Stack Overflow).
- _Ejemplo básico (Factorial):_
  \`\`\`javascript
  function factorial(n) {
  if (n === 0) return 1; // Condición base
  return n \* factorial(n - 1); // Llamada recursiva
  }
  \`\`\`

  # Preguntas de cierre - EC1 F2 A3

## 1. ¿Qué significa refactorizar una aplicación?
Refactorizar significa mejorar la organización interna del código sin cambiar innecesariamente su comportamiento observable.

## 2. ¿Por qué el proyecto se dividió en módulos?
El proyecto se dividió en módulos para distribuir el código asignándole responsabilidades específicas y claras, tales como separar los modelos, los datos locales, los servicios de búsqueda y los componentes de la interfaz.

## 3. ¿Cuál es la responsabilidad de main.ts?
La responsabilidad principal de `main.ts` es inicializar la interfaz y coordinar los módulos. Específicamente, construye la estructura principal, valida el DOM, registra los eventos e importa los módulos necesarios sin repetir las funciones que ya fueron delegadas.

## 4. ¿Qué diferencias existen entre una interfaz, un tipo unión y una enumeración?
De acuerdo con el documento:
* **Interfaz:** Define el contrato o la estructura de un objeto, como en el caso del modelo `Gif`.
* **Tipo unión:** Limita una propiedad a valores permitidos específicos, como se observa en `GifRating = 'g' | 'pg' | 'pg-13'`.
* **Enumeración:** Agrupa valores relacionados bajo un nombre común para representar estados (como `RequestStatus`), evitando el uso de cadenas de texto dispersas.

## 5. ¿Para qué se utiliza import type?
`import type` se utiliza para comunicar al compilador que lo que se está importando (por ejemplo, el modelo `Gif`) solo se utilizará durante la comprobación de tipos.

## 6. ¿Dónde se aplicaron la desestructuración, spread y rest?
* **Desestructuración:** Se aplicó sobre objetos para extraer propiedades (como `id`, `title`, `url`) al crear tarjetas y detalles, evitando repetir expresiones como `gif.title`. También se usó sobre arreglos para extraer `mainTag`.
* **Spread (`...`):** Se utilizó `...gif.tags` para incorporar las etiquetas al texto de búsqueda y `[...collection]` para crear una copia superficial del arreglo de datos.
* **Rest:** Se empleó como `...secondaryTags` al aplicar desestructuración sobre el arreglo de etiquetas.

## 7. ¿Por qué searchGifs recibe la colección como parámetro?
Recibe la colección como parámetro porque el servicio (`gif.service.ts`) tiene la responsabilidad exclusiva de ejecutar búsquedas y consultas sobre los datos, mientras que la acción de solicitar los resultados pasándole la colección local ocurre de forma coordinada desde `main.ts`.

## 8. ¿Por qué findGifById puede devolver undefined?
Puede devolver `undefined` porque utiliza el método `find`, el cual devuelve el primer GIF coincidente o `undefined` en caso de no encontrar ninguno. Este retorno tipado obliga al desarrollador a validar el resultado antes de usarlo.

## 9. ¿Qué función cumple data-gif-id?
El atributo `data-gif-id` cumple la función de almacenar el identificador del GIF, el cual se utilizará más adelante al momento de seleccionar una tarjeta.

## 10. ¿Qué es la delegación de eventos?
La delegación de eventos es una técnica que permite identificar el elemento interactuado (por ejemplo, un botón seleccionado) sobre contenido que se genera dinámicamente.

## 11. ¿Por qué el estado Loading podría no observarse?
El estado `Loading` podría no observarse debido a que la búsqueda actual utiliza datos locales y se ejecuta de manera casi instantánea. El proceso suele terminar antes de que el navegador alcance a actualizar visualmente la pantalla.

## 12. ¿Qué dificultad se presentó durante la refactorización y cómo se resolvió?
Al inicio nomas por que la terminal que tenia era antiguia y no me dejaba hacer un `pnpm build` pero de ahi estuvo bien las indicaciones.