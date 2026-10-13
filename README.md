# Pokédex

Aplicación móvil desarrollada para challenge técnico. Permite explorar Pokémon, consultar sus detalles y guardar favoritos que quedan disponibles sin conexión.

## Funcionalidades

- Listado paginado con scroll infinito.
- Búsqueda por nombre.
- Pantalla de detalle con imagen, tipos, medidas, habilidades y estadísticas.
- Agregar y quitar favoritos.
- Persistencia local de favoritos y de la última lista cargada.
- Indicadores de carga y mensajes de error (Experiencia de UI).

## Tecnologías

- Expo SDK 54 y React Native.
- TypeScript.
- React Navigation.
- Axios y [PokéAPI](https://pokeapi.co/).
- AsyncStorage para la persistencia local.

## Ejecutar el proyecto

Requiere Node.js y npm.

```bash
npm install
npm start
```

Comandos disponibles:

```bash
npm run android
npm run ios
npm run web
npm run lint
npm test
npx tsc --noEmit
```
