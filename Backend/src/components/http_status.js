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

    get_user_dont_subscribed_newsletter() {
        return this.create_status_return(StatusCodes.BAD_REQUEST, "Usuário não está inscrito na newsletter");
    }
    

    get_user_subscribed_newsletter() {
        return this.create_status_return(StatusCodes.OK, "Usuário inscrito com sucesso na newsletter");
    }
    
    get_user_unsubscribe_newsletter() {
        return this.create_status_return(StatusCodes.OK, "Usuário desinscrito com sucesso da newsletter");
    }

    get_user_not_have_this_newsletter() {
        return this.create_status_return(StatusCodes.FORBIDDEN, "Usuário não possui essa newsletter");
    }

    get_newsletter_deleted() {
        return this.create_status_return(StatusCodes.OK, "Newsletter deletada com sucesso");
    }

    get_user_not_have_this_post() {
        return this.create_status_return(StatusCodes.NOT_FOUND, "Usuário não possui o post");
    }

    get_post_subject_updated() {
        return this.create_status_return(StatusCodes.OK, "Subject do post atualizado com sucesso");
    }

    get_post_has_already_been_sent() {
        return this.create_status_return(StatusCodes.FORBIDDEN, "Permissão negada, pois o post já foi enviado");
    }

    get_post_html_updated() {
        return this.create_status_return(StatusCodes.OK, "Html do post atualizado com sucesso");
    }
}


module.exports = new HttpStatus();