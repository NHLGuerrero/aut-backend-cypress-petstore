// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Comando para generar un PET aleatorio
Cypress.Commands.add('generateRandomPet', () => { 
    const randomId = Math.floor(Math.random() * 100000).toString(); // 0, 1, ..., 99999
    const randomName = `Pet${Math.floor(Math.random() * 1000)}`; // Pet0, Pet1, ..., Pet999
    const statuses = ['available', 'pending', 'sold']; // available, pending, sold
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
        id: randomId,
        name: randomName,
        status: randomStatus
    };
});