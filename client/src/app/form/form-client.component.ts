/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-underscore-dangle */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { FormService } from './form.service';
import { fruitLiteral, proteinLiteral, vegetableLiteral, grainLiteral, dairyLiteral } from './form';
import { MatSnackBar } from '@angular/material/snack-bar';



/** @title Checkboxes with reactive forms */
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})

export class ClientFormComponent implements OnInit {

  fruits = fruitLiteral;
  proteins = proteinLiteral;
  vegetables = vegetableLiteral;
  grains = grainLiteral;
  dairy = dairyLiteral;
  shoppingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Initialize form groups and controls
    this.shoppingForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        fullName: '',
        zipCode: '',
        todayDate: Date(),
        personsInHome: '',
        personsUnder18: '',
        personsOver65: '',
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: false,
        lactoseFree: false,
        vegetarian: false,
      }),
      fruitGroup: this.formBuilder.group(this.getFruitControls()),

      vegetableGroup: this.formBuilder.group(this.getVegetableControls()),

      proteinGroup: this.formBuilder.group(this.getProteinControls()),

      grainGroup: this.formBuilder.group(this.getGrainControls()),
    });
    console.log(this.shoppingForm);
  }


  submitForm() {
    this.formService.addForm(this.shoppingForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Thank You  ${this.shoppingForm.value.personalInfo.fullName}`,
          null,
          { duration: 2000 }
        );
      },
      error: err => {
        this.snackBar.open(
          `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      },
    });
  }

  private getFruitControls(): { [key: string]: any } {
    const controls = {};
    this.fruits.fresh.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.fruits.canned.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.fruits.dried.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    return controls;
  }

  private getVegetableControls(): { [key: string]: any } {
    const controls = {};
    this.vegetables.fresh.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.vegetables.canned.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    return controls;
  }

  private getProteinControls(): { [key: string]: any } {
    const controls = {};
    this.proteins.frozen.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.proteins.fresh.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.proteins.canned.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.proteins.beans.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    return controls;
  }

  private getGrainControls(): { [key: string]: any } {
    const controls = {};
    this.grains.breakfast.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.grains.driedPasta.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.grains.bakery.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    return controls;
  }

  private getDairyControls(): { [key: string]: any } {
    const controls = {};
    this.dairy.fresh.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });

    return controls;
  }

}


