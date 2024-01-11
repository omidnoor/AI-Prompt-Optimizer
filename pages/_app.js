import Head from "next/head";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Outfit } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/arya-green/theme.css";
// import "primereact/resources/themes/vela-green/theme.css";
import "primereact/resources/themes/saga-green/theme.css";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
// import "@/app/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/samantha.jpg" />
      </Head>
      <main className={`${outfit.variable} font-body`}>
        <PrimeReactProvider>
          <Component {...pageProps} />
        </PrimeReactProvider>
      </main>
    </UserProvider>
  );
}

export default App;
