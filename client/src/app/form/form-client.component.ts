/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-underscore-dangle */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { FormService } from './form.service';
import { fruitLiteral, proteinLiteral, vegetableLiteral,
  grainLiteral, pantryLiteral, dairyLiteral, personalLiteral, householdLiteral } from './form';
import { MatSnackBar } from '@angular/material/snack-bar';



/** @title Checkboxes with reactive forms */
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})

export class ClientFormComponent implements OnInit {

  fruits = fruitLiteral;
  vegetables = vegetableLiteral;
  proteins = proteinLiteral;
  grains = grainLiteral;
  pantry = pantryLiteral;
  dairy = dairyLiteral;
  personal = personalLiteral;
  household = householdLiteral;
  shoppingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Initialize form groups and controls
    this.shoppingForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        fullName: '',
        zipCode: '',
        date: Date(),
        personsInHome: '',
        personsUnder18: '',
        personsOver65: '',
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: false,
        lactoseFree: false,
        vegetarian: false,
      }),
      fruit: this.formBuilder.group({
        freshMisc: false,
        freshAppleJuice: false,
        freshFrozen: false,
        cannedMixed: false,
        cannedPeaches: false,
        cannedAppleSauce: false,
        driedDates: false,
      }),
      vegetable: this.formBuilder.group({
        freshCarrots: false,
        freshPotatoes: false,
        freshMisc: false,
        cannedCorn: false,
        cannedGreenBeans: false,
        cannedPeas: false,
        cannedSweetPotatoes: false,
        cannedSpinach: false,
        cannedCarrots: false
      }),
      protein: this.formBuilder.group({
        frozenGroundBeef: false,
        frozenGroundBeefPork: false,
        frozenPlantBurger: false,
        frozenPizzaRach: false,
        frozenVeggieRavioli: false,
        freshChickenDrum: false,
        freshWholeChicken: false,
        freshChickenBreast: false,
        freshChickenLeg: false,
        freshFishSticks: false,
        freshHam: false,
        freshAssortedMeats: false,
        cannedChicken: false,
        cannedTuna: false,
        cannedSalmon: false,
        cannedMeals: false,
        cannedPastaMeatSauce: false,
        cannedPastaButterSauce: false,
        cannedChili: false,
        cannedVegCurry: false,
        cannedHotDogSauce: false,
        beansBlackPeas: false,
        beansYellow: false,
        beansPinto: false,
        beansPork: false,
        beansRefried: false,
        beansWhite: false,
      }),
      grain: this.formBuilder.group({
        breakfastStuffing: false,
        breakfastPancake: false,
        breakfastQuickOat: false,
        breakfastCereal: false,
        pastaElbow: false,
        pastaMacaronie: false,
        pastaPenne: false,
        pastaRiceInstant: false,
        bakeryBread: false,
        bakeryHamburger: false,
        bakeryDawg: false,
        bakeryGoods: false

      }),
      dairy: this.formBuilder.group({
        freshMilk: false,
        miscDairy: false,
        freshCheese: false,
        freshYogurt: false,
        freshButter: false,
        shelfStableMilk: false,
      }),
      pantry: this.formBuilder.group({
        bakingMix: false,
        bakingCakeMix: false,
        bakingFlour: false,
        bakingMuffinMix: false,
        bakingCookieMix: false,
        bakingMisc: false,
        bakingVegOil: false,
        soupChicken: false,
        soupTomato: false,
        soupVegetable: false,
        soupCreamy: false,
        soupMisc: false,
        condimentSeasonings: false,
        condimentHotSauce: false,
        condimentRanch: false,
        condimentMustard: false,
        condimentSyrup: false,
        condimentPicklesOlives: false,
      }),
      baby:this.formBuilder.group({
        babyFruit: false,
        babyCereal: false,
        babyFormula: false,
        babyNewbornGiftBag: false,
        babyDiaper: false,
        babyDiaperSize: '',

      }),
      personal: this.formBuilder.group({
      hygieneShampoo: false,
      hygieneBody: false,
      hygieneToothpaste: false,
      hygieneToothbrush: false,
      birthdayPartyKit: false,
      hygieneHandSanitizer: false,
      hygieneFemale: false,
      }),
      household: this.formBuilder.group({
        dishSoap: false,
        laundryDetergent: false,
        disinfectingWipes: false,
      }),


      fruitGroup: this.formBuilder.group(this.getFruitControls()),

      vegetableGroup: this.formBuilder.group(this.getVegetableControls()),

      proteinGroup: this.formBuilder.group(this.getProteinControls()),

      grainGroup: this.formBuilder.group(this.getGrainControls()),

      pantryGroup: this.formBuilder.group(this.getPantryControls()),

      dairyGroup: this.formBuilder.group(this.getDairyControls()),

      personalGroup: this.formBuilder.group(this.getPersonalControls()),

      householdGroup: this.formBuilder.group(this.getHouseholdControls()),
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

  private getPantryControls(): { [key: string]: any } {
    const controls = {};
    this.pantry.baking.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.pantry.soups.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });
    this.pantry.condiments.descriptions.forEach((item) => {
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

  private getPersonalControls(): { [key: string]: any } {
    const controls = {};
    this.personal.hygiene.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });

    return controls;
  }

  private getHouseholdControls(): { [key: string]: any } {
    const controls = {};
    this.household.cleaning.descriptions.forEach((item) => {
      controls[item.description] = [false];
    });

    return controls;
  }


}


