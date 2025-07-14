import * as React from 'react';
import NovaThemeProvider from '@/theme';
import {
  RouterProvider,
} from "react-router";
import router from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectColorMode, useNovaSelector } from './state';

const App: React.FC = () => {
  const mode = useNovaSelector(selectColorMode);
  return (
    <NovaThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer
        {...{
          autoClose: 30000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: mode,
        }}
      />
    </NovaThemeProvider>
  );
};

export default App;
