"use client"
import './globals.css';
import StytchProvider from "../components/StytchProvider";

export default function RootLayout({ children }) {
  const stytchProps = {
    config: {
      products: ['emailMagicLinks'],
      emailMagicLinksOptions: {
        loginRedirectURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/authenticate`,
        loginExpirationMinutes: 30,
        signupRedirectURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/authenticate`,
        signupExpirationMinutes: 30,
        createUserAsPending: true,
      },
    },
    styles: {
      container: { width: '321px' },
      colors: { primary: '#0577CA' },
      fontFamily: '"Helvetica New", Helvetica, sans-serif',
    },
    callbacks: {
      onEvent: (message) => console.log(message),
      onSuccess: (message) => console.log(message),
      onError: (message) => console.log(message),
    },
  };

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <StytchProvider>
          {children}
          </StytchProvider>
      </body>
    </html>
  );
}
