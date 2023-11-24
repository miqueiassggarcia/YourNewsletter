describe('template spec', () => {

    it ('Deve criar usuario usuario', () => {
        cy.visit('http://localhost:3000')
        
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
        cy.visit('http://localhost:3000/authentication/singup')
        
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

        cy.get('.home-logged-container') 
        .find('.new-newsletter-container')
        .find('.button-newsletter-container')
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
        .contains('Home')
        .click()

        cy.get('.home-logged-container') 
        .find('.subscribe-newsletter-container')
        .find('.button-newsletter-container')
        .click()

        cy.get('.container-search-newsletter') 
        .find('.wrapper-input-search-newsletter')
        .find('input')
        .type('teste')

        cy.get('.container-search-newsletter') 
        .find('.wrapper-input-search-newsletter')
        .find('.search-newsletter-search-button')
        .click()

        cy.wait(300)

        cy.get('.newsletter-item-container') 
        .find('button:first')
        .click()

        cy.wait(500)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Inscrições')
        .click()

        cy.wait(500)

        cy.get('.newsletter-item-container') 
        .find('button')
        .click()

        cy.get('.newsletter-item-container') 
        .find('.unsubscribe-newsletter-dialog')
        .find('.unsubscribe-button-newsletter-dialog')
        .click()

        cy.wait(300)

        cy.wait(300)

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Newsletters')
        .click()

        cy.get('.newsletter-item-container')
        .find('.options-newsletter-item')
        .find('.edit-button-newsletter-item')
        .click()

        cy.get('.newsletter-item-container')
        .find('.content-newsletter-item')
        .find('.user-newsletter-item-edit-title-input')
        .type(' modificação')

        cy.get('.newsletter-item-container')
        .find('.content-newsletter-item')
        .find('.user-newsletter-item-edit-description-input')
        .type(' modificação')

        cy.get('.newsletter-item-container')
        .find('.options-newsletter-item')
        .find('.confirm-edit-button-newsletter-item')
        .click()

        cy.get('.newsletter-item-container')
        .find('.options-newsletter-item')
        .find('.delete-button-newsletter-item')
        .click()

        cy.wait(300)

        cy.get('.newsletter-item-container')
        .find('.delete-button-newsletter-dialog')
        .click()

        cy.get('.app-header')
        .find('.menu-items')
        .click()

        cy.get('.sidebar-container')
        .find('.sidebar-items')
        .contains('Logout')
        .click()
    })
})