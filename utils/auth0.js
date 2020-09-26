// ENVIRONMENT VARIABLES are loaded in the server side.
import { initAuth0 } from "@auth0/nextjs-auth0";

// I assigned to a constant so i could use this in other functions inside the module
const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "openid profile",
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTHO_POST_LOGOUT_REDIRECT_URI,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    cookieDomain: "your-domain.com",
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    cookieSameSite: "lax",
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});
export default auth0;

export const isAuthorized = (user, role) => {
  return user && user[process.env.AUTH0_NAMESPACE + "/roles"].includes(role);
};

export const authorizeUser = async (req, res) => {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/v1/login",
    });
    res.end();
    return null;
  }

  return session.user;
};

// we are passing a function
export const withAuth = (getData) => (role) => async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (
    !session ||
    !session.user ||
    (role && !isAuthorized(session.user, role))
  ) {
    res.writeHead(302, {
      Location: "/api/v1/login",
    });
    res.end();
    return { props: {} };
  }
  // we are executing the function that passed
  const data = getData ? await getData({ req, res }, session.user) : {};

  return { props: { user: session.user, ...data } };
};
