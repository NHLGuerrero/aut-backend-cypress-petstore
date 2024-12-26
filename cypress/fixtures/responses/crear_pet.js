const petResponseSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        photoUrls: {
            type: "array",
            items: { type: "string" },
            minItems: 0
        },
        tags: {
            type: "array",
            items: {
                type: "object",
                properties: {},
                additionalProperties: true
            },
            minItems: 0
        },
        status: { type: "string" }
    },
    required: ["id", "name", "photoUrls", "tags", "status"],
    additionalProperties: false
};

module.exports = petResponseSchema;