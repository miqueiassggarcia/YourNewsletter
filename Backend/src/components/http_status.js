const {StatusCodes} = require('http-status-codes');

class HttpStatus {
    constructor() {}

    create_status_return(code, message) {
        return {"code": code, "message": message};
    }

    get_database_error() {
        return this.create_status_return(StatusCodes.INTERNAL_SERVER_ERROR, "Erro no banco de dados");
    }

    get_newslatter_updated() {
        return this.create_status_return(StatusCodes.OK, "Newslatter atualizada com sucesso");
    }

    get_newslatter_doesnt_exist() {
        return this.create_status_return(StatusCodes.NOT_FOUND, "Newsletter não existe");
    }

    get_user_already_subscribed_newsletter() {
        return this.create_status_return(StatusCodes.CONFLICT, "Usuário já inscrito na newsletter");
    }

    get_user_subscribed_newsletter() {
        return this.create_status_return(StatusCodes.OK, "Usuário inscrito com sucesso na newsletter");
    }

    get_user_not_have_this_newsletter() {
        return this.create_status_return(StatusCodes.FORBIDDEN, "Usuário não possui essa newsletter");
    }

    get_newsletter_deleted() {
        return this.create_status_return(StatusCodes.OK, "Newsletter deletada com sucesso");
    }
}


module.exports = new HttpStatus();