const Joi = require("joi");
const validationSchema = require("../validation/create_newsletter");

describe("Validation Schema", () => {
    it("deve passar sem erros para um objeto válido", () => {
        const validObject = {
            name: "Jonas",
            description: "newsletter",
        };

        const result = validationSchema.validate(validObject);

        expect(result.error).toBeUndefined();
    });

    it("deve retornar um erro para um objeto sem descrição", () => {
        const invalidObject = {
            name: "Jonas",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
    
    it("deve retornar um erro para um objeto sem nome", () => {
        const invalidObject = {
            description: "newsletter",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com name muito curto", () => {
        const invalidObject = {
            name: "Jon",
            description: "newsletter",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com descrição muito curta", () => {
        const invalidObject = {
            name: "jonas",
            description: "new",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com name muito longo", () => {
        const invalidObject = {
            name: "Jonassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            description: "newsletter",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
});
