import { Link, Outlet, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import NavbarDisplay from '~/components/navbar';
import type { LoaderUserData } from '~/types/types';

import navbarStyles from '~/styles/navbar.css';
import { getUser } from '~/utils/session.server';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: navbarStyles,
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
    <div className="page-nav">
      <NavbarDisplay />
      <div className="page-content chat">
        <Outlet />
      </div>
    </div>
  );
}
