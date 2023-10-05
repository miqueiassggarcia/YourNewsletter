const Joi = require("joi");
const validationSchema = require("../validation/login_user");

describe("Validation Schema", () => {
    it("deve passar sem erros para um objeto válido", () => {
        const validObject = {
            username: "JhonDoe",
            password: "minhasenha",
        };

        const result = validationSchema.validate(validObject);

        expect(result.error).toBeUndefined();
    });

    it("deve retornar um erro para um objeto sem propriedade password", () => {
        const invalidObject = {
            username: "JhonDoe",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });

    it("deve retornar um erro para um objeto sem propriedade username", () => {
        const invalidObject = {
            password: "minhasenha",
        };

        const result = validationSchema.validate(invalidObject);

        expect(result.error).not.toBeNull();
    });
    });
