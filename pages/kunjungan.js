import Head from 'next/head'
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Detil from '../components/Detil';
import AddForm from '../components/AddForm';
import Delete from '../components/Delete';
import UpdateForm from '../components/Update';
import Footer from '../components/Footer'
import modeWeb from '../setting-website/modeWeb';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';
import jwt from 'jsonwebtoken'
import {Users} from '../database/schemaUsers'

import { useState,useEffect } from 'react';

// manipulation
import getAll from '../manipulation/getAll';
import search from '../manipulation/search';
import motivasiApi from '../manipulation/motivasiAPI';

const Kunjungan = ({user}) => {
    const [kunjungan,setKunjungan] = useState([])
    const [singleKunjungan,setSingleKunjungan] = useState([])
    const [quote,setquote] = useState({})

    useEffect(function(){
        getAll(setKunjungan,Cookies.get('token'))
        motivasiApi(Cookies.get('token')).then(q => setquote(q))
        const subNav = document.querySelector('.sub-nav')
        modeWeb(subNav,3)
    },[])

    useEffect(function(){
        if(Object.keys(quote).length){
            const layarAksi = document.querySelector('.layar-aksi')
            const quoteTampil = document.querySelector('.quote')
            const quoteItalic = quoteTampil.querySelector('i')
            const textAuthor = quoteTampil.querySelector('p')
            quoteItalic.textContent = `"${quote.eng}"`
            quoteItalic.nextElementSibling.textContent = `"${quote.indo}"`
            textAuthor.textContent = `"${quote.author}"`

            layarAksi.classList.remove('hidden')
            quoteTampil.classList.remove('-translate-y-[120%]')
            quoteTampil.classList.remove('opacity-0')
        }
    },[quote])

    const closequote = () => {
        const addForm = document.querySelector('.add-form')
        const layarAksi = document.querySelector('.layar-aksi')
        const quoteTampil = document.querySelector('.quote')
        const detilKunjungan = document.querySelector('.detil-kunjungan')
        const updateKunjungan = document.querySelector('.ubah-kunjungan')
        const deleteKunjungan = document.querySelector('.delete-kunjungan')
        
        if(addForm.classList.contains('hidden') && detilKunjungan.classList.contains('hidden')){
            if(updateKunjungan.classList.contains('hidden') && deleteKunjungan.classList.contains('hidden')){
                layarAksi.classList.add('hidden')
            }
        }

        quoteTampil.classList.add('-translate-y-[120%]')
        quoteTampil.classList.add('opacity-0')
    }

    const tambahKunjungan = () => {
        const layarAksi = document.querySelector('.layar-aksi')
        const addForm = document.querySelector('.add-form')
        const pemberitahuanError = addForm.querySelector('.err')
        const tombolTambah = addForm.querySelector('.tombol button')
        layarAksi.classList.remove('hidden')
        pemberitahuanError.textContent = ''
        addForm.classList.remove('hidden')
        tombolTambah.classList.remove('hidden')
        tombolTambah.nextElementSibling.classList.add('hidden')
        tombolTambah.nextElementSibling.nextElementSibling.textContent = "tidak"
    }

    const semua = async () => {
        try{
            await getAll(setKunjungan,Cookies.get('token'))
        }catch(err){
            console.log(err)
        }
    }

    const inputEnter = async (e) => {
        if(e.key === 'Enter'){
            if(e.target.value){
                try{
                    const {data} = await search(e.target.value,Cookies.get('token'))
                    e.target.setAttribute('placeholder','cari')
                    e.target.value = ''
                    setKunjungan(data,Cookies.get('token'))
                }catch(err){
                    e.target.setAttribute('placeholder',err.response.data.msg)
                    e.target.value = ''
                }
            }else{
                e.target.setAttribute('placeholder','mau cari apa?')
            }
        }
    }

    return <>
        <Head>
            <title>Beranda</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/gambar-utama.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
        </Head>
        <Navbar user={user} />
        <Detil singleKunjungan={singleKunjungan}/>
        <Delete singleKunjungan={singleKunjungan} setKunjungan={setKunjungan} />
        <AddForm setKunjungan={setKunjungan}/>
        <UpdateForm singleKunjungan={singleKunjungan} setKunjungan={setKunjungan} />
        <section className="layar-aksi hidden transition-all duration-300 ease-linear"></section>

        <section className='quote py-4 z-30 rounded -translate-y-[120%] opacity-0 transition-all duration-500 bg-white absolute top-0 sm:top-2 left-0 right-0 sm:mx-52 md:mx-72 lg:mx-[30rem] xl:mx-[38rem]'>
            <h1 className='text-lg sm:text-xl font-bold mb-4 ml-5'>Quote 😎🔥🔥🔥</h1>
            <hr className='border' />
            <section className='px-6 flex flex-col mt-3 text-sm sm:text-base'>
                <blockquote><i></i><i className='block mt-2'></i></blockquote>
                <p className='self-end mt-4 font-bold'></p>
                <button className='bg-biru py-1 px-4 rounded text-white self-start' onClick={closequote}>Tutup</button>
            </section>
        </section>

        <main className='overflow-hidden min-h-scree mt-16 pb-[7rem] dark:bg-biru-tua'>
            <section className='px-4 sm:px-7 pb-5 pt-10 flex flex-col items-center'>
                <section className='sm:p-5 flex justify-between w-full mt-3 mb-2 flex-wrap'>
                    <h1 className='text-xl sm:text-[1.8rem] font-bold dark:text-white'>Daftar Kunjungan</h1>
                    <section>
                        <button className='text-sm sm:text-base pt-1.5 pb-1.5 sm:pt-1 sm:pb-2 px-4 bg-biru hover:bg-biru-hover text-white rounded-lg mr-1 dark:bg-kuning-hitam dark:text-black dark:hover:bg-kuning-hitam-hover' onClick={semua}>Semua</button>
                        <button className='text-sm sm:text-base pt-1.5 pb-1.5 sm:pt-1 sm:pb-2 px-4 bg-biru hover:bg-biru-hover text-white rounded-lg ml-1  dark:bg-kuning-hitam dark:text-black dark:hover:bg-kuning-hitam-hover' onClick={tambahKunjungan}>Tambah</button>
                    </section>
                </section>
                <section className='w-full sm:w-2/3 relative'>
                    <i className="fa-solid fa-magnifying-glass absolute top-[2.7rem] left-4 text-xl"></i>
                    <input type="text" placeholder='cari'  className=' w-full h-12 mt-8 rounded-3xl pl-14 shadow-cari outline-none focus:shadow-cari-fokus' onKeyDown={inputEnter}/>
                </section>
            </section>
            <section className='container my-10 mx-auto px-5 py-6 md:py-10 flex justify-around items-center flex-wrap'>
                {
                    kunjungan.map(orang => {
                    return (
                        <Card key={orang.kunjungan._id.toString()} orang={orang} setSingleKunjungan={setSingleKunjungan}/>
                    )
                    })
                }
            </section>

            <section className='h-64'></section>
        </main>
        <Footer />
    </>
}
 
export default Kunjungan;



export async function getServerSideProps(context){
    
    const {token} = cookies(context)

    if(!token){
        return {
            redirect : {
                permanent : false,
                destination : '/auth/login'
            }
        }
    }

    let user = {}
    try{
        const {id} = jwt.verify(token,process.env.SECRET_LOGIN)
        const ambilUser = await Users.findOne({_id : id})
        if(!ambilUser){
            context.res.setHeader(
                "Set-Cookie",[
                    "token=deleted; Max-Age=0"
                ]
            )
            return {
                redirect : {
                    permanent : false,
                    destination : '/auth/login'
                }
            }
        }

        user.nama = ambilUser.nama
        user.email = ambilUser.email

    }catch(err){
        context.res.setHeader(
            "Set-Cookie",[
                "token=deleted; Max-Age=0"
            ]
        )
        return {
            redirect : {
                permanent : false,
                destination : '/auth/login'
            }
        }
    }
    
    return {props : {user}}
}