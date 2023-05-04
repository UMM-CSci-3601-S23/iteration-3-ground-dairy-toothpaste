/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-underscore-dangle */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { FormService } from './form.service';
import { MatSnackBar } from '@angular/material/snack-bar';



/** @title Checkboxes with reactive forms */
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})

export class ClientFormComponent implements OnInit {

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
        freshFrozenPeaches: false,
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
        cannedCarrots: false,
        cannedTomatoes: false,
        cannedSpaghettiSauce: false
      }),
      protein: this.formBuilder.group({
        frozenGroundBeef: false,
        frozenGroundBeefPork: false,
        frozenPlantBurger: false,
        frozenPizzaRanch: false,
        frozenVeggieRavioli: false,
        frozenChickenDrum: false,
        frozenWholeChicken: false,
        frozenChickenBreast: false,
        frozenChickenLeg: false,
        frozenFishSticks: false,
        frozenHam: false,
        frozenAssortedMeats: false,
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
        driedBlack: false,
        driedPinto: false,
        driedYellow: false,
        driedKidney: false,
        driedMisc: false,
        nutPeanutButter: false,
        nutAlmonds: false,
        nutWalnut: false,
        snackCracker: false,
        snackCookies: false,
        snackMisc: false,
      }),
      grain: this.formBuilder.group({
        breakfastRice: false,
        breakfastStuffing: false,
        breakfastPancake: false,
        breakfastQuickOat: false,
        breakfastCereal: false,
        pastaElbow: false,
        pastaMacaroni: false,
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
        condimentDressing: false,
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


}


