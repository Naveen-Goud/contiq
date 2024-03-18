import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const clientId: string = process.env.AUTH0_CLIENT_ID!;
const domain: string = process.env.AUTH0_DOMAIN!;
root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: 'https://fr-bc114.bootcamp64.tk/home'
        }}
    >
        <App />
    </Auth0Provider>
);
