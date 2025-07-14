import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import App from './App.tsx'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './state';

const ProtectedRoute = withAuthenticationRequired(App, {
    onRedirecting: () => <div>Loading...</div>,
});


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <Provider store={store}>
                <PersistGate loading={'loading...'} persistor={persistStore(store)}>
                    <ProtectedRoute />
                </PersistGate>
            </Provider>
        </Auth0Provider>
    </StrictMode>
)