import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
  json,
} from 'remix';
import {
  validateEmail,
  validatePassword,
  validateMatchingPasswords,
} from '~/helperFunctions/helpers';
import type { MetaFunction, ActionFunction, LoaderFunction } from 'remix';
import type { ActionData, LoaderUserData } from '~/types/types';
import registerStyles from '~/styles/register.css';

import { db } from '~/utils/db.server';
import {
  createUserSession,
  register,
  checkUserForLogin,
} from '~/utils/session.server';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: registerStyles,
      title: 'login.css',
    },
  ];
}

export const meta: MetaFunction = () => {
  return {
    title: 'Weight Loss | Register',
    description: 'Register for a great Weight Loss experience',
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
  const confirmPassword = form.get('confirmPassword');
  const redirectTo = form.get('redirectTo') || '/weight';

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    });
  }

  const fields = { email, password, confirmPassword };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password, 'register'),
    confirmPassword: validateMatchingPasswords(password, confirmPassword),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const userExists = await db.user.findFirst({ where: { email } });
  if (userExists) {
    return badRequest({
      fields,
      formError: `User with email ${email} already exists`,
    });
  }
  const user = await register({ email, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }
  return createUserSession(user.id, redirectTo);
};

export default function Register() {
  const data = useLoaderData<LoaderUserData>();
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className="register-page">
      <div className="page-content">
        <div className="login-side">
          <Link to="/" className="home-link">
            <i className="fa-solid fa-house"></i>
          </Link>
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-description">
            To stay in touch with other people on a similar journey, jump back
            in and get connected.
          </p>
          <Link className="btn btn-success btn-home btn-login" to="/login">
            Login{' '}
          </Link>
        </div>
        <div className="register-side">
          <h1>Create Account</h1>
          <div className="social-login">
            <div className="social-title">Create with Social</div>
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
                  className="register"
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
                  className="register"
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
              <div className="input-container">
                <input
                  name="confirmPassword"
                  id="confirmPassword-input"
                  className="register"
                  type="password"
                  placeholder="Verify Password"
                  defaultValue={actionData?.fields?.confirmPassword}
                  aria-invalid={Boolean(
                    actionData?.fieldErrors?.confirmPassword
                  )}
                  aria-errormessage={
                    actionData?.fieldErrors?.confirmPassword
                      ? `confirmPassword-error`
                      : undefined
                  }
                />
                {/* <i className="fa-solid fa-eye show-password"></i> */}
                {actionData?.fieldErrors?.confirmPassword ? (
                  <div className="validation-container">
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="confirmPassword-error"
                    >
                      {actionData.fieldErrors.confirmPassword}
                    </p>
                  </div>
                ) : null}
              </div>
              <div id="form-error-message">
                {actionData?.formError ? (
                  <div className="validation-container">
                    <p className="form-validation-error" role="alert">
                      {actionData.formError}
                    </p>
                  </div>
                ) : null}
              </div>
              <button className="btn btn-primary btn-home" type="submit">
                Create Account
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
