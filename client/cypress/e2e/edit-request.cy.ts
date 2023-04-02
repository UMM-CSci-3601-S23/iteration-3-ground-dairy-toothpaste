import { Request } from 'src/app/requests/request';
import { EditRequestPage } from 'cypress/support/edit-request.po';

describe('Edit a request', ()=> {
  const page = new EditRequestPage();

  beforeEach(()=> {
    cy.task('seed:database');
    page.navigateToRequest();
  });

  it('Should edit the request', ()=> {
    const request: Request = {
      _id: '588935f57546a2daea44de7c',
      itemType: 'food',
      foodType: 'meat',
      description: 'This is a test edit'
    };

    page.editRequest(request);
    page.getSnackBar().should('contain', `Request successfully submitted`);

    page.navigateToDonor();
    cy.get('.donor-list-description').should('contain.text', request.description);
    cy.get('.donor-list-itemType').should('contain.text', request.itemType);
    cy.get('.donor-list-foodType').should('contain.text', request.foodType);
  });

});
