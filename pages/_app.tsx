import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import Modal from '@/components/Modal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* <Modal actionLabel="Ask the Community!" isOpen title="Test Modal" /> */}
    <Layout>
  <Component {...pageProps} />
  </Layout>
    </>
  )
}
