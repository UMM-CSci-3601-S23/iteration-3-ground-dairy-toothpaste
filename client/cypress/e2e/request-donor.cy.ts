import { RequestDonorPage } from '../support/request-donor.po';

const page = new RequestDonorPage();

describe('Donor View', () => {
  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
    cy.setCookie('auth_token', 'TOKEN');
  });
  //Tests for the page with no filters
  it('Should have the correct title', () => {
    page.getDonorViewTitle().should('have.text', 'Needs requested');
  });

  it('Should display 10 requests', () => {
    page.getRequestListItems().should('have.length', 10);
  });

  //Tests with item filters
  it('Should return the correct elements with item filter food', () => {
    page.selectItemType('food');

    page.getRequestListItems().should('have.length', 7);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.donor-list-itemType').should('contain.text', 'Item Type: food');
    });
  });

  it('Should return the correct elements with item filter toiletries', () => {
    page.selectItemType('toiletries');

    page.getRequestListItems().should('have.length', 2);

    page.getRequestListItems().each($list => {
      cy.wrap($list).find('.donor-list-itemType').should('contain.text', 'Item Type: toiletries');
    });
  });

  it('Should return the correct elements with item filter other', () => {
    page.selectItemType('other');
    page.getRequestListItems().should('have.length', 1);
  });

  //Tests with food filters
  it('Should return the correct elements with item filter food and food filter dairy', () => {
    page.selectItemType('food');
    page.selectFoodType('dairy');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.donor-list-itemType').should('contain.text', 'Item Type: food');
    });

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.donor-list-foodType').should('contain.text', 'Food Type: dairy');
    });
  });

  it('Should return the correct elements with item filter food and food filter meat', () => {
    page.selectItemType('food');
    page.selectFoodType('meat');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.donor-list-itemType').should('contain.text', 'Item Type: food');
    });

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.donor-list-foodType').should('contain.text', 'Food Type: meat');
    });
  });

  it('Should return the correct elements with description filter', () => {
    cy.get('#descriptionID input').clear().type('Vegetables').focus().blur();
    page.getRequestListItems().should('have.length', 2);
  });

  it('Should return the correct elements with description and food filters', () => {
    page.selectFoodType('grain');
    cy.get('#descriptionID input').clear().type('I want').focus().blur();
    page.getRequestListItems().should('have.length', 1);
  });

  it('Should return the correct elements with description and Itemtype filters', () => {
    page.selectItemType('food');
    cy.get('#descriptionID input').clear().type('I want').focus().blur();
    page.getRequestListItems().should('have.length', 2);
});

  it('Should delete a request', () => {

    page.deleteRequest();

    page.getRequestListItems().should('have.length', 9);

  });

});
