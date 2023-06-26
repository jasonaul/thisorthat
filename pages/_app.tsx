import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
// import Modal from '@/components/Modal'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <RegisterModal />
    <LoginModal />
    {/* <Modal actionLabel="Ask the Community!" isOpen title="Test Modal" /> */}
    <Layout>
  <Component {...pageProps} />
  </Layout>
    </>
  )
}
