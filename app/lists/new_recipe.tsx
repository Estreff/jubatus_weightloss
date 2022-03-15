import { leans } from './leans_filter';
import { meats } from './meat_filter';
import { cuisines } from './cuisine_filter';
import { cookTimes } from './cookTimes_filter';

interface RecipeFields {
  input_type: string | undefined;
  field_name: string | undefined;
  label: string | undefined;
  type: { value: string; title: string }[] | undefined;
}
export const newRecipesFields = [
  {
    input_type: 'input',
    field_name: 'recipe_name',
    label: 'Recipe Name',
    options: undefined,
  },
  {
    input_type: 'select',
    field_name: 'protein',
    label: 'Protein Type',
    options: meats,
  },
  {
    input_type: 'input',
    field_name: 'lean_type',
    label: 'Lean Type',
    options: leans,
  },
  {
    input_type: 'select',
    field_name: 'cuisine',
    label: 'Cuisine Type',
    options: cuisines,
  },
  {
    input_type: 'select',
    field_name: 'cook_time',
    label: 'Cook Time',
    options: cookTimes,
  },
  {
    input_type: 'input',
    field_name: 'servings',
    label: 'Serving Qty',
    options: undefined,
  },
];
