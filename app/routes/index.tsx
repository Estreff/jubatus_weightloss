import { Link } from 'remix';
import Footer from '~/components/footer';
import homePageStyles from '~/styles/home.css';
import { navItems } from '~/lists/navItems';
import recipeImage from '~/images/recipe.jpg';
import restaurantImage from '~/images/restaurant.jpg';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: homePageStyles,
      title: 'home.css',
    },
  ];
}

export default function Index() {
  return (
    <div className="page-container-full">
      <div className="home-page">
        <div className="home-content">
          <div className="top-nav">
            <Link
              className="btn btn-secondary btn-w100 btn-rounded"
              to="register"
            >
              Register{' '}
            </Link>
            <Link className="btn btn-primary btn-w100 btn-rounded" to="login">
              Login{' '}
            </Link>
          </div>
          <div className="intro">
            <h1>Remix Weightloss</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est,
              voluptatum. Beatae necessitatibus veniam, porro placeat commodi,
              optio sit tempore doloremque dolorem illo eaque sunt explicabo.
              Voluptatem nobis excepturi dolorem quod.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates laboriosam voluptas nesciunt corporis deleniti odit
              nemo, ullam quo unde ab perspiciatis illo, possimus non. Est,
              porro dignissimos! Corrupti, doloribus possimus.
            </p>
          </div>
          <div className="free-info">
            <div className="recipes">
              <div className="link-description">
                Learn about recipes that you can make on plan
              </div>
              <div className="recipe-image">
                <img src={recipeImage} alt="" />
              </div>
              <Link
                className="link-button btn btn-support-dark btn-w250 btn-rounded"
                to="recipes"
              >
                Recipes{' '}
              </Link>
            </div>
            <div className="restaurants">
              <div className="link-description">
                Learn about what you can eat from a list of restaurants
              </div>
              <div className="restaurant-image">
                <img src={restaurantImage} alt="" />
              </div>

              <Link
                className="link-button btn btn-support-dark btn-w250 btn-rounded"
                to="restaurants"
              >
                Restaurants{' '}
              </Link>
            </div>
          </div>
          <div className="features">
            <div className="features-title"></div>
            <div className="features-details">
              {navItems.map((navItem) => {
                if (navItem.homepage)
                  return (
                    <div key={navItem.link} className="feature">
                      <i className={navItem.icon}></i>
                      <div className="feature-title">{navItem.name}</div>
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="feature-descriptions">
            {navItems.map((navItem) => {
              if (navItem.homepage)
                return (
                  <div className={`feature-description ${navItem.bgColor}`}>
                    <div className="feature-icon">
                      <i className={navItem.icon}></i>
                    </div>
                    <div className="feature-details">
                      <div className="feature-deatils-title">
                        {navItem.name}
                      </div>
                      <p>{navItem.description}</p>
                    </div>
                  </div>
                );
            })}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
