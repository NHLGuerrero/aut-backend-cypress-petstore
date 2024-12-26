import crearPet from '../../../fixtures/request/crear_pet';
import actualizarPet from '../../../fixtures/request/actualizar_pet';
import petResponseSchema from '../../../fixtures/responses/crear_pet';
import Ajv from 'ajv';

/**
 * Test Suite: Uso de tags con Cypress-Grep
 * Este conjunto de pruebas demuestra cómo utilizar el plugin `cypress-grep` para etiquetar y filtrar casos de prueba.
 * 
 * `describe` contiene el tag `@regresion`, indicando que este conjunto pertenece a las pruebas de regresión.
 * 
 * Para ejecutar solo los casos de prueba con el tag @regresion, usa el siguiente comando:
 * 
 * npx cypress run --env grepTags=@regresion
 * 
 * Este comando ejecutará únicamente las pruebas que tienen el tag @regresion, permitiendo ejecutar de forma específica
 * las pruebas de regresión en lugar de todas las pruebas definidas.
 */

describe('Gestión de mascotas usando datos importados en la API PETS', { tags: '@regresion' }, () => {
    const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON
    let petId; // Variable para almacenar el ID de la mascota creada

    it('Debería crear una nueva mascota utilizando datos importados', () => {
        cy.request({
            method: 'POST',
            url: '/pet',
            body: crearPet, // Datos importados para la creación de la mascota
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado
            petId = response.body.id; // Guardar ID de la mascota para reutilizarlo

            // Validar que la respuesta cumple con el esquema esperado
            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería obtener una mascota existente utilizando su ID', () => {
        cy.request({
            method: 'GET',
            url: `/pet/${petId}` // Usar el ID generado previamente
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado

            // Validar que la respuesta cumple con el esquema esperado
            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería actualizar los datos de una mascota con datos importados', () => {
        cy.request({
            method: 'PUT',
            url: '/pet',
            body: actualizarPet, // Datos importados para la actualización de la mascota
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado

            // Validar que la respuesta cumple con el esquema esperado
            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería eliminar una mascota existente utilizando su ID', () => {
        cy.request({
            method: 'DELETE',
            url: `/pet/${petId}` // Usar el ID generado previamente
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado
        });
    });
});