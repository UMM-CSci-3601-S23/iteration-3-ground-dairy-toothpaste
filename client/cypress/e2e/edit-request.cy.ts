import { Request } from 'src/app/requests/request';
import { EditRequestPage } from 'cypress/support/edit-request.po';

describe('Edit a request', ()=> {
  const page = new EditRequestPage();

  beforeEach(()=> {
    cy.setCookie('auth_token', 'TOKEN');
    cy.task('seed:database');
    page.navigateToRequest();
  });

  it('Should edit the request', ()=> {
    const request: Request = {
      _id: '588935f57546a2daea44de7c',
      itemType: 'food',
      foodType: 'meat',
      description: 'This is a test edit',
      dateAdded:'10-18-2020'
    };

    page.editRequest(request);
    page.getSnackBar().should('contain', `Request successfully submitted`);

    page.navigateToDonor();

    page.selectItemType('food');
    page.selectFoodType('meat');
    page.filterDescription('This is a test edit');

    cy.get('.request-list-description').should('contain.text', request.description);
    cy.get('.request-list-itemType').should('contain.text', request.itemType);
    cy.get('.request-list-foodType').should('contain.text', request.foodType);
  });

  it('Should delete the old request on the volunteer page', () => {
    const request: Request = {
      _id: '588935f57546a2daea44de7c',
      itemType: 'food',
      foodType: 'fruit',
      description: 'I\'d like some apples',
      dateAdded:'1999-12-06'
    };

    page.navigateToVolunteer();
    page.selectEditButton();
    page.newRequestButton().click();
    page.navigateToVolunteer();

    cy.get('.request-list-description').should('not.contain.text', request.description);
    cy.get('.request-list-description').should('not.contain.text', request.itemType);
    cy.get('.request-list-description').should('not.contain.text', request.foodType);
  });

});
