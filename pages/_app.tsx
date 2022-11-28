import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../store';
import Head from 'next/head';

function getLibrary(provider: any, connector: any) {
  return new Web3Provider(provider);
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='logo-final.svg' />
        <title>merch-store | ultibets</title>
      </Head>

      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer position='top-center' />
            </Layout>
          </ChakraProvider>
        </Web3ReactProvider>
      </Provider>
    </>
  );
}

export default MyApp;
