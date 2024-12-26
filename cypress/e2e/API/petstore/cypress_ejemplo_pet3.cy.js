import crearPet from '../../../fixtures/request/crear_pet';
import actualizarPet from '../../../fixtures/request/actualizar_pet';
import petResponseSchema from '../../../fixtures/responses/crear_pet';
import Ajv from 'ajv';

/**
 * Test Suite: Gestión de mascotas utilizando un solo "it" para el flujo continuo
 * En este conjunto de pruebas, se busca demostrar cómo manejar múltiples operaciones (creación, 
 * obtención, actualización y eliminación) de manera secuencial dentro de un solo "it", 
 * sin la necesidad de dividir cada operación en un "it" separado.
 */
describe('Gestión de mascotas utilizando un solo "it" para el flujo continuo', () => {
    const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON
    let petId; // Variable para almacenar el ID de la mascota creada

    it('Debería realizar todo el flujo de creación, actualización, obtención y eliminación de una mascota en un solo "it"', () => {
        // Crear una nueva mascota
        cy.request({
            method: 'POST',
            url: '/pet',
            body: crearPet, // Datos para la creación de la mascota
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado
            petId = response.body.id; // Guardar ID de la mascota para reutilizarlo

            // Validar que la respuesta cumple con el esquema esperado
            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;

            // Obtener la mascota creada utilizando su ID
            cy.request({
                method: 'GET',
                url: `/pet/${petId}` // Usar el ID generado previamente
            }).then((response) => {
                expect(response.status).to.equal(200); // Validar código de estado

                // Validar que la respuesta cumple con el esquema esperado
                const validate = ajv.compile(petResponseSchema);
                const valid = validate(response.body);
                expect(valid).to.be.true;

                // Actualizar los datos de la mascota
                cy.request({
                    method: 'PUT',
                    url: '/pet',
                    body: actualizarPet, // Datos para la actualización de la mascota
                }).then((response) => {
                    expect(response.status).to.equal(200); // Validar código de estado

                    // Validar que la respuesta cumple con el esquema esperado
                    const validate = ajv.compile(petResponseSchema);
                    const valid = validate(response.body);
                    expect(valid).to.be.true;

                    // Eliminar la mascota utilizando su ID
                    cy.request({
                        method: 'DELETE',
                        url: `/pet/${petId}` // Usar el ID generado previamente
                    }).then((response) => {
                        expect(response.status).to.equal(200); // Validar código de estado
                    });
                });
            });
        });
    });
});