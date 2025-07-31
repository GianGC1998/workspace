import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import './i18n';
import { MessageProvider } from './context/message';

const router = createRouter({ routeTree });

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </StrictMode>
);
