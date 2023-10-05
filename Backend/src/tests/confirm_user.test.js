const Joi = require("joi");
const validationSchema = require("../validation/confirm_user");

describe("Validation Schema", () => {
    it("deve passar sem erros para um objeto válido", () => {
        const validObject = {
            email: "example@example.com",
            token_confirmation: "abc123",
        };

        const result = validationSchema.validate(validObject);

        expect(result.error).toBeUndefined();
    });

    it("deve retornar um erro para um objeto sem propriedade email", () => {
        const invalidObject = {
            token_confirmation: "abc123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com email inválido", () => {
        const invalidObject = {
            email: "invalid-email",
            token_confirmation: "abc123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto sem propriedade token_confirmation", () => {
        const invalidObject = {
            email: "example@example.com",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
    });
