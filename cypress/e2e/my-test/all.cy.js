/// <reference types="cypress" />
// assuming no data in tables
describe('test rim-ijar',
    //cy.visit('https://example.cypress.io/todo')
    it("get home page and link to /p/users/connexion should exist ",
        () => {
            cy.visit('http://localhost:3000/');
            // it should conatin button connexion
            //cy.get('#button').should('have.text','connexion')
            cy.get('a[href="/p/users/register"]').should('exist')
            // go to insription page 
            cy.get('a[href="/p/users/register"]').click()
            // the inscription form should be empty
            cy.get('#email').should('have.value', '')
            cy.get('#email').type('ely@gmail.com')
            //
            cy.get('#password').should('have.value', '')
            cy.get('#password').type('1234abcd')
            // 
            cy.get('#confirmPassword').should('have.value', '')
            cy.get('#confirmPassword').type('1234abcd')
            cy.get('#submit').click()
            //logout  
            cy.get('#deconnexion').click()
            //login/connexion
            cy.get('#email').type('ely@gmail.com')
            cy.get('#password').type('1234abcd')
            cy.get('#submit').click()

            cy.get('a[href="/my/list"]').should('exist')
            // navigate to add page

            cy.get('#addannonce').click()
            cy.get('a[href="/my/add"]').should('exist')
            //add annonce 
            // id="description"

            cy.get('#type').select('Location'); 

            cy.wait(500); // Attendre 500ms (ajuster si nécessaire)
            cy.get('#category').find('option').should('have.length.gt', 1);
            cy.get('#category').select('immobilier');

            cy.wait(500); // Attendre 500ms (ajuster si nécessaire)
            cy.get('#subCategory').find('option').should('have.length.gt', 1);
            cy.get('#subCategory').select('maison');
            //
            cy.get('#description').type('une belle voiture')
            cy.get('#prix').type('5000')
            cy.get('#submit').click()
            // tester que le site me redirige vers
            cy.url().should('eq', 'http://localhost:3000/my/list');



 
        }

    )


)