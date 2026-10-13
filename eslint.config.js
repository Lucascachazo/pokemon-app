// Configura ESLint siguiendo la guía oficial de Expo.
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  // Reutiliza las reglas recomendadas por Expo.
  expoConfig,
  {
    // Ignora la carpeta generada al exportar la aplicación.
    ignores: ["dist/*"],
    settings: {
      // Permite que las reglas de imports lean archivos TypeScript y TSX.
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  }
]);
