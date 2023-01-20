describe("Navigation", () => {
  
  // Testing that the page loads
  it("should visit root", () => {
    cy.visit("/");
  });

  // Testing navigation
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should('have.class', 'day-list__item--selected');
  });

});
