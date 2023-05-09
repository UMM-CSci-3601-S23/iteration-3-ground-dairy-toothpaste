import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { VolunteerForm } from 'src/app/form/form';
import { FormService } from 'src/app/form/form.service';

@Injectable({
  providedIn: AppComponent
})

export class MockFormService extends FormService {
  static testForms: VolunteerForm[] = [
    {

        personalInfo: {
        fullName: 'Ash',
        zipCode: '56701',
        date: new Date(),
        personsInHome: 42,
        personsUnder18: 0,
        personsOver65: 40,
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: false,
        lactoseFree: false,
        vegetarian: false
      },
      fruit: {
        freshMisc: true,// eslint-disable-line
        freshAppleJuice: true, // eslint-disable-line
        freshFrozenPeaches: false, // eslint-disable-line
        cannedMixed: false, // eslint-disable-line
        cannedPeaches: true, // eslint-disable-line
        cannedAppleSauce: false, // eslint-disable-line
        driedDates: false // eslint-disable-line
      },
      vegetable: { // eslint-disable-line
        freshCarrots: true, // eslint-disable-line
        freshPotatoes: true, // eslint-disable-line
        freshMisc: false, // eslint-disable-line
        cannedCorn: false, // eslint-disable-line
        cannedGreenBeans: false, // eslint-disable-line
        cannedPeas: false, // eslint-disable-line
        cannedSweetPotatoes: false, // eslint-disable-line
        cannedSpinach: false, // eslint-disable-line
        cannedCarrots: true,
        cannedTomatoes: false,
        cannedSpaghettiSauce: true
      },
      protein: {
        frozenGroundBeef: true,
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
        driedPinto: true,
        driedYellow: true,
        driedKidney: false,
        driedMisc: true,
        nutPeanutButter: false,
        nutAlmonds: true,
        nutWalnut: false,
        snackCracker: true,
        snackCookies: false,
        snackMisc: true
      },
      grain: {
        breakfastRice: true,
        breakfastStuffing: false,
        breakfastPancake: true,
        breakfastQuickOat: false,
        breakfastCereal: true,
        pastaElbow: true,
        pastaMacaroni: false,
        pastaPenne: true,
        pastaRiceInstant: false,
        bakeryBread: true,
        bakeryHamburger: true,
        bakeryDawg: false,
        bakeryGoods: true
      },
      dairy: {
        freshMilk: true,
        miscDairy: false,
        freshCheese: true,
        freshYogurt: false,
        freshButter: true,
        shelfStableMilk: false
      },
      pantry: {
        bakingMix: true,
        bakingCakeMix: false,
        bakingFlour: true,
        bakingMuffinMix: false,
        bakingCookieMix: true,
        bakingMisc: false,
        bakingVegOil: true,
        soupChicken: true,
        soupTomato: false,
        soupVegetable: false,
        soupCreamy: false,
        soupMisc: true,
        condimentSeasonings: true,
        condimentHotSauce: false,
        condimentDressing: true,
        condimentRanch: false,
        condimentMustard: true,
        condimentSyrup: false,
        condimentPicklesOlives: false
      },
      baby: {
        babyFruit: false,
        babyCereal: true,
        babyFormula: false,
        babyNewbornGiftBag: false,
        babyDiaperSize: ''
      },
      personal: {
        hygieneShampoo: false,
        hygieneBody: true,
        hygieneToothpaste: false,
        hygieneToothbrush: false,
        birthdayPartyKit: true,
        hygieneHandSanitizer: false,
        hygieneFemale: true
      },
      houseHold: {
        dishSoap: false,
        laundryDetergent: true,
        disinfectingWipes: false
      }
    },
    {
      // eslint-disable-line
        personalInfo: {
        fullName: 'Johnson',
        zipCode: '55331',
        date: new Date(),
        personsInHome: 12,
        personsUnder18: 1,
        personsOver65:11,
        incomeLessThanGuideline: false,
        glutenFree: false,
        lowSugar: true,
        lactoseFree: false,
        vegetarian: true
      },
      fruit: {
        freshMisc: false,// eslint-disable-line
        freshAppleJuice: true, // eslint-disable-line
        freshFrozenPeaches: true, // eslint-disable-line
        cannedMixed: false, // eslint-disable-line
        cannedPeaches: false, // eslint-disable-line
        cannedAppleSauce: false, // eslint-disable-line
        driedDates: true // eslint-disable-line
      },
      vegetable: { // eslint-disable-line
        freshCarrots: false, // eslint-disable-line
        freshPotatoes: true, // eslint-disable-line
        freshMisc: true, // eslint-disable-line
        cannedCorn: false, // eslint-disable-line
        cannedGreenBeans: true, // eslint-disable-line
        cannedPeas: false, // eslint-disable-line
        cannedSweetPotatoes: true, // eslint-disable-line
        cannedSpinach: false, // eslint-disable-line
        cannedCarrots: false,
        cannedTomatoes: false,
        cannedSpaghettiSauce: false
      },
      protein: {
        frozenGroundBeef: false,
        frozenGroundBeefPork: false,
        frozenPlantBurger: true,
        frozenPizzaRanch: false,
        frozenVeggieRavioli: true,
        frozenChickenDrum: false,
        frozenWholeChicken: true,
        frozenChickenBreast: false,
        frozenChickenLeg: true,
        frozenFishSticks: false,
        frozenHam: true,
        frozenAssortedMeats: false,
        cannedChicken: true,
        cannedTuna: false,
        cannedSalmon: true,
        cannedPastaMeatSauce: false,
        cannedPastaButterSauce: true,
        cannedChili: false,
        cannedVegCurry: true,
        cannedHotDogSauce: false,
        beansBlackPeas: true,
        beansYellow: false,
        beansPinto: true,
        beansPork: false,
        driedBlack: true,
        driedPinto: true,
        driedYellow: false,
        driedKidney: false,
        driedMisc: false,
        nutPeanutButter: false,
        nutAlmonds: false,
        nutWalnut: false,
        snackCracker: false,
        snackCookies: false,
        snackMisc: false
      },
      grain: {
        breakfastRice: false,
        breakfastStuffing: false,
        breakfastPancake: true,
        breakfastQuickOat: true,
        breakfastCereal: true,
        pastaElbow: false,
        pastaMacaroni: false,
        pastaPenne: false,
        pastaRiceInstant: false,
        bakeryBread: true,
        bakeryHamburger: false,
        bakeryDawg: false,
        bakeryGoods: false
      },
      dairy: {
        freshMilk: false,
        miscDairy: false,
        freshCheese: false,
        freshYogurt: true,
        freshButter: true,
        shelfStableMilk: false
      },
      pantry: {
        bakingMix: true,
        bakingCakeMix: true,
        bakingFlour: false,
        bakingMuffinMix: false,
        bakingCookieMix: true,
        bakingMisc: false,
        bakingVegOil: false,
        soupChicken: false,
        soupTomato: false,
        soupVegetable: false,
        soupCreamy: false,
        soupMisc: true,
        condimentSeasonings: false,
        condimentHotSauce: true,
        condimentDressing: true,
        condimentRanch: false,
        condimentMustard: false,
        condimentSyrup: false,
        condimentPicklesOlives: false
      },
      baby: {
        babyFruit: false,
        babyCereal: false,
        babyFormula: false,
        babyNewbornGiftBag: false,
        babyDiaperSize: ''
      },
      personal: {
        hygieneShampoo: true,
        hygieneBody: true,
        hygieneToothpaste: true,
        hygieneToothbrush: false,
        birthdayPartyKit: false,
        hygieneHandSanitizer: true,
        hygieneFemale: true
      },
      houseHold: {
        dishSoap: false,
        laundryDetergent: true,
        disinfectingWipes: false
      }
    }
  ];
  public addedFormRequests: Partial<VolunteerForm>[] = [];
  public wasGot = false;

  constructor() {
    super(null);
  }

  addForm(form: any): Observable<string> {
    this.addedFormRequests.push(form);
    return of('Okay ;)');
  }

  getAllForms(filters?: {sortOrder?: string}): Observable<VolunteerForm[]> {
    this.wasGot = true;
    return of(MockFormService.testForms);
  }
}
