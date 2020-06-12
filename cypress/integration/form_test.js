describe('Form - Test our form inputs', function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("add text to inputs and submit form", function() {
        cy.get('[data-cy="name"]').type("Rico").should("have.value", "Rico");
        cy.get('[data-cy="email"]').type("bigmoneybob@teammoney.com").should("have.value", "bigmoneybob@teammoney.com");
        cy.get('[data-cy="password"]').type("funnydoggyboy").should('have.value', "funnydoggyboy");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get("[data-cy=submit]").click();
    });
    it("clear and check", function () {
        cy.get('[data-cy="name"]').clear();
        cy.get('[data-cy="email"]').clear();
        cy.get('[data-cy="password"]').clear();
        cy.get('[type="checkbox"]').check();
        cy.get("[data-cy=submit]").click();
    });
});