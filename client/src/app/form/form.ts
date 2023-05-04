////////////// Interface for the whole form ////////////////////


  export interface VolunteerForm {personalInfo: PersonalInfo;
    fruit: Fruit;
    vegetable: Vegetable;
    protein: Protein;
    grain: Grain;
    dairy: Dairy;
    pantry: Pantry;
    baby: Baby;
    personal: Personal;
    houseHold: Household;
    }


///////////////////// We just need a type for PersonalInfo //////////////////////////
type PersonalInfo = {
  fullName: string;
  zipCode: string;
  date: Date;
  personsInHome: number;
  personsUnder18: number;
  personsOver65: number;
  incomeLessThanGuideline: boolean;
  glutenFree: boolean;
  lowSugar: boolean;
  lactoseFree: boolean;
  vegetarian: boolean;
};

type Fruit = {
  freshMisc: boolean;
        freshAppleJuice: boolean;
        freshFrozenPeaches: boolean;
        cannedMixed: boolean;
        cannedPeaches: boolean;
        cannedAppleSauce: boolean;
        driedDates: boolean;
};
type Vegetable = {
  freshCarrots: boolean;
        freshPotatoes: boolean;
        freshMisc: boolean;
        cannedCorn: boolean;
        cannedGreenBeans: boolean;
        cannedPeas: boolean;
        cannedSweetPotatoes: boolean;
        cannedSpinach: boolean;
        cannedCarrots: boolean;
        cannedTomatoes: boolean;
        cannedSpaghettiSauce: boolean;
};
type Protein = {
  frozenGroundBeef: boolean;
        frozenGroundBeefPork: boolean;
        frozenPlantBurger: boolean;
        frozenPizzaRanch: boolean;
        frozenVeggieRavioli: boolean;
        frozenChickenDrum: boolean;
        frozenWholeChicken: boolean;
        frozenChickenBreast: boolean;
        frozenChickenLeg: boolean;
        frozenFishSticks: boolean;
        frozenHam: boolean;
        frozenAssortedMeats: boolean;
        cannedChicken: boolean;
        cannedTuna: boolean;
        cannedSalmon: boolean;
        cannedPastaMeatSauce: boolean;
        cannedPastaButterSauce: boolean;
        cannedChili: boolean;
        cannedVegCurry: boolean;
        cannedHotDogSauce: boolean;
        beansBlackPeas: boolean;
        beansYellow: boolean;
        beansPinto: boolean;
        beansPork: boolean;
        driedBlack: boolean;
        driedPinto: boolean;
        driedYellow: boolean;
        driedKidney: boolean;
        driedMisc: boolean;
        nutPeanutButter: boolean;
        nutAlmonds: boolean;
        nutWalnut: boolean;
        snackCracker: boolean;
        snackCookies: boolean;
        snackMisc: boolean;
};
type Grain = {
  breakfastRice: boolean;
  breakfastStuffing: boolean;
        breakfastPancake: boolean;
        breakfastQuickOat: boolean;
        breakfastCereal: boolean;
        pastaElbow: boolean;
        pastaMacaroni: boolean;
        pastaPenne: boolean;
        pastaRiceInstant: boolean;
        bakeryBread: boolean;
        bakeryHamburger: boolean;
        bakeryDawg: boolean;
        bakeryGoods: boolean;
};

type Dairy = {
  freshMilk: boolean;
        miscDairy: boolean;
        freshCheese: boolean;
        freshYogurt: boolean;
        freshButter: boolean;
        shelfStableMilk: boolean;
};

type Pantry = {
  bakingMix: boolean;
        bakingCakeMix: boolean;
        bakingFlour: boolean;
        bakingMuffinMix: boolean;
        bakingCookieMix: boolean;
        bakingMisc: boolean;
        bakingVegOil: boolean;
        soupChicken: boolean;
        soupTomato: boolean;
        soupVegetable: boolean;
        soupCreamy: boolean;
        soupMisc: boolean;
        condimentSeasonings: boolean;
        condimentHotSauce: boolean;
        condimentDressing: boolean;
        condimentRanch: boolean;
        condimentMustard: boolean;
        condimentSyrup: boolean;
        condimentPicklesOlives: boolean;
};

type Baby = {
  babyFruit: boolean;
        babyCereal: boolean;
        babyFormula: boolean;
        babyNewbornGiftBag: boolean;
        babyDiaperSize: '';
};

type Personal = {
  hygieneShampoo: boolean;
      hygieneBody: boolean;
      hygieneToothpaste: boolean;
      hygieneToothbrush: boolean;
      birthdayPartyKit: boolean;
      hygieneHandSanitizer: boolean;
      hygieneFemale: boolean;
};

type Household ={
  dishSoap: boolean;
        laundryDetergent: boolean;
        disinfectingWipes: boolean;
};



