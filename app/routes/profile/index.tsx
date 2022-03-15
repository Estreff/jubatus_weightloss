import { Link, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';

import { db } from '~/utils/db.server';
import { getUser, requireUserId } from '~/utils/session.server';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  const data: LoaderData = {
    user,
  };

  return data;
};

export default function ProfileRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Profile Page</h1>
      <Link className="btn btn-warning" to={`edit/${data.user?.id}`}>
        Edit Profile
      </Link>
    </div>
  );
}
