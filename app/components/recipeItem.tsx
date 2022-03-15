import { Link } from 'remix';
import { Recipe } from '@prisma/client';

export function RecipeDisplay({
  recipe,
  isOwner,
}: {
  recipe: Pick<
    Recipe,
    | 'id'
    | 'recipe_name'
    | 'protein'
    | 'cuisine'
    | 'cook_time'
    | 'lean_type'
    | 'servings'
  >;
  isOwner: boolean;
}) {
  return (
    <div className="recipe-item">
      <div className="recipe-image">
        <img
          src="https://scontent.fapa1-2.fna.fbcdn.net/v/t39.30808-6/272961923_2417288235074844_5403851021271972158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=fVq5Dvw-q8UAX82chDn&_nc_ht=scontent.fapa1-2.fna&oh=00_AT9DM0899aGgiiiSgDpQip8_piQdW-UZ-KlPysF6vW4XqA&oe=622C25E7"
          alt=""
        />
      </div>
      <div className="recipe-content">
        <div className="recipe-title">
          <Link to="lasagna">{recipe.recipe_name}</Link>
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
        <div className="recipe-lean-type leaner">{recipe.lean_type}</div>
      </div>
    </div>
  );
}
