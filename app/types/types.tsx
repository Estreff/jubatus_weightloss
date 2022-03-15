import { getUser } from '~/utils/session.server';

export type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
    confirmPassword?: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
};

export type ActionRecipeData = {
  formError?: string;
  fieldErrors?: {
    recipe_name: string | undefined;
    protein: string | undefined;
    lean_type: string | undefined;
    cuisine: string | undefined;
    cook_time_range: string | undefined;
    cook_time: string | undefined;
    servings: string | undefined;
  };
  fields?:
    | {
        recipe_name: string;
        protein: string;
        lean_type: string;
        cuisine: string;
        cook_time_range: string;
        cook_time: string;
        servings: string;
      }
    | undefined;
};

export type LoaderRecipeData = {
  id: string | undefined;
  recipe_name: string;
  protein: string;
  lean_type: string;
  cuisine: string;
  cook_time_range: string;
  cook_time: string;
  servings: string;
};

export type LoaderUserData = {
  user: Awaited<ReturnType<typeof getUser>>;
};
