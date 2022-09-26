import Head from 'next/head'
import Image from 'next/image'
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Flor De Loto</title>
        <meta name="description" content="Flor De Loto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Nav />
    <Hero />

    <Footer />
    
      
    </div>
  )
}
