////////////// Interface for the whole form ////////////////////


export interface Form {personalInfo: PersonalInfo;
  fruitGroup: FruitsType;
  vegetableGroup: VegetablesType;
  proteinGroup: ProteinsType;
  grainGroup: GrainsType;
  dairyGroup: DairyType;
  pantryGroup: PantryType;
  personalGroup: PersonalType;
  houseHoldGroup: HouseholdType;
  }

  export interface VolunteerForm {personalInfo: PersonalInfo;
    fruit: Fruit;
    vegetable: Vegetable;
    protein: Protein;
    grain: Grain;
    dairy: Dairy;
    pantry: Pantry;
    personal: Personal;
    houseHold: Household;
    }

export interface Form {_id: string; personalInfo: PersonalInfo; fruitGroup: FruitsType| any; vegetableGroup: VegetablesType| any}


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
        freshFrozen: boolean;
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
};
type Protein = {
  frozenGroundBeef: boolean;
        frozenGroundBeefPork: boolean;
        frozenPlantBurger: boolean;
        frozenPizzaRach: boolean;
        frozenVeggieRavioli: boolean;
        freshChickenDrum: boolean;
        freshWholeChicken: boolean;
        freshChickenBreast: boolean;
        freshChickenLeg: boolean;
        freshFishSticks: boolean;
        freshHam: boolean;
        freshAssortedMeats: boolean;
        cannedChicken: boolean;
        cannedTuna: boolean;
        cannedSalmon: boolean;
        cannedMeals: boolean;
        cannedPastaMeatSauce: boolean;
        cannedPastaButterSauce: boolean;
        cannedChili: boolean;
        cannedVegCurry: boolean;
        cannedHotDogSauce: boolean;
        beansBlackPeas: boolean;
        beansYellow: boolean;
        beansPinto: boolean;
        beansPork: boolean;
        beansRefried: boolean;
        beansWhite: boolean;
};
type Grain = {
  breakfastStuffing: boolean;
        breakfastPancake: boolean;
        breakfastQuickOat: boolean;
        breakfastCereal: boolean;
        pastaElbow: boolean;
        pastaMacaronie: boolean;
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
        babyDiaper: boolean;
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



///// We have an Object Literal and a type for each form Group. ////

///////////////////////////////////// FRUITS / FRUTAS //////////////////////////////

type FruitsType = {
  section: string;
  fresh: {
    label: string;
    descriptions: { description: string }[];
  };
  canned: {
    label: string;
    descriptions: { description: string }[];
  };
  dried: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const fruitLiteral: FruitsType = {
  section: 'FRUITS / FRUTAS',
  fresh: {
    descriptions: [
      { description: 'Misc Fresh Fruit as available / Varios frutas frescas como disponible' },
      { description: 'Apple juice / Jugo de manzana' },
      { description: 'Frozen peaches / Duraznos congelados' }
    ],
    label: 'Fresh / Fresca',
  },
  canned: {
    label: 'Canned / En Lata',
    descriptions: [
      { description: 'Mixed fruit / Mix de fruta' },
      { description: 'Peaches / Duraznos' },
      { description: 'Apple Sauce / Puré de manzana' }
    ]
  },
  dried: {
    label: 'Dried / Seca',
    descriptions: [
      { description: 'Dates (whole OR pieces) / Dátiles (enteros O piezas)' }
    ]
  }
};

/////////////////////////// VEGETABLES / VERDURAS ///////////////////////////////
type VegetablesType = {
  section: string;
  fresh: {
    label: string;
    descriptions: { description: string }[];
  };
  canned: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const vegetableLiteral: VegetablesType ={
  section: 'VEGETABLES / VERDURAS',
  fresh: {
    label: 'Fresh / Fresca',
    descriptions: [
      { description: 'Carrots / Zanahorias' },
      { description: 'Potatoes / Papas' },
      { description: 'Misc veggies as available / Varias verduras como disponible' }
    ]
  },
  canned: {
    label: 'Canned / En Lata',
    descriptions: [
      { description: 'Corn / Elote' },
      { description: 'Green beans / Ejotes' },
      { description: 'Peas / Chicharitos' },
      { description: 'Sweet Potatoes / Papas dulces' },
      { description: 'Spinach / Espinaca' },
      { description: 'Carrots / Zanahorias' }
    ]
  }
};

/////////////////////////////////// PROTEINS / PROTEÍNAS //////////////////
type ProteinsType = {
  section: string;
  frozen: {
    label: string;
    descriptions: { description: string }[];
  };
  fresh: {
    label: string;
    descriptions: { description: string }[];
  };
  canned: {
    label: string;
    descriptions: { description: string }[];
  };
  beans: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const proteinLiteral: ProteinsType = {
  section: 'PROTEINS / PROTEÍNAS',
  frozen: {
    label: 'Frozen meat / Carne congelada',
    descriptions: [
      { description: 'Ground beef / Carne de res molido' },
      { description: 'Ground Beef/Pork Blend / Mezcla de carne de res y puerco molido' },
      { description: 'Plant based burgers / Hamburguesas vegetarianas' },
      { description: 'Pizza Ranch Pizza / Pizza de Pizza Ranch' },
      { description: 'Veggie Ravioli (for one) / Raviolis con verduras (para uno)' }
    ]
  },
  fresh: {
    label: 'Fresh meat / Carne fresca',
    descriptions: [
      { description: 'Chicken drumsticks / Piernas de pollo (pequeños)' },
      { description: 'Whole chicken / Pollo entero' },
      { description: 'Chicken breast / Pechuga de pollo' },
      { description: 'Chicken Leg Qtrs / Piernas de pollo (grande)' },
      { description: 'Fish Sticks/ Pescado' },
      { description: 'Ham / Jamón' },
      { description: 'Assorted meats as available / Varios carnes como disponible' }
    ]
  },
  canned: {
    label: 'Canned meat / Carne en Lata',
    descriptions: [
      { description: 'Chicken / Pollo' },
      { description: 'Tuna / Atún' },
      { description: 'Salmon / Salmon' },
      { description: 'Ready to eat canned meals / Comida instantanea' },
      { description: 'Pasta with meat sauce / Espagueti en lata con carne' },
      { description: 'Pasta in butter sauce / Espagueti en lata con mantequilla' },
      { description: 'Canned chili / Chili en lata' },
      { description: 'Veg Curry (for one) / Curry con verduras (para uno)' },
      { description: 'Hot Dog sauce / Salsa para salchichas' }
    ]
  },
  beans: {
    label: 'Canned beans / Frijoles en Lata',
    descriptions: [
      { description: 'Black eyed peas / Frijol carita negro' },
      { description: 'Yellow eyed beans / Frijoles amarillos' },
      { description: 'Pinto beans / Frijoles pintos' },
      { description: 'Pork & beans / Frijoles con puerco' },
      { description: 'Refried beans / Frijoles refritos' },
      { description: 'White beans / Frijoles blancos' }
    ]
  }
};

////////////////////// GRAINS / GRANOS ///////////////////
type GrainsType = {
  section: string;
  breakfast: {
    label: string;
    descriptions: { description: string }[];
  };
  driedPasta: {
    label: string;
    descriptions: { description: string }[];
  };
  bakery: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const grainLiteral: GrainsType = {
  section: 'GRAINS / GRANOS',
  breakfast: {
    label: 'Breakfast / Desayuno',
    descriptions: [
      { description: 'Stuffing mix / Mezcla para estofada' },
      { description: 'Pancake mix / Mezcla para hot cakes' },
      { description: 'Quick Oats / Avena instantánea' },
      { description: 'Ready-to-eat cereal / Cereal' },
    ],
  },
  driedPasta: {
    label: 'Dried pasta / Pasta seca',
    descriptions: [
      { description: 'Elbow Noodles / Coditos' },
      { description: 'Macaroni & cheese / Macaroni & queso' },
      { description: 'Penne pasta / Pasta penne' },
      { description: 'Instant pasta or rice / Pasta o arroz instantánea' },
    ],
  },
  bakery: {
    label: 'Bakery / Panaderia',
    descriptions: [
      { description: 'Bread / Pan' },
      { description: 'Hamburger buns / Pan para hamburguesas' },
      { description: 'Hot dog buns / Pan para Hot Dog' },
      { description: 'Baked goods / Postres' },
    ],
  },
};

//////////////////////////// MILK & CHEESE / LÁCTEOS ///////////////////

type DairyType = {
  section: string;
  fresh: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
};

export const dairyLiteral: DairyType = {
  section: 'MILK & CHEESE / LÁCTEOS',
  fresh: {
    label: '',
    descriptions: [
      { description: 'Fresh milk (lactose free) / Leche (sin lactosa)' },
      { description: 'Misc dairy products / Varios productos lácteos' },
      { description: 'Cheese / Queso' },
      { description: 'Yogurt / Yogur' },
      { description: 'Butter / Mantequilla' },
      { description: 'Shelf stable milk / Leche que no necesita refrigeración' }
    ]
  },
};

///// PANTRY, COOKING, & BAKING / COCINAR y HORNEAR ///////


type PantryType = {
  section: string;
  baking: {
    label: string;
    descriptions: { description: string }[];
  };
  soups: {
    label: string;
    descriptions: { description: string }[];
  };
  condiments: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const pantryLiteral: PantryType = {
  section: 'PANTRY, COOKING, & BAKING / COCINAR y HORNEAR',
  baking: {
    label: 'Baking / Hornear',
    descriptions: [
      { description: 'Baking mix / Mezcla para panecillos' },
      { description: 'Cake mix / Mezcla para pastel' },
      { description: 'Flour / Harina' },
      { description: 'Muffin mix / O mezcla para panquecitos' },
      { description: 'Cookie mix / Mezcla para galletas' },
      { description: 'Miscellaneous baking items / Varios productos para hornear' },
      { description: 'Vegetable oil / Aceite vegetal' }
    ]
  },
  soups: {
    label: 'Soups / Sopas',
    descriptions: [
      { description: 'Chicken noodle / Espagueti con pollo' },
      { description: 'Tomato soup / Crema de jitomate' },
      { description: 'Vegetable soup / Sopa de vegetales' },
      { description: 'Creamy canned soup / Crema de hongos o pollo' },
      { description: 'Misc soups, as available / Varios sopas en lata, disponibilidad variable' }
    ]
  },
  condiments: {
    label: 'Condiments / Condimentos',
    descriptions: [
      { description: 'Seasonings / Condimentos' },
      { description: 'Hot Sauce / Salsa picante' },
      { description: 'Salad dressing (miscellaneous) / Varios aderezos' },
      { description: 'Ranch dressing / Aderezo “Ranch”' },
      { description: 'Mustard / Mostaza' },
      { description: 'Syrup / Jarabe para panqueques' },
      { description: 'Misc pickles, olives, etc / Varios encurtidos, olivas, etc.' }
    ]
  }
};



/////////////////////////////// PERSONAL / PERSONAL ////////////////////////

type PersonalType = {
  section: string;
  hygiene: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const personalLiteral: PersonalType = {
  section: 'PERSONAL / PERSONAL',
  hygiene: {
    label: 'Hygiene / Higiene',
    descriptions: [
      { description: 'Shampoo / Shampu' },
      { description: 'Body or hand soap / Jabón para el cuerpo o manos' },
      { description: 'Toothpaste / Pasta dental' },
      { description: 'Toothbrushes / Cepillo dental' },
      { description: 'Birthday Party Kit / Kit para una fiesta de cumpleaños' },
      { description: 'Hand sanitizer / Desinfectante de manos' },
      { description: 'Feminine hygiene / Artículos higiénicos para mujer' }
    ]
  }
};

////////////////////////////////// HOUSEHOLD / PARA LA CASA //////////////////////////

type HouseholdType = {
  section: string;
  cleaning: {
    label: string;
    descriptions: { description: string }[];
  };
};

export const householdLiteral: HouseholdType = {
  section: 'HOUSEHOLD / PARA LA CASA',
  cleaning: {
    label: '',
    descriptions: [
      { description: 'Dish soap / Jabón para trastes' },
      { description: 'Laundry detergent / Detergente para ropa' },
      { description: 'Disinfecting wipes / Toallitas desinfectantes' }
    ]
  }
};

