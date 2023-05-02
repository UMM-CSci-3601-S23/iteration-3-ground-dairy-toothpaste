import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Form } from 'src/app/form/form';
import { FormService } from 'src/app/form/form.service';

@Injectable({
  providedIn: AppComponent
})

export class MockFormService extends FormService {
  static testForms: Form[] = [
    {
      _id: 'Hi :)',
        personalInfo: {
        fullName: 'Ash',
        zipCode: '56701',
        todayDate: new Date(),
        personsInHome: 42,
        personsUnder18: 0,
        personsOver65: 40,
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: false,
        lactoseFree: false,
        vegetarian: false
      },
      fruitGroup: {
        'Misc Fresh Fruit as available / Varios frutas frescas como disponible': true,// eslint-disable-line
        'Apple juice / Jugo de manzana': true, // eslint-disable-line
        'Frozen peaches / Duraznos congelados': false, // eslint-disable-line
        'Mixed fruit / Mix de fruta': false, // eslint-disable-line
        'Peaches / Duraznos': true, // eslint-disable-line
        'Apple Sauce / Puré de manzana': false, // eslint-disable-line
        'Dates (whole OR pieces) / Dátiles (enteros O piezas)': false // eslint-disable-line
      },
      'vegetableGroup': { // eslint-disable-line
        'Carrots / Zanahorias': true, // eslint-disable-line
        'Potatoes / Papas': true, // eslint-disable-line
        'Misc veggies as available / Varias verduras como disponible': false, // eslint-disable-line
        'Corn / Elote': false, // eslint-disable-line
        'Green beans / Ejotes': false, // eslint-disable-line
        'Peas / Chicharitos': false, // eslint-disable-line
        'Sweet Potatoes / Papas dulces': false, // eslint-disable-line
        'Spinach / Espinaca': false // eslint-disable-line
      }
    },
    {
      _id: 'Hi :)',
        personalInfo: {
        fullName: 'Cash',
        zipCode: '56701',
        todayDate: new Date(),
        personsInHome: 42,
        personsUnder18: 0,
        personsOver65: 40,
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: false,
        lactoseFree: false,
        vegetarian: false
      },
      fruitGroup: {
        'Misc Fresh Fruit as available / Varios frutas frescas como disponible': true,// eslint-disable-line
        'Apple juice / Jugo de manzana': true, // eslint-disable-line
        'Frozen peaches / Duraznos congelados': false, // eslint-disable-line
        'Mixed fruit / Mix de fruta': false, // eslint-disable-line
        'Peaches / Duraznos': true, // eslint-disable-line
        'Apple Sauce / Puré de manzana': false, // eslint-disable-line
        'Dates (whole OR pieces) / Dátiles (enteros O piezas)': false // eslint-disable-line
      },
      'vegetableGroup': { // eslint-disable-line
        'Carrots / Zanahorias': true, // eslint-disable-line
        'Potatoes / Papas': true, // eslint-disable-line
        'Misc veggies as available / Varias verduras como disponible': false, // eslint-disable-line
        'Corn / Elote': false, // eslint-disable-line
        'Green beans / Ejotes': false, // eslint-disable-line
        'Peas / Chicharitos': false, // eslint-disable-line
        'Sweet Potatoes / Papas dulces': false, // eslint-disable-line
        'Spinach / Espinaca': false // eslint-disable-line
      }
    }
  ];
  public addedFormRequests: Partial<Form>[] = [];
  public wasGot = false;

  constructor() {
    super(null);
  }

  addForm(form: any): Observable<string> {
    this.addedFormRequests.push(form);
    return of('Okay ;)');
  }

  getAllForms(filters?: {sortOrder?: string}): Observable<Form[]> {
    this.wasGot = true;
    return of(MockFormService.testForms);
  }
}
