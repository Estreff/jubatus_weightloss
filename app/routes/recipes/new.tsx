import type { ActionFunction, LoaderFunction } from 'remix';
import {
  useActionData,
  redirect,
  json,
  useCatch,
  Link,
  Form,
  useSearchParams,
  useLoaderData,
  useTransition,
} from 'remix';
import type { ActionRecipeData } from '~/types/types';
import recipeStyles from '~/styles/recipe.css';

import { db } from '~/utils/db.server';
import { getUserId, requireUserId } from '~/utils/session.server';
import { newRecipesFields } from '~/lists/new_recipe';
import { validateField } from '~/helperFunctions/helpers';

// Form Fliters
import { meats } from '~/lists/meat_filter';
import { leans } from '~/lists/leans_filter';
import { cuisines } from '~/lists/cuisine_filter';
import { cookTimes } from '~/lists/cookTimes_filter';
import { servings } from '~/lists/servings_filter';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: recipeStyles,
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return {};
};

const badRequest = (data: ActionRecipeData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const recipe_name = form.get('recipe_name');
  const protein = form.get('protein');
  const lean_type = form.get('lean_type');
  const cuisine = form.get('cuisine');
  const cook_time_range = form.get('cook_time_range');
  const cook_time = form.get('cook_time');
  const servings = form.get('servings');

  if (
    typeof recipe_name !== 'string' ||
    typeof protein !== 'string' ||
    typeof lean_type !== 'string' ||
    typeof cuisine !== 'string' ||
    typeof cook_time_range !== 'string' ||
    typeof cook_time !== 'string' ||
    typeof servings !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = {
    recipe_name,
    protein,
    lean_type,
    cuisine,
    cook_time_range,
    cook_time,
    servings,
  };

  const fieldErrors = {
    recipe_name: validateField(recipe_name, 'Recipe Name'),
    protein: validateField(protein, 'Protien'),
    lean_type: validateField(lean_type, 'Lean Type'),
    cuisine: validateField(cuisine, 'Cuisine'),
    cook_time_range: validateField(cook_time_range, 'Cook Time range'),
    cook_time: validateField(cook_time, 'Cook Time'),
    servings: validateField(servings, 'Servings'),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const recipe = await db.recipe.create({
    data: { ...fields, cookRecipeId: userId },
  });
  return redirect(`/recipes/${recipe.id}`);
};

export default function createRecipe() {
  // const data = useLoaderData<LoaderUserData>();
  const actionData = useActionData<ActionRecipeData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  return (
    <div className="create-recipe">
      <h1>Create Recipe</h1>
      <div className="page-container create-recipe-page">
        <div className="recipe-add">
          <Form
            className="recipe-form"
            method="post"
            aria-errormessage={
              actionData?.formError ? 'form-error-message' : undefined
            }
          >
            <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get('redirectTo') ?? undefined}
            />

            {/* Recipe Name Input */}
            <div className="input-recipe-group">
              <div className="input-recipe">
                <label htmlFor="">Recipe Name</label>
                <input
                  type="text"
                  className="input-recipe-add"
                  defaultValue={actionData?.fields?.recipe_name}
                  name="recipe_name"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.recipe_name) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.recipe_name
                      ? 'name-error'
                      : undefined
                  }
                />
                {actionData?.fieldErrors?.recipe_name ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="recipe_name-error"
                    >
                      {actionData.fieldErrors.recipe_name}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Protein Type Select */}
              <div className="input-recipe">
                <label htmlFor="">Protein Type</label>
                <select
                  className="input-recipe-add"
                  defaultValue={actionData?.fields?.protein}
                  name="protein"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.protein) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.protein ? 'name-error' : undefined
                  }
                >
                  {meats.map((meat) => {
                    return (
                      <option key={meat.value} value={meat.value}>
                        {meat.title}
                      </option>
                    );
                  })}
                </select>
                {actionData?.fieldErrors?.protein ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="protein-error"
                    >
                      {actionData.fieldErrors.protein}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Lean Type Selectd */}
              <div className="input-recipe">
                <label htmlFor="">Lean Type</label>
                <select
                  className="input-recipe-add"
                  defaultValue={actionData?.fields?.lean_type}
                  name="lean_type"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.lean_type) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.lean_type
                      ? 'name-error'
                      : undefined
                  }
                >
                  {leans.map((lean) => {
                    return (
                      <option key={lean.value} value={lean.value}>
                        {lean.title}
                      </option>
                    );
                  })}
                </select>
                {actionData?.fieldErrors?.lean_type ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="lean_type-error"
                    >
                      {actionData.fieldErrors.lean_type}
                    </p>
                  </div>
                ) : null}
              </div>
              {/* Cuisine Type Select */}
              <div className="input-recipe">
                <label htmlFor="">Cuisine Type</label>
                <select
                  className="input-recipe-add"
                  defaultValue={actionData?.fields?.cuisine}
                  name="cuisine"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.cuisine) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.cuisine ? 'name-error' : undefined
                  }
                >
                  {cuisines.map((cuisine) => {
                    return (
                      <option key={cuisine.value} value={cuisine.value}>
                        {cuisine.title}
                      </option>
                    );
                  })}
                </select>
                {actionData?.fieldErrors?.cuisine ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="cuisine-error"
                    >
                      {actionData.fieldErrors.cuisine}
                    </p>
                  </div>
                ) : null}
              </div>
              {/* Cook Time Range */}
              <div className="input-recipe">
                <label htmlFor="">Select Cook Time</label>
                <select
                  className="input-recipe-add"
                  defaultValue={actionData?.fields?.cook_time_range}
                  name="cook_time_range"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.cook_time_range) ||
                    undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.cook_time_range
                      ? 'name-error'
                      : undefined
                  }
                >
                  {cookTimes.map((cookTime) => {
                    return (
                      <option key={cookTime.value} value={cookTime.value}>
                        {cookTime.title}
                      </option>
                    );
                  })}
                </select>
                {actionData?.fieldErrors?.cook_time_range ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="cook_time_range-error"
                    >
                      {actionData.fieldErrors.cook_time_range}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="input-recipe-group">
                {/* Actual Cook Time */}
                <div className="input-recipe">
                  <label htmlFor="">
                    Cook Time <span>(in minutes)</span>
                  </label>
                  <input
                    type="number"
                    className="input-recipe-add"
                    defaultValue={actionData?.fields?.cook_time}
                    name="cook_time"
                    aria-invalid={
                      Boolean(actionData?.fieldErrors?.cook_time) || undefined
                    }
                    aria-errormessage={
                      actionData?.fieldErrors?.cook_time
                        ? 'name-error'
                        : undefined
                    }
                  />
                  {actionData?.fieldErrors?.cook_time ? (
                    <div className="validation-container">
                      <p
                        className="form-validation-error"
                        role="alert"
                        id="cook_time-error"
                      >
                        {actionData.fieldErrors.cook_time}
                      </p>
                    </div>
                  ) : null}
                </div>
                {/* Select Servings Type */}
                <div className="input-recipe">
                  <label htmlFor="">Servings</label>
                  <select
                    className="input-recipe-add"
                    defaultValue={actionData?.fields?.servings}
                    name="servings"
                    aria-invalid={
                      Boolean(actionData?.fieldErrors?.servings) || undefined
                    }
                    aria-errormessage={
                      actionData?.fieldErrors?.servings
                        ? 'name-error'
                        : undefined
                    }
                  >
                    <option value="none">Select Serving Size</option>
                    {servings.map((serving) => {
                      console.log('Serving:', serving);
                      return <option value={serving}>{serving}</option>;
                    })}
                  </select>
                  {actionData?.fieldErrors?.servings ? (
                    <div className="validation-container">
                      <p
                        className="form-validation-error"
                        role="alert"
                        id="servings-error"
                      >
                        {actionData.fieldErrors.servings}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="recipe-add-button">
              <button className="btn btn-primary btn-rounded">
                Create Recipe
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
