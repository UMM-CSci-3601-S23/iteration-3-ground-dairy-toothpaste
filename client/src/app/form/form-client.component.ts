/* eslint-disable no-underscore-dangle */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormService } from './form.service';



/** @title Checkboxes with reactive forms */
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})

export class ClientFormComponent implements OnInit {

  fruits: { fresh: { name: string }[]; canned: { name: string }[]; dried: { name: string }[] } = {
    fresh: [
      { name: 'Misc Fresh Fruit' },
      { name: 'Apple Juice' },
      { name: 'Frozen Peaches' }
    ],
    canned: [
      { name: 'Mixed Fruit' },
      { name: 'Peaches' },
      { name: 'Apple Sauce' }
    ],
    dried: [
      { name: 'Dates' }
    ]
  };

  vegetables: { fresh: { name: string }[]; canned: { name: string }[] } = {
    fresh: [
      { name: 'Carrots' },
      { name: 'Potatoes' },
      { name: 'Misc Veggies' }
    ],
    canned: [
      { name: 'Corn' },
      { name: 'Green Beans' },
      { name: 'Peas' },
      { name: 'Sweet Potatoes' },
      { name: 'Spinach' },
      { name: 'Carrots' },
      { name: 'Diced Tomatoes' },
      { name: 'Spaghetti Sauce' }
    ]
  };

  checkboxForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize form groups and controls
    this.checkboxForm = this.formBuilder.group({
      fruits: this.formBuilder.group(this.getFruitControls()),
      vegetables: this.formBuilder.group(this.getVegetableControls())
    });
  }

  onSubmit() {
    const selectedFruits = this.getSelectedItems(this.checkboxForm.get('fruits') as FormGroup);
    console.log('fruits:', this.checkboxForm.get('fruits'));
    const selectedVegetables = this.getSelectedItems(this.checkboxForm.get('vegetables') as FormGroup);
    console.log('vegetables:', this.checkboxForm.get('vegetables'));
    // console.log('Selected Fruits:', selectedFruits);
    // console.log('Selected Vegetables:', selectedVegetables);
  }

  private getFruitControls(): { [key: string]: any } {
    const controls = {};
    this.fruits.fresh.forEach((item) => {
      controls[item.name] = [false];
    });
    this.fruits.canned.forEach((item) => {
      controls[item.name] = [false];
    });
    this.fruits.dried.forEach((item) => {
      controls[item.name] = [false];
    });
    return controls;
  }

  private getVegetableControls(): { [key: string]: any } {
    const controls = {};
    this.vegetables.fresh.forEach((item) => {
      controls[item.name] = [false];
    });
    this.vegetables.canned.forEach((item) => {
      controls[item.name] = [false];
    });
    return controls;
  }


  private getSelectedItems(formGroup: FormGroup) {
    const selectedItems = [];
    formGroup.controls.

    // .forEach((control, i) => {
    //   if (control.value) {
    //     selectedItems.push(formGroup.at(i).value);
    //   }
    // });
    return selectedItems;
  }
}


