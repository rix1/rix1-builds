/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '../globals.css';

function AppRoot({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default AppRoot;
