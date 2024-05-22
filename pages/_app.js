// import {liff} from "@line/liff";
import { redirect } from "next/dist/server/api-utils";
import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error

    import("@line/liff").then((liff) => {
      console.log("LIFF init...");
      liff.liff
      
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(async () => {
          const idToken = liff.liff.getIDToken();
          console.log("gg_",idToken); // print raw idToken object
          console.log("LIFF init succeeded.");
          setLiffObject(liff);

          if (!liff.liff.isLoggedIn() && !liff.liff.isInClient()) {
            liff.liff.login({ redirectUri: "https://late-news-grin.loca.lt/" });
            console.log('penk_gg1',await liff.liff.getProfile());
            console.log('penk_gg1',await liff.liff.getAccessToken());
            // window.alert('To get an access token, you need to be logged in. Tap the "login" button below and try again.');
          } else {
            console.log('penk_gg2_getIDToken',await liff.liff.getIDToken());
            console.log('penk_gg2_getAccessToken',await liff.liff.getAccessToken());
            console.log('penk_gg2_getProfile',await liff.liff.getProfile());
            console.log('penk_gg2_getFriendship',await liff.liff.getFriendship());
            console.log('penk_gg2_getAId',await liff.liff.getAId());
            console.log('penk_gg2_decode',await liff.liff.getDecodedIDToken());
            window.alert(liff.liff.getIDToken())
            const accessToken = liff.getAccessToken();
            console.log(accessToken);
          }
        })
        
        .catch((error) => {
          console.log("LIFF init failed.");
          setLiffError(error.toString());
        });
    });
  }, []);

//   useEffect(() => {
//     // get access token
// if (!liff.isLoggedIn() && !liff.isInClient()) {
//   window.alert('To get an access token, you need to be logged in. Tap the "login" button below and try again.');
// } else {
//   const accessToken = liff.getAccessToken();
//   console.log(accessToken);
// }
  
//   }, [])
  

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
