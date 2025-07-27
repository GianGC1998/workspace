import { Request } from 'express';

export const fromCookies =
  (cookieKey: string) =>
  (req: Request): string => {
    let token = '';
    if (req && req.cookies) token = req.cookies[cookieKey];
    return token;
  };
