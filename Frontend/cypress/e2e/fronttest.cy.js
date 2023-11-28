describe('template spec', () => {

    it ('Deve criar usuario usuario', () => {
        cy.visit('http://52.67.148.62:3000/')
        
        cy.get('.home-container') 
        .find('.button-container')
        .find('button')
        .click()

        cy.get('.float-div')
        .find('.login-form')
        .find('#apelido')
        .type('agostinho')

        cy.get('.float-div')
        .find('.login-form')
        .find('#nome')
        .type('agostinho')

        cy.get('.float-div')
        .find('.login-form')
        .find('#sobrenome')
        .type('carrara')

        cy.get('.float-div')
        .find('.login-form')
        .find('#email') 
        .type('agostinhocarrara889@gmail.com')

        cy.get('.float-div')
        .find('.login-form')
        .find('#senha') 
        .type('Teste123!')

        cy.get('.float-div')
        .find('.login-form button[type="submit"]')
        .click()
    })

    it ('Deve realizar login com o usuario', () => {
        cy.visit('http://52.67.148.62:3000/authentication/singup')
        
        cy.get('.float-div') 
        .find('.container-text')
        .find('.container-text-main')
        .find('button')
        .click()

        cy.get('.login-form')
        .find('#username')
        .type('agostinho')

        cy.get('.login-form')
        .find('#senha')
        .type('Teste123!')

        cy.get('.float-div')
        .find('.login-form button[type="submit"]')
        .click()

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Criar')
        .click()

        cy.get('.container-new-newsletter')
        .find('.form-new-newsletter')
        .find('#newsletter-name')
        .type('apenas teste')

        cy.get('.container-new-newsletter')
        .find('.form-new-newsletter')
        .find('#descricao')
        .type('vamos ver se isso funciona')

        cy.get('.container-new-newsletter')
        .find('.form-new-newsletter')
        .find('button')
        .click()

        cy.wait(300)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Pesquisar')
        .click()

        cy.get('.container-search-newsletter') 
        .find('.wrapper-input-search-newsletter')
        .find('input')
        .type('apenas teste')

        cy.get('.container-search-newsletter') 
        .find('.wrapper-input-search-newsletter')
        .find('.search-newsletter-search-button')
        .click()

        cy.wait(300)

        cy.get('.newsletter-item-container') 
        .find('button:first')
        .eq(0)
        .click()

        cy.wait(300)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Inscrições')
        .click()

        cy.wait(300)

        cy.get('.newsletter-item-container') 
        .find('button')
        .eq(0)
        .click()

        cy.get('.newsletter-item-container') 
        .find('.unsubscribe-newsletter-dialog')
        .find('.unsubscribe-button-newsletter-dialog')
        .eq(0)
        .click()

        cy.wait(300)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Newsletters')
        .click()

        cy.wait(300)

        cy.get('.container-user-newsletters')
        .find('.newsletter-item-container')
        .eq(0)
        .find('.options-newsletter-item')
        .find('.edit-button-newsletter-item')
        .click()

        cy.wait(300)

        cy.get('.newsletter-item-container')
        .find('.content-newsletter-item')
        .find('.user-newsletter-item-edit-title-input')
        .type(' modificação')

        cy.wait(300)

        cy.get('.newsletter-item-container')
        .find('.content-newsletter-item')
        .find('.user-newsletter-item-edit-description-input')
        .type(' modificação')

        cy.wait(300)

        cy.get('.newsletter-item-container')
        .eq(0)
        .find('.options-newsletter-item')
        .find('.confirm-edit-button-newsletter-item')
        .click()

        cy.wait(300)

        cy.get('.container-user-newsletters')
        .find('.newsletter-item-container')
        .eq(0)
        .find('.options-newsletter-item')
        .find('.delete-button-newsletter-item')
        .click()

        cy.wait(300)

        cy.get('.delete-dialog')
        .find('.delete-dialog-buttons')
        .find('.delete-button-dialog')
        .click()

        cy.wait(300)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Newsletters')
        .click()

        cy.get('.newsletter-item-container')
        .find('.content-newsletter-item')
        .contains('este eu edito')
        .click()

        cy.wait(300)

        cy.get('.create-newsletter-posts-container')
        .find('.create-newsletter-posts-button')
        .click()

        cy.wait(300)

        cy.get('.form-create-post')
        .find('.form-create-post-content')
        .find('.subject-form-create-post')
        .type('agostinho carrara')

        cy.get('.form-create-post')
        .find('.form-create-post-content')
        .find('.time-form-create-post')
        .type('12:00')

        cy.get('.form-create-post')
        .find('.form-create-post-content')
        .find('.date-form-create-post')
        .type("2024-01-01")

        cy.wait(1000)

        cy.get('.container-user-newsletters')
        .find('.bottom-button-form-create-post')
        .find('.button-form-create-post')
        .eq(1)
        .click()

        cy.wait(5000)
        

        cy.get('.container-user-newsletters')
        .find('.bottom-button-form-create-post')
        .find('.button-form-create-post')
        .eq(1)
        .click()

        cy.get('.container-user-newsletters')
        .find('.bottom-button-form-create-post')
        .find('.button-form-create-post')
        .eq(1)
        .click()

        cy.wait(5000)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Logout')
        .click()
    })
})