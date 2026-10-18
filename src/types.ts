export interface Ingredient {
  id: string;
  name: string;
  hindiName?: string;
  quantity: string;
  unit: string;
  role: string;
  description: string;
  aromaNote: string;
  image: string;
  fallbackColor: string;
}

export interface CookingStep {
  number: string;
  stage: 'WATER' | 'SPICE' | 'TEA' | 'MILK' | 'SIMMER' | 'STRAIN';
  headline: string;
  instruction: string;
  subdetail: string;
  duration: string;
  visualNote: string;
  image: string;
  accentColor: string;
  ambientTone: string;
}
