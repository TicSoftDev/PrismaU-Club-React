module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // Para Node.js si se usa en scripts o configuración
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // Mejora accesibilidad en JSX
    'plugin:import/errors', // Ayuda con imports mal configurados
    'plugin:import/warnings',
    'plugin:import/typescript', // Reglas para TypeScript si lo usas
    'prettier', // Integra Prettier para el formato del código
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'build'], // Añade patrones ignorados comunes
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Habilita JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente la versión de React
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Soporte para archivos JS/TS
      },
    },
  },
  plugins: [
    'react-refresh',
    'jsx-a11y', // Reglas de accesibilidad
    'import', // Mejora manejo de imports
  ],
  rules: {
    // Reglas React
    'react/jsx-no-target-blank': 'warn', // Advertir sobre target="_blank" sin rel="noopener noreferrer"
    'react/prop-types': 'off', // Desactiva prop-types si usas TypeScript
    'react/react-in-jsx-scope': 'off', // No es necesario con React 17+
    'react/self-closing-comp': 'warn', // Sugerencia para componentes autocerrados

    // Reglas React Refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Reglas React Hooks
    'react-hooks/rules-of-hooks': 'error', // Asegura uso correcto de hooks
    'react-hooks/exhaustive-deps': 'warn', // Verifica dependencias en hooks

    // Reglas Import
    'import/no-unresolved': 'error', // Detecta imports inválidos
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],

    // Reglas generales
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignora argumentos no usados que comiencen con "_"
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Permite console.warn y console.error
    'prefer-const': 'warn', // Sugiere usar const donde sea posible
    'eqeqeq': ['error', 'always'], // Enforce uso de === y !==
  },
};
