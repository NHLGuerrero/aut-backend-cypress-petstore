<div align="center">
  <h1>Cypress Backend Testing Accelerator</h1>
  <img src="media/cypress-logo.png" width="350" alt="Cypress Logo" />
</div>

## Índice
1. [Descripción](#descripción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Estructura de Carpetas](#estructura-de-carpetas)
6. [Ejemplos Incluidos](#ejemplos-incluidos)
7. [Configuración](#configuración)
8. [Tecnologías Utilizadas](#tecnologías-utilizadas)
9. [Recursos Adicionales](#recursos-adicionales)
10. [Ejemplos Visuales](#ejemplos-visuales)
11. [Contribución](#contribución)
12. [Licencia](#licencia)

## Descripción
Este proyecto es una implementación de pruebas automatizadas de backend utilizando Cypress y Mocha. Está diseñado para realizar pruebas sobre APIs RESTful de manera eficiente, proporcionando una estructura organizada y ejemplos prácticos para facilitar la integración de Cypress en el flujo de trabajo de desarrollo.

El objetivo es mejorar la calidad del código mediante pruebas automáticas y reutilizables, aprovechando las capacidades de Cypress en el contexto de APIs.

## Requisitos Previos
- Node.js (versión 12 o superior)
- Cypress (versión 13.17.0)

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd <NOMBRE-DEL-PROYECTO>
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Uso
### Abrir el entorno de pruebas interactivo
```bash
npm run cypress:open
```

### Ejecutar pruebas en modo headless
Ejecutar pruebas en diferentes navegadores:
- **Chrome:**
  ```bash
  npm run cypress:chrome:headless
  ```
- **Firefox:**
  ```bash
  npm run cypress:firefox:headless
  ```
- **Edge:**
  ```bash
  npm run cypress:edge:headless
  ```

### Generar reportes en HTML
```bash
npm run cypress:html:report
```

## Estructura de Carpetas
```
<root>
├── cypress
│   ├── e2e
│   │   └── API
│   │       └── petstore
│   │           ├── ejemplo1.cy.js
│   │           ├── ejemplo2.cy.js
│   │           └── ...
│   ├── fixtures
│   │   ├── requests
│   │   │   ├── crear_pet.js
│   │   │   └── actualizar_pet.js
│   │   ├── responses
│   │       ├── crear_pet.js
│   │       └── actualizar_pet.js
│   └── support
│       ├── commands.js     # Definición de comandos personalizados
│       ├── e2e.js          # Configuración global de soporte para pruebas
├── cypress.config.js       # Configuración de Cypress
├── package.json            # Dependencias y scripts
└── README.md               # Documentación del proyecto
```

### Carpetas Principales
- **`cypress/e2e/API/petstore`**: Contiene los ejemplos de pruebas organizados por casos de uso.
- **`cypress/fixtures/requests`**: Archivos que definen peticiones de prueba.
- **`cypress/fixtures/responses`**: Archivos que contienen respuestas esperadas para validaciones.
- **`cypress/support`**: Archivos para configurar comandos personalizados y configuraciones globales.

## Ejemplos Incluidos
El proyecto contiene siete ejemplos que demuestran distintas capacidades de Cypress:

1. **Gestión de mascotas usando datos importados**
   - Uso de datos externos para operaciones CRUD en la API de mascotas.

2. **Gestión de mascotas definiendo datos directamente en el feature**
   - Ejemplo de pruebas con datos directamente definidos en los casos de prueba.

3. **Gestión de mascotas utilizando un solo "it" para el flujo continuo**
   - Ejecución secuencial de múltiples operaciones en un único bloque de prueba.

4. **Gestión de mascotas utilizando comandos personalizados**
   - Uso de comandos personalizados para mejorar la reutilización y legibilidad del código.

5. **Gestión de errores esperados**
   - Verificación y manejo de errores comunes al interactuar con la API.

6. **Gestión de mascotas usando hooks**
   - Ejemplo de cómo usar hooks (`before`, `beforeEach`, `afterEach`, `after`) para preparar y limpiar el estado entre pruebas.

7. **Uso de tags con Cypress-Grep**
   - Filtrado de pruebas utilizando el plugin `cypress-grep`. Por ejemplo:
     ```bash
     npx cypress run --env grepTags=@regresion
     ```

## Configuración
### Archivo `cypress.config.js`
Configuración personalizada para reportes y plugins:
- **Reportes:**
  Utiliza `cypress-mochawesome-reporter` para generar reportes interactivos.
- **Tags:**
  Usa `cypress-grep` para filtrar y etiquetar pruebas de manera dinámica.

```javascript
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://petstore.swagger.io/v2",
    specPattern: 'cypress/e2e/API/petstore/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('cypress-grep/src/plugin')(config);
      return config;
    },
    experimentalRunAllSpecs: true,
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
  },
});
```

## Tecnologías Utilizadas
- **Cypress:** Framework principal para pruebas automatizadas.
- **Mocha:** Estructura para ejecutar pruebas.
- **cypress-mochawesome-reporter:** Generación de reportes en HTML y JSON.
- **cypress-grep:** Filtrado y etiquetado de pruebas.
- **Ajv:** Validación de esquemas JSON.

## Recursos Adicionales
- [Documentación de Cypress](https://docs.cypress.io/)
- [Documentación de Mocha](https://mochajs.org/)
- [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
- [cypress-grep](https://github.com/cypress-io/cypress/tree/develop/npm/grep)
- [Ajv - JSON Schema Validator](https://ajv.js.org/)

## Ejemplos Visuales
### Reporte Generado con Mochawesome
![Reporte Mochawesome](media/reportes.gif)

### Ejecución de Pruebas Interactivas
![Ejecución Interactiva](media/ejecucion.gif)

## Contribución
Este es un proyecto personal, por lo que no se aceptan contribuciones externas. Sin embargo, si deseas utilizar este repositorio como base para tus propios proyectos, siéntete libre de hacer un fork.