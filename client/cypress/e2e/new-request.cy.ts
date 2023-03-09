import { Request } from 'src/app/requests/request';
import { NewRequestPage } from '../support/new-request.po';

describe('Add request', () => {
  const page = new NewRequestPage();

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'New Request');
  });

  it('Should enable the submit request button once all criteria are met', () => {
    // ADD USER button should be disabled until all the necessary fields
    // are filled. Once the last (`#emailField`) is filled, then the button should
    // become enabled.
    page.newRequestButton().should('be.disabled');
    page.setMatSelect('itemTypeSelect', 'food');
    page.newRequestButton().should('be.disabled');
    page.getFormField('description').type('test');
    page.newRequestButton().should('be.disabled');
    // Write a description with more than 5 characters
    page.getFormField('description').type('te1212121212st');
    page.newRequestButton().should('be.enabled');
  });

  it('Should show error messages for invalid inputs', () => {
    // Before doing anything there shouldn't be an error
    cy.get('[data-test=nameError]').should('not.exist');
    // Just clicking the name field without entering anything should cause an error message
    page.getFormField('name').click().blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    // Some more tests for various invalid name inputs
    page.getFormField('name').type('J').blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    page.getFormField('name').clear().type('This is a very long name that goes beyond the 50 character limit').blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    // Entering a valid name should remove the error.
    page.getFormField('name').clear().type('John Smith').blur();
    cy.get('[data-test=nameError]').should('not.exist');

    // Before doing anything there shouldn't be an error
    cy.get('[data-test=ageError]').should('not.exist');
    // Just clicking the age field without entering anything should cause an error message
    page.getFormField('age').click().blur();
    // Some more tests for various invalid age inputs
    cy.get('[data-test=ageError]').should('exist').and('be.visible');
    page.getFormField('age').type('5').blur();
    cy.get('[data-test=ageError]').should('exist').and('be.visible');
    page.getFormField('age').clear().type('500').blur();
    cy.get('[data-test=ageError]').should('exist').and('be.visible');
    page.getFormField('age').clear().type('asd').blur();
    cy.get('[data-test=ageError]').should('exist').and('be.visible');
    // Entering a valid age should remove the error.
    page.getFormField('age').clear().type('25').blur();
    cy.get('[data-test=ageError]').should('not.exist');

    // Before doing anything there shouldn't be an error
    cy.get('[data-test=emailError]').should('not.exist');
    // Just clicking the email field without entering anything should cause an error message
    page.getFormField('email').click().blur();
    // Some more tests for various invalid email inputs
    cy.get('[data-test=emailError]').should('exist').and('be.visible');
    page.getFormField('email').type('asd').blur();
    cy.get('[data-test=emailError]').should('exist').and('be.visible');
    page.getFormField('email').clear().type('@example.com').blur();
    cy.get('[data-test=emailError]').should('exist').and('be.visible');
    // Entering a valid email should remove the error.
    page.getFormField('email').clear().type('request@example.com').blur();
    cy.get('[data-test=emailError]').should('not.exist');
  });

  describe('Adding a new request', () => {

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      const request: Request = {
        _id: null,
        itemType: 'food',
        foodType: 'meat',
        description: 'TEST REQUEST!!!!',
      };

      page.newRequest(request);

      // New URL should end in the 24 hex character Mongo ID of the newly added request
      cy.url()
        .should('match', /\/requests\/[0-9a-fA-F]{24}$/)
        .should('not.match', /\/requests\/new$/);

      // The new request should have all the same attributes as we entered
      cy.visit('/requests/donor');
      cy.get('.donor-list-description').should('have.text', request.description);
      cy.get('.donor-list-itemType').should('have.text', request.itemType);
      cy.get('.donor-list-foodType').should('have.text', request.foodType);
      // We should see the confirmation message at the bottom of the screen
      page.getSnackBar().should('contain', `Request successfully submitted`);
    });

    it('Should fail with no description', () => {
      const request: Request = {
        _id: null,
        itemType: 'food',
        foodType: 'meat',
        description: null,
      };

      page.newRequest(request);

      // We should get an error message
      page.getSnackBar().should('contain', `Problem contacting the server – Error Code:`);

      // We should have stayed on the new request page
      cy.url()
        .should('not.match', /\/requests\/[0-9a-fA-F]{24}$/)
        .should('match', /\/requests\/client$/);

      // The things we entered in the form should still be there
      page.getFormField('itemType').should('contain', request.itemType);
      page.getFormField('foodType').should('contain', request.foodType);
    });
  });

});
