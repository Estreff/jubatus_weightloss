import { prisma } from '@prisma/client';
import type { ActionFunction, LoaderFunction, MetaFunction } from 'remix';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useCatch,
  useParams,
} from 'remix';

import type { Recipe } from '@prisma/client';

import { db } from '~/utils/db.server';
import { getUserId, requireUserId } from '~/utils/session.server';

type LoaderData = { recipe: Recipe; isOwner: boolean };

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
  });

  if (!recipe) {
    throw new Response('Recipe you are looking for Is Not Found', {
      status: 404,
    });
  }

  const data: LoaderData = { recipe, isOwner: userId === recipe.cookRecipeId };
  return data;
};

export default function RecipeRoute() {
  const data = useLoaderData<LoaderData>();
  console.log('Recipe Data: ', data.recipe);

  return (
    <div>
      <Link to="/recipes" className="back-button">
        Back
      </Link>
      <h1>{data.recipe.recipe_name}</h1>
      <div>{data.recipe.protein}</div>
      <div>{data.recipe.cuisine}</div>
      <div>{data.recipe.cook_time} minutes</div>
      {/* <div>{data.recipe.cook_time_range}</div> */}
      <div>{data.recipe.servings}</div>
      <div>{data.recipe.lean_type}</div>
    </div>
  );
}
