import type { AppProps } from 'next/app'
import NavContextProvider from "@/context/NavContext"
import "@/styles/styles.sass"
import Layout from "@modules/layout/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NavContextProvider>
  )
}

export default MyApp
