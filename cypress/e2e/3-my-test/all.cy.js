/// <reference types="cypress" />
// assuming no data in tables
describe('test rim-ijar',
    //cy.visit('https://example.cypress.io/todo')
    it("get home page and link to /p/users/connexion should exist ",
        ()=>{
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
            // submit
            cy.get('#submit').click()

            
             


            //.click();
            //cy.get('a[href="/p/users/connexion"]').click()
            //cy.get('a[href="/p/annoces/details/1"]').click()
        }

    )


)