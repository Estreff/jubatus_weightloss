import { Link, Outlet, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import NavbarDisplay from '~/components/navbar';
import type { LoaderUserData } from '~/types/types';

import Footer from '~/components/footer';

import navbarStyles from '~/styles/navbar.css';
import { getUser } from '~/utils/session.server';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: navbarStyles,
      title: 'navbar.css',
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data: LoaderUserData = {
    user,
  };
  return data;
};

export default function Recipes() {
  const data = useLoaderData<LoaderUserData>();

  return (
    <div>
      <div className="page-nav">
        <NavbarDisplay />
        <div className="page-content recipe">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
