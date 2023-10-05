const Joi = require("joi");
const validationSchema = require("../validation/register_user");

describe("Validation Schema", () => {
    it("deve permitir um objeto com valores válidos", () => {
        const validObject = {
            username: "JhonDoe",
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            password: "secure123",
        };
    
        const result = validationSchema.validate(validObject);
    
        expect(result.error).toBeUndefined();
        });

    it("deve retornar um erro para um objeto sem first_name", () => {
        const invalidObject = {
            username: "JhonDoe",
            last_name: "Doe",
            email: "john@example.com",
            password: "secure123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com last_name invalido", () => {
        const invalidObject = {
            username: "JhonDoe",
            first_name: "John",
            last_name: "D",
            email: "john@example.com",
            password: "secure123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com email invalido", () => {
        const invalidObject = {
            username: "JhonDoe",
            first_name: "John",
            last_name: "Doe",
            email: "john",
            password: "secure123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com password invalido", () => {
        const invalidObject = {
            username: "JhonDoe",
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            password: "se",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto com first_name muito curto", () => {
        const invalidObject = {
            username: "JhonDoe",
            first_name: "Jo",
            last_name: "Doe",
            email: "john@example.com",
            password: "secure123",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
});
