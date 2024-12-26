import crearPet from '../../../fixtures/request/crear_pet';
import actualizarPet from '../../../fixtures/request/actualizar_pet';
import petResponseSchema from '../../../fixtures/responses/crear_pet';
import Ajv from 'ajv';

/**
 * Test Suite: Gestión de mascotas usando hooks en la API PETS
 * Este conjunto de pruebas muestra cómo utilizar los hooks de Cypress (`before`, `beforeEach`, `afterEach`, `after`) para controlar el flujo de ejecución de las pruebas.
 * 
 * Los hooks permiten ejecutar código antes o después de las pruebas o de todo el conjunto de pruebas, lo cual es útil para:
 * - Configurar condiciones previas (antes de las pruebas).
 * - Limpiar datos o realizar validaciones finales (después de las pruebas).
 * - Asegurar que las pruebas no se vean afectadas por el estado anterior de otras pruebas.
 */

describe('Gestión de mascotas usando hooks en la API PETS', () => {
    const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON
    let petId; // Variable para almacenar el ID de la mascota creada

    /**
     * Hook `before`: Se ejecuta una vez antes de todas las pruebas.
     * Es útil para la configuración global de las pruebas, como establecer un estado inicial o crear recursos que se reutilizan en todo el conjunto.
     */
    before(() => {
        cy.log('Iniciando pruebas de gestión de mascotas con hooks');
    });

    /**
     * Hook `beforeEach`: Se ejecuta antes de cada caso de prueba.
     * Es útil para preparar datos específicos o realizar tareas previas a cada prueba individualmente.
     * Este hook asegura que las pruebas comiencen en un estado conocido y controlado.
     */
    beforeEach(() => {
        cy.log('Preparando datos para la prueba');
    });

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

    /**
     * Hook `afterEach`: Se ejecuta después de cada caso de prueba.
     * Es útil para realizar tareas de limpieza o validaciones finales, como borrar datos temporales o restablecer configuraciones.
     * En este caso, se usa para registrar un mensaje después de que cada prueba se haya completado.
     */
    afterEach(() => {
        cy.log('Prueba completada, limpiando si es necesario.');
    });

    /**
     * Hook `after`: Se ejecuta una vez después de todas las pruebas.
     * Es útil para realizar tareas de limpieza global o generar reportes finales después de que todas las pruebas han terminado.
     */
    after(() => {
        cy.log('Todas las pruebas de gestión de mascotas con hooks han finalizado.');
    });
});