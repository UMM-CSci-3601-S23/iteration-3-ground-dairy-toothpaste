export interface Request {
  _id: string;
  itemType: ItemType;
  description: string;
  foodType: FoodType;
  generalNeed: boolean;
//  originType: OriginType;
}

//export type OriginType = 'volunteer' | 'client';
export type ItemType = 'food' | 'toiletries' | 'other';
export type FoodType = '' | 'dairy' | 'grain' | 'meat' | 'fruit' | 'vegetable';
