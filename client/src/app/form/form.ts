import { FormGroup } from '@angular/forms';

export interface Form {_id: string; personalInfo: PersonalInfo; fruitGroup: FruitsType| any; vegetableGroup: VegetablesType| any}

type PersonalInfo = {
  fullName: string;
  zipCode: string;
  todayDate: Date;
  personsInHome: number;
  personsUnder18: number;
  personsOver65: number;
  incomeLessThanGuideline: boolean;
  glutenFree: boolean;
  lowSugar: boolean;
  lactoseFree: boolean;
  vegetarian: boolean;
};

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

export const fruits: FruitsType = {
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

type VegetablesType = {
  section: string;
  fresh: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
  canned: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
};

export const vegetables: VegetablesType ={
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



export type ProteinsType = {
  section: 'PROTEINS / PROTEÍNAS';
  frozen: {
    label: 'Frozen meat / Carne congelada';
    descriptions: { description: string }[];
  };
  fresh: {
    label: 'Fresh meat / Carne fresca';
    descriptions: { description: string }[];
  };
  canned: {
    label: 'Canned meat / Carne en Lata';
    descriptions: { description: string }[];
  };
  beans: {
    label: 'Canned beans / Frijoles en Lata';
    descriptions: { description: string }[];
  };
};

export const proteins: ProteinsType = {
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


type GrainsType = {
  section: string;
  breakfast: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
  driedPasta: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
  bakery: {
    label: string;
    descriptions: {
      description: string;
    }[];
  };
};

export const grains: GrainsType = {
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
