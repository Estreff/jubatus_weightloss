import { Outlet } from 'remix';
import NavbarDisplay from '~/components/navbar';
import navbarStyles from '~/styles/navbar.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: navbarStyles,
    },
  ];
}

export default function Profile() {
  return (
    <div className="page-nav">
      <NavbarDisplay />
      <div className="page-content profile-page">
        <Outlet />
      </div>
    </div>
  );
}
