const Joi = require("joi");
const validationSchema = require("../validation/update_newsletter_name");

describe("Validation Schema", () => {
    it("deve passar sem erros para um objeto válido", () => {
        const validObject = {
            id : 2,
            new_name: "Jonas",
        };

        const result = validationSchema.validate(validObject);

        expect(result.error).toBeUndefined();
    });

    it("deve retornar um erro para um objeto sem id", () => {
        const invalidObject = {
            new_name: "Jonas",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
    
    it("deve retornar um erro para um objeto sem nome", () => {
        const invalidObject = {
            id: 2,
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com name muito curto", () => {
        const invalidObject = {
            id: 2,
            new_name: "Jon",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com id float", () => {
        const invalidObject = {
            id: 1.2 ,
            new_name: "jonas",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com name muito longo", () => {
        const invalidObject = {
            id: 2,
            new_name: "Jonassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
});
