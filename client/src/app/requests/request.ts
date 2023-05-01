export interface Request {
  _id: string;
  itemType: ItemType;
  description: string;
  foodType: FoodType;
  generalNeed: boolean;
  dateAdded: string;
}

export type ItemType = 'food' | 'toiletries' | 'other';
export type FoodType = '' | 'dairy' | 'grain' | 'meat' | 'fruit' | 'vegetable';
