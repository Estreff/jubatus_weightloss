import { NavLink, Link, useLoaderData } from 'remix';
import { navItems } from '~/lists/navItems';
import { LoaderUserData } from '~/types/types';

export default function NavbarDisplay() {
  const data = useLoaderData<LoaderUserData>();

  const hiddenElement = (helperClass: string, data: LoaderUserData) => {
    if (data?.user?.id) {
      return `${helperClass}`;
    } else {
      return `${helperClass} hidden`;
    }
  };

  return (
    <div className="navbar">
      <div className="hamburger-menu">
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className={hiddenElement('profile', data)}>
        <img
          className="profile-image"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <div className="profile-name">Erik Streff</div>
        <div className="profile-location">Denver, CO</div>
        <Link to="/profile">
          <button className=" btn btn-success">View Profile</button>
        </Link>
      </div>

      {navItems.map((navItem) => {
        if (data.user) {
          return (
            <NavLink key={navItem.name} className="nav-item" to={navItem.link}>
              <i className={navItem.icon}></i>
              {navItem.name}
            </NavLink>
          );
        } else if (!data.user && !navItem.private) {
          return (
            <NavLink key={navItem.name} className="nav-item" to={navItem.link}>
              <i className={navItem.icon}></i>
              {navItem.name}
            </NavLink>
          );
        }
      })}
      <form
        className={hiddenElement('logout', data)}
        action="/logout"
        method="post"
      >
        <button className="btn btn-block btn-danger">
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </form>
    </div>
  );
}
