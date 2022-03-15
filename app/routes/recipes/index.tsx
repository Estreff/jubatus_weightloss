import { Link, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { LoaderRecipeData } from '~/types/types';
import { getUser } from '~/utils/session.server';

import recipeStyles from '~/styles/recipe.css';
import { meats } from '~/lists/meat_filter';
import { leans } from '~/lists/leans_filter';
import { cookTimes } from '~/lists/cookTimes_filter';
import { cuisines } from '~/lists/cuisine_filter';

import { db } from '~/utils/db.server';

import { RecipeDisplay } from '~/components/recipeItem';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: recipeStyles,
    },
  ];
}

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  recipes: Array<LoaderRecipeData>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const recipes = await db.recipe.findMany();

  const data: LoaderData = {
    user,
    recipes,
  };
  return data;
};

export default function RecipeRoute() {
  const data = useLoaderData<LoaderData>();

  console.log('Recipe Page Data: ', data);
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lean and Green Meals</h1>
        {data.user ? (
          <div className="recipe-actions">
            <Link to="edit" className="btn btn-warning recipe-button">
              Edit Recipe
            </Link>
            <Link to="new" className="btn btn-primary recipe-button">
              Create Recipe
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="recipe-layout">
        <div className="search">
          <i className="fa fa-search searchIcon"></i>
          <input type="text" className="searchBox" placeholder="Search ..." />
          <input type="submit" value="Search" className="searchButton"></input>
        </div>
        <div className="recipe-filter">
          <select className="filter" name="filter-meat" id="meat">
            {meats.map((meat, y) => {
              return (
                <option key={y} value={meat.value}>
                  {meat.title}
                </option>
              );
            })}
          </select>
          <select className="filter" name="filter-cuisine" id="meat">
            {cuisines.map((cuisine, y) => {
              return (
                <option key={y} value={cuisine.value}>
                  {cuisine.title}
                </option>
              );
            })}
          </select>
          <select className="filter" name="filter-leans" id="meat">
            {leans.map((lean, y) => {
              return (
                <option key={y} value={lean.value}>
                  {lean.title}
                </option>
              );
            })}
          </select>
          <select className="filter" name="filter-cookTimes" id="meat">
            {cookTimes.map((cookTime, y) => {
              return (
                <option key={y} value={cookTime.value}>
                  {cookTime.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="recipe-list">
          {data.recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe-item">
                <div className="recipe-image">
                  <img
                    src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                    alt=""
                  />
                </div>
                <div className="recipe-content">
                  <div className="recipe-title">
                    <Link to={`/recipes/${recipe.id}`}>
                      {recipe.recipe_name}
                    </Link>
                  </div>
                  <div className="recipe-protein">
                    <span className="recipe-subtitle">Protein: </span>
                    {recipe.protein}
                  </div>
                  <div className="recipe-cuisine">
                    <span className="recipe-subtitle">Cuisine: </span>
                    {recipe.cuisine}
                  </div>
                  <div className="recipe-time">
                    <span className="recipe-subtitle">Cook Time: </span>
                    {recipe.cook_time} Minutes
                  </div>
                  <div className={`recipe-lean-type ${recipe.lean_type}`}>
                    {recipe.lean_type}
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="recipe-item">
            <div className="recipe-image">
              <img
                src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                alt=""
              />
            </div>
            <div className="recipe-content">
              <div className="recipe-title">
                <Link to="lasagna">Chicken Lasagna</Link>
              </div>
              <div className="recipe-protein">
                <span className="recipe-subtitle">Protein: </span>Chicken
              </div>
              <div className="recipe-cuisine">
                <span className="recipe-subtitle">Cuisine: </span>Italian
              </div>
              <div className="recipe-time">
                <span className="recipe-subtitle">Cook Time: </span>30 Minutes
              </div>
              <div className="recipe-lean-type leaner">Leaner</div>
            </div>
          </div>
          <div className="recipe-item">
            <div className="recipe-image">
              <img
                src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                alt=""
              />
            </div>
            <div className="recipe-content">
              <div className="recipe-title">
                <Link to="lasagna">Chicken Lasagna</Link>
              </div>
              <div className="recipe-protein">
                <span className="recipe-subtitle">Protein: </span>Chicken
              </div>
              <div className="recipe-cuisine">
                <span className="recipe-subtitle">Cuisine: </span>Italian
              </div>
              <div className="recipe-time">
                <span className="recipe-subtitle">Cook Time: </span>30 Minutes
              </div>
              <div className="recipe-lean-type leaner">Leaner</div>
            </div>
          </div>
          <div className="recipe-item">
            <div className="recipe-image">
              <img
                src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                alt=""
              />
            </div>
            <div className="recipe-content">
              <div className="recipe-title">
                <Link to="lasagna">Chicken Lasagna</Link>
              </div>
              <div className="recipe-protein">
                <span className="recipe-subtitle">Protein: </span>Chicken
              </div>
              <div className="recipe-cuisine">
                <span className="recipe-subtitle">Cuisine: </span>Italian
              </div>
              <div className="recipe-time">
                <span className="recipe-subtitle">Cook Time: </span>30 Minutes
              </div>
              <div className="recipe-lean-type leaner">Leaner</div>
            </div>
          </div>
          <div className="recipe-item">
            <div className="recipe-image">
              <img
                src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                alt=""
              />
            </div>
            <div className="recipe-content">
              <div className="recipe-title">
                <Link to="lasagna">Chicken Lasagna</Link>
              </div>
              <div className="recipe-protein">
                <span className="recipe-subtitle">Protein: </span>Chicken
              </div>
              <div className="recipe-cuisine">
                <span className="recipe-subtitle">Cuisine: </span>Italian
              </div>
              <div className="recipe-time">
                <span className="recipe-subtitle">Cook Time: </span>30 Minutes
              </div>
              <div className="recipe-lean-type leaner">Leaner</div>
            </div>
          </div>
          <div className="recipe-item">
            <div className="recipe-image">
              <img
                src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
                alt=""
              />
            </div>
            <div className="recipe-content">
              <div className="recipe-title">
                <Link to="lasagna">Chicken Lasagna</Link>
              </div>
              <div className="recipe-protein">
                <span className="recipe-subtitle">Protein: </span>Chicken
              </div>
              <div className="recipe-cuisine">
                <span className="recipe-subtitle">Cuisine: </span>Italian
              </div>
              <div className="recipe-time">
                <span className="recipe-subtitle">Cook Time: </span>30 Minutes
              </div>
              <div className="recipe-lean-type leaner">Leaner</div>
            </div>
          </div>
          <div className="recipe-item">
            <div className="recipe-title">Chicken Lasagna</div>
            <div className="recipe-protein">Chicken</div>
            <div className="recipe-time">30 Minutes</div>
          </div>
          <div className="recipe-item">
            <div className="recipe-title">Chicken Lasagna</div>
            <div className="recipe-protein">Chicken</div>
            <div className="recipe-time">30 Minutes</div>
          </div>
          <div className="recipe-item">
            <div className="recipe-title">Chicken Lasagna</div>
            <div className="recipe-protein">Chicken</div>
            <div className="recipe-time">30 Minutes</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
