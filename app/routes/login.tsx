import {
  Form,
  Link,
  json,
  useActionData,
  useSearchParams,
  useLoaderData,
} from 'remix';
import { validateEmail, validatePassword } from '~/helperFunctions/helpers';
import type { ActionFunction, LoaderFunction, MetaFunction } from 'remix';
import type { ActionData, LoaderUserData } from '~/types/types';
import loginStyles from '~/styles/login.css';
import {
  createUserSession,
  login,
  checkUserForLogin,
} from '~/utils/session.server';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: loginStyles,
      title: 'login.css',
    },
  ];
}

export const meta: MetaFunction = () => {
  return {
    title: 'Weight Loss | Login',
    description: 'Login for a great Weight Loss experience',
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await checkUserForLogin(request);
  if (!userId) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return {};
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email')?.toString().toLowerCase();
  const password = form.get('password');
  const redirectTo = form.get('redirectTo') || '/weight';

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password, 'login'),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const user = await login({ email, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Username / Password combination is incorrect`,
    });
  }

  return createUserSession(user.id, redirectTo);
};

export default function Login() {
  const data = useLoaderData<LoaderUserData>();
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className="login-page">
      <div className="page-content">
        <div className="login-side">
          <h1>Login to Your Account</h1>
          <div className="social-login">
            <div className="social-title">Login using Social</div>
            <div className="social-buttons">
              <div className="facebook-circle">
                <i className="fab fa-facebook-f fa-2x"></i>
              </div>
              <div className="google-circle">
                <i className="fab fa-google fa-2x"></i>
              </div>
            </div>
          </div>
          <div className="or-title">
            <span>OR</span>
          </div>
          <div className="email-login">
            <Form
              className="login-form"
              method="post"
              aria-errormessage={
                actionData?.formError ? 'form-error-message' : undefined
              }
            >
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get('redirectTo') ?? undefined}
              />
              <div className="input-container">
                <input
                  name="email"
                  id="email-input"
                  className="login"
                  type="text"
                  placeholder="Email"
                  defaultValue={actionData?.fields?.email}
                  aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                  aria-errormessage={
                    actionData?.fieldErrors?.email ? `email-error` : undefined
                  }
                />
                {actionData?.fieldErrors?.email ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="email-error"
                    >
                      {actionData.fieldErrors.email}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="input-container">
                <input
                  name="password"
                  id="password-input"
                  className="login"
                  type="password"
                  placeholder="Password"
                  defaultValue={actionData?.fields?.password}
                  aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                  aria-errormessage={
                    actionData?.fieldErrors?.password
                      ? `password-error`
                      : undefined
                  }
                />
                {/* <i className="fa-solid fa-eye show-password"></i> */}
                {actionData?.fieldErrors?.password ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="password-error"
                    >
                      {actionData.fieldErrors.password}
                    </p>
                  </div>
                ) : null}
              </div>
              <div id="form-error-message">
                {actionData?.formError ? (
                  <p className="form-validation-error" role="alert">
                    {actionData.formError}
                  </p>
                ) : null}
              </div>
              <button className="btn btn-primary btn-home" type="submit">
                Login
              </button>
            </Form>
          </div>
        </div>
        <div className="register-side">
          <Link to="/" className="home-link">
            <i className="fa-solid fa-house"></i>
          </Link>
          <h2 className="register-title">New Here?</h2>
          <p className="register-description">
            Sign Up to help track weight and food that will help
          </p>
          <Link
            className="btn btn-primary btn-home btn-register"
            to="/register"
          >
            Register{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}
