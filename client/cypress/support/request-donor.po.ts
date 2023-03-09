import { ItemType, FoodType } from 'src/app/requests/request';

export class RequestDonorPage {
  private readonly baseUrl = '/requests/donor';
  private readonly pageTitle = '.donor-view-title';
  private readonly requestItemTypeDropDown = '[data-test=requestItemTypeSelect]';
  private readonly requestFoodTypeDropDown = '[data-test=requestItemTypeSelect]';
  private readonly dropdownOptionSelector = `mat-option`;

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getDonorViewTitle() {
    return cy.get(this.pageTitle);
  }

  getRequestListItems() {
    return cy.get('.donor-nav-list .request-list-item');
  }
  selectItemType(value: ItemType) {
    cy.get(this.requestItemTypeDropDown).click();
    return cy.get(`${this.dropdownOptionSelector}[value="${value}"]`);
  }

  selectFoodType(value: FoodType) {
    cy.get(this.requestItemTypeDropDown).click();
    return cy.get(`${this.dropdownOptionSelector}[value="${value}"]`);
  }
}
