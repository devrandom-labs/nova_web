/** @format */
import { G, D, B, pipe } from '@mobily/ts-belt';
import { type Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    pipe(
      action.payload,
      G.isArray,
      B.ifElse(
        () => {
          toast((action.payload as string[])[0], {
            type: 'error',
          });
        },
        () => {
          toast(
            D.values(action.payload as Record<string, string>).join(' : '),
            {
              type: 'error',
            },
          );
        },
      ),
    );
  }
  return next(action);
};