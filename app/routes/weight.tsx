import { Link, Outlet, useCatch, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import NavbarDisplay from '~/components/navbar';
import type { LoaderUserData } from '~/types/types';

import { getUser } from '~/utils/session.server';

import Footer from '~/components/footer';

import navbarStyles from '~/styles/navbar.css';
import weightStyles from '~/styles/weight.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: navbarStyles,
    },
    { rel: 'stylesheet', href: weightStyles },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user?.id) {
    throw new Response('Unauthorized', { status: 401 });
  }
  const data: LoaderUserData = {
    user,
  };
  return data;
};

export default function Weight() {
  const data = useLoaderData<LoaderUserData>();
  console.log('Weight Data: ', data);

  return (
    <div className="page-nav">
      <NavbarDisplay />
      <div className="page-content weight">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <div className="error-container">
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
