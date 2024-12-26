import Ajv from 'ajv';

/**
 * Test Suite: Gestión de mascotas definiendo datos directamente en el feature
 * En este conjunto de pruebas, se demuestra cómo definir los datos directamente dentro del feature 
 * para interactuar con la API de mascotas. 
 * 
 * Cada prueba incluye la definición explícita de los datos de la mascota, tales como el ID, nombre y estado, 
 * en lugar de depender de fuentes externas o comandos personalizados. 
 * Las pruebas cubren las operaciones básicas: crear, obtener, actualizar y eliminar una mascota.
 */
describe('Gestión de mascotas definiendo datos directamente en el feature', () => {
    const ajv = new Ajv(); // Instancia de Ajv para validación de esquemas JSON

    it('Debería crear una nueva mascota definiendo los datos directamente', () => {
        const requestBody = {
            id: 14152,
            name: "Coco",
            status: "available"
        };

        cy.request({
            method: 'POST',
            url: '/pet',
            body: requestBody, // Datos definidos dentro del feature
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado

            // Validar que la respuesta cumple con el esquema esperado
            const petResponseSchema = {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    photoUrls: { type: "array", items: { type: "string" }, minItems: 0 },
                    tags: {
                        type: "array",
                        items: { type: "object", properties: {}, additionalProperties: true },
                        minItems: 0
                    },
                    status: { type: "string" }
                },
                required: ["id", "name", "photoUrls", "tags", "status"],
                additionalProperties: false
            };

            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería obtener una mascota existente utilizando un ID definido', () => {
        const petId = 14152;

        cy.request({
            method: 'GET',
            url: `/pet/${petId}` // ID definido directamente en el feature
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado

            // Validar que la respuesta cumple con el esquema esperado
            const petResponseSchema = {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    photoUrls: { type: "array", items: { type: "string" }, minItems: 0 },
                    tags: {
                        type: "array",
                        items: { type: "object", properties: {}, additionalProperties: true },
                        minItems: 0
                    },
                    status: { type: "string" }
                },
                required: ["id", "name", "photoUrls", "tags", "status"],
                additionalProperties: false
            };

            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería actualizar los datos de una mascota con un body definido localmente', () => {
        const requestBody = {
            id: 14152,
            name: "Pluto",
            status: "available"
        };

        cy.request({
            method: 'PUT',
            url: '/pet',
            body: requestBody, // Datos definidos dentro del feature
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado

            // Validar que la respuesta cumple con el esquema esperado
            const petResponseSchema = {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    photoUrls: { type: "array", items: { type: "string" }, minItems: 0 },
                    tags: {
                        type: "array",
                        items: { type: "object", properties: {}, additionalProperties: true },
                        minItems: 0
                    },
                    status: { type: "string" }
                },
                required: ["id", "name", "photoUrls", "tags", "status"],
                additionalProperties: false
            };

            const validate = ajv.compile(petResponseSchema);
            const valid = validate(response.body);
            expect(valid).to.be.true;
        });
    });

    it('Debería eliminar una mascota existente utilizando un ID definido localmente', () => {
        const petId = 14152;

        cy.request({
            method: 'DELETE',
            url: `/pet/${petId}` // ID definido directamente en el feature
        }).then((response) => {
            expect(response.status).to.equal(200); // Validar código de estado
        });
    });
});