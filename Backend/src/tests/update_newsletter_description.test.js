const Joi = require("joi");
const validationSchema = require("../validation/update_newsletter_description");

describe("Validation Schema", () => {
    it("deve passar sem erros para um objeto válido", () => {
        const validObject = {
            id : 2,
            new_description: "Jonas",
        };

        const result = validationSchema.validate(validObject);

        expect(result.error).toBeUndefined();
    });

    it("deve retornar um erro para um objeto sem id", () => {
        const invalidObject = {
            new_description: "Jonas",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
    
    it("deve retornar um erro para um objeto sem description", () => {
        const invalidObject = {
            id: 2,
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com description muito curto", () => {
        const invalidObject = {
            id: 2,
            new_description: "Jon",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com id float", () => {
        const invalidObject = {
            id: 1.2 ,
            new_description: "jonas",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com name muito longo", () => {
        const invalidObject = {
            id: 2,
            new_description: "Jonassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
});
