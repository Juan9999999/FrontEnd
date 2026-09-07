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