import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-g0hc2sart3im3jzd.us.auth0.com';
  const clientId = '1PBugUJGIiuClEW3ohRJQ357hKHNs4kT';
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;