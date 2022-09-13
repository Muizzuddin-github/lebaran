import Head from 'next/head'
import Image from 'next/image'
import MainNavbar from '../components/MainNavbar'
import Link from "next/link"
import Footer from '../components/Footer'
import modeWeb from '../setting-website/modeWeb'
import authRedirect from '../funcAuth/authRedirect'
import { useEffect } from 'react'

export default function Home() {

  useEffect(function(){
    const html = document.querySelector('html')
    html.classList.add('scroll-smooth')
    
    const nav = document.querySelector('.main-nav')
    modeWeb(nav,2)
  },[])

  return <>
      <Head>
          <title>Beranda</title>
          <meta name="description" content="simpan kunjungan anda" />
          <link rel="icon" href="/gambar-utama.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
      </Head>
      <MainNavbar />
      <header className='bg-biru p-5 h-screen flex flex-col items-center dark:bg-biru-dark'>
        
        <figure className='mt-20 sm:mt-5'>
            <Image src={"/gambar-utama.png"} width="420px" height="420px" objectFit="contain" title='mohon maaf lahir dan batin' alt='gambar-lebaran'></Image>
        </figure>

        <section className='max-w-xl text-white text-center  mt-6 sm:mt-4'>
          <h1 className='text-3xl mb-1'>Idul Fitri Center</h1>
          <p className='text-lg sm:text-xl leading-6'>Idul Fitri Center adalah sebuah layanan untuk menyimpan daftar kunjungan anda selama hari raya idul fitri</p>
          <Link href={"/auth/login"}><a className='inline-block mt-10 bg-white py-2 px-3 rounded-md font-bold text-black hover:bg-slate-200'>Ayo Mulai</a></Link>
        </section>
      </header>
      <main className='dark:bg-biru-dark pt-14 dark:text-white pb-28'>
        <article className='max-w-xl p-2 text-center m-auto'>
            <h2 className='text-lg sm:text-xl font-bold mb-2'>About</h2>
            <p className='leading-6'>kami menyediakan layanan untuk menyimpan daftar kunjungan anda, idul fitri center memberikan 3 fitur utama </p>
          </article>

          <section className='container flex justify-around mt-5 flex-wrap m-auto'>
            <figure className='max-w-sm flex justify-center items-center flex-col hover:scale-105 transition-all ease-linear'>
              <Image src={'/keluarga.png'} width="220px" height={"220px"}  objectFit="contain" alt='gambar-keluarga'></Image>
              <figcaption className='text-center'>rayakan idul fitri anda dengan penuh warna dan kebahagiaan keluarga</figcaption>
            </figure>

            <figure className='max-w-sm flex justify-center items-center flex-col hover:scale-105 transition-all ease-linear'>
              <Image src={'/input.png'} width="220px" height={"220px"}  objectFit="contain" alt='flet database input'></Image>
              <figcaption className='text-center'>anda dapat menambah,mengubah,menghapus data kunjungan anda</figcaption>
            </figure>
            
            <figure className='max-w-sm flex justify-center items-center flex-col hover:scale-105 transition-all ease-linear'>
              <Image src={'/menyimpan.png'} width="220px" height={"220px"}  objectFit="contain" alt='flet database save'></Image>
              <figcaption className='-mt-5 text-center'>anda dapat menyimpan kunjungan anda tanpa khawatir akan terhapus</figcaption>
            </figure>
          </section>
      </main>

      <Footer />
  </>
}


export function getServerSideProps(context){
  return authRedirect(context)
}