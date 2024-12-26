import petResponseSchema from '../../../fixtures/responses/crear_pet';
import Ajv from 'ajv';

/**
 * Test Suite: Gestión de errores esperados al interactuar con la API de mascotas
 * Este conjunto de pruebas se enfoca en manejar y verificar los errores esperados que pueden ocurrir al interactuar con la API de mascotas.
 */
describe('Gestión de errores esperados al interactuar con la API de mascotas', () => {
    const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON
    let petId; // Variable para almacenar el ID de la mascota creada

    it('Debería crear una nueva mascota con un ID único', () => {
        // Uso de comando personalizado para generar datos aleatorios de la mascota
        cy.generateRandomPet().then((pet) => {
            cy.request({
                method: 'POST',
                url: '/pet',
                body: pet, // Datos generados por el comando
            }).then((response) => {
                expect(response.status).to.equal(200); // Validar código de estado
                petId = response.body.id; // Guardar ID de la mascota creada

                // Validar que la respuesta cumple con el esquema esperado
                const validate = ajv.compile(petResponseSchema);
                const valid = validate(response.body);
                expect(valid).to.be.true;
            });
        });
    });

    it('Debería eliminar una mascota existente por su ID', () => {
        cy.request({
            method: 'DELETE',
            url: `/pet/${petId}` // Usar el ID generado previamente
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado
        });
    });

    /**
     * Caso de prueba: Intentar buscar una mascota eliminada
     * Este caso prueba la respuesta de la API cuando se intenta acceder a una mascota eliminada.
     * Se espera un error 404 con un mensaje indicando que la mascota no se encuentra.
     */
    it('Debería retornar un error 404 al buscar una mascota eliminada', () => {
        cy.request({
            method: 'GET',
            url: `/pet/${petId}`, // Intentar acceder a una mascota que ya fue eliminada
            failOnStatusCode: false // Permitir que Cypress no falle automáticamente en respuestas con errores
        }).then((response) => {
            expect(response.status).to.equal(404); // Validar código de estado esperado
            expect(response.body.message).to.equal('Pet not found'); // Validar mensaje de error
        });
    });
});