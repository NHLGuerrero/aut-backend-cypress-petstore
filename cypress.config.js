const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true, // Habilitar gráficos en el reporte
    reportPageTitle: 'Cypress Test Report', // Título del reporte
    embeddedScreenshots: true, // Incluir capturas de pantalla en el reporte
    inlineAssets: true, // Incluir CSS e imágenes en el reporte
    saveAllAttempts: false, // (opcional) Guardar todos los intentos de una prueba
    reportDir: 'cypress/reports', // Directorio donde se guardarán los reportes
    overwrite: true, // Sobrescribe reportes anteriores
    html: true, // Generar reporte en formato HTML
    json: true, // Generar reporte en formato JSON
  },
  e2e: {
    baseUrl: "https://petstore.swagger.io/v2",
    specPattern: 'cypress/e2e/API/petstore/*.cy.js',
    setupNodeEvents(on, config) {
      // Registrar el plugin del reportero
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Registrar el plugin de cypress-grep
      require('cypress-grep/src/plugin')(config);
      return config; // Retorna la configuración para que sea accesible
    },
    experimentalRunAllSpecs: true, // Ejecuta todas las pruebas en paralelo
    env: {
      grepFilterSpecs: true, // Filtra los archivos de pruebas según los tags
      grepOmitFiltered: true, // Omite las pruebas que no coinciden con los tags
    },
  },
});