import petResponseSchema from '../../../fixtures/responses/crear_pet';
import Ajv from 'ajv';

/**
 * Test Suite: Gestión de mascotas utilizando comandos personalizados
 * Este conjunto de pruebas demuestra cómo usar comandos personalizados en Cypress para interactuar con la API de mascotas.
 * Se abordan los casos de creación, consulta, actualización y eliminación de una mascota utilizando comandos personalizados.
 */
describe('Gestión de mascotas utilizando comandos personalizados', () => {
  const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON
  let petId; // Variable para almacenar el ID de la mascota creada

  it('Debería crear una nueva mascota utilizando un comando personalizado', () => {
    // Uso del comando personalizado "cy.generateRandomPet" para generar datos de la mascota
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

  it('Debería actualizar los datos de una mascota utilizando un comando personalizado', () => {
    // Uso del comando personalizado "cy.generateRandomPet" para generar datos de actualización
    cy.generateRandomPet().then((pet) => {
      const requestBody = {
        id: petId, // Reutilizar el ID de la mascota creada
        name: pet.name,
        status: pet.status
      };

      cy.request({
        method: 'PUT',
        url: '/pet',
        body: requestBody, // Datos generados por el comando
      }).then((response) => {
        expect(response.status).to.equal(200); // Validar código de estado

        // Validar que la respuesta cumple con el esquema esperado
        const validate = ajv.compile(petResponseSchema);
        const valid = validate(response.body);
        expect(valid).to.be.true;
      });
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