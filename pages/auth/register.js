import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router';

import Particle from '../../components/Particle';
import AlertAuth from '../../components/AlertAuth';
import authRedirect from '../../funcAuth/authRedirect';

import { useEffect,useState } from 'react';
import {authRegister} from '../../manipulation/auth/authentication'
import { checkStrength } from '@password-generator/check-strength';
import FontAwesome from 'react-fontawesome';

const Register = () => {
    const [nama,setNama] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [modeWeb,setModeWeb] = useState('#5B67F1')

    useEffect(() => {
       const mode = localStorage.getItem('webMode')
       const html = document.querySelector('html')

       if(mode === 'dark'){
        html.classList.add('dark')
        setModeWeb('#00163B')
       }

    },[])

    useEffect(function(){
        const statusPassword = document.querySelector('.menu-register .register .status-password')
        const statusPassIndo = {
            'Very Weak' : "Sangat Lemah",
            "Weak" : "Lemah",
            "Average" : "Sedang",
            'Strong' : "Kuat",
            "Very Strong" : "Sangat Kuat",
            "Secure" : "Aman",
            "Very Secure" : "Sangat Aman"
        }

        if(password){
            statusPassword.textContent = `🔒 ${statusPassIndo[checkStrength(password).range]}`
        }else{
            statusPassword.textContent = '🔒'
        }


    },[password])

    const register = async (e) => {
        e.preventDefault()
        const layarAksiRegister = document.querySelector('.menu-register .layar-aksi-register')
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')

        try{
           const {data} = await authRegister({nama,email,password})
           iconPemberitahuan.classList.remove('text-sal')
           iconPemberitahuan.classList.remove('fa-circle-xmark')
           iconPemberitahuan.classList.add('fa-circle-check')
           iconPemberitahuan.classList.add('text-biru')
           iconPemberitahuan.nextElementSibling.textContent = data.msg

           layarAksiRegister.classList.remove('hidden')
           layarAksiRegister.classList.remove('cursor-pointer')
           pemberitahuan.classList.remove('opacity-0')
           pemberitahuan.classList.remove('-translate-y-full')

           setNama('')
           setEmail('')
           setPassword('')

           setTimeout(function(){
                Router.push('/auth/login')
           },1700)

        }catch({response}){
            iconPemberitahuan.classList.add('fa-circle-xmark')
            iconPemberitahuan.classList.add('text-sal')
            iconPemberitahuan.nextElementSibling.textContent = response.data.msg

            layarAksiRegister.classList.remove('hidden')
            layarAksiRegister.classList.add('cursor-pointer')
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.remove('-translate-y-full')
        }

    }

    const iconMata = (e) => {

        if(e.target.classList.contains('fa-eye')){
            e.target.previousElementSibling.setAttribute('type','text')
            e.target.classList.remove('fa-eye')
            e.target.classList.add('fa-eye-slash')
        }else if('fa-eye-slash'){
            e.target.classList.remove('fa-eye-slash')
            e.target.previousElementSibling.setAttribute('type','password')
            e.target.classList.add('fa-eye')
        }
    }

    const closeErrPemberitahuan = (e) => {
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
        const layarAksiRegister = document.querySelector('.layar-aksi-register')

        if(iconPemberitahuan.classList.contains('fa-circle-xmark')){
            if(e.target.classList.contains('layar-aksi-register')){
                pemberitahuan.classList.add('-translate-y-full')
                layarAksiRegister.classList.add('hidden')

            }
        }
    }

    return <>
    <Head>
        <meta name="description" content="simpan kunjungan anda" />
        <link rel="icon" href="/gambar-utama.png" />
        <title>register</title>
    </Head>
    <Particle bgColor={modeWeb} />
    <AlertAuth />
        <section className="menu-register p-5 absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center ">
            <section className="layar-aksi-register hidden transition-all duration-300 ease-linear" onClick={closeErrPemberitahuan}></section>
            <form className="register opacity-0 animate-authMuncul py-6 px-6 sm:px-10 bg-white rounded-md text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={register}>
                <h1 className="sm:text-2xl mb-6 text-center">Buat akun anda</h1>
                <section className='h-40 flex flex-col justify-between'>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="nama" className='text-base sm:text-xl'>Nama <p className="mr-1 ml-9 sm:mr-4 inline-block">:</p></label>
                        <input type="text" placeholder="nama" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-sm py-1 sm:py-0 sm:text-lg dark:bg-transparent" id="nama" autoComplete='off' required autoFocus defaultValue={nama} onChange={e => setNama(e.target.value)}/>
                    </section>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="email" className='text-base sm:text-xl'>Email <p className="ml-10 mr-2 inline-block">:</p></label>
                        <input type="email" placeholder="email" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-sm py-1 sm:py-0 sm:text-lg dark:bg-transparent" id="email" required defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </section>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="password" className='flex text-base sm:text-xl'>Password <p className="ml-3 mr-3 sm:mr-5 inline-block">:</p></label>
                        <section className='w-full flex justify-between items-center border dark:border-abu-trans'>
                            <input type="password" placeholder="min 5 karakter" className="w-[85%] block pl-2 outline-none rounded-sm text-sm py-1 sm:py-0 sm:text-lg dark:bg-transparent" id="password" required defaultValue={password} onChange={e => setPassword(e.target.value)}/>
                            <FontAwesome className="fa-solid fa-eye text-lg sm:text-xl text-gray-400 mr-2 cursor-pointer" name='' onClick={iconMata}></FontAwesome>
                        </section>
                    </section>
                    <p className='ml-32 status-password text-[0.785rem] sm:text-sm'></p>
                </section>
                <button className="py-1.5 sm:py-2 w-full bg-biru rounded hover:bg-biru-hover dark:bg-biru-tua dark:hover:bg-biru-hover text-white mt-6 mb-2 text-lg" type="submit">buat akun</button>
                <Link href={'/auth/login'}><a className='text-[0.785rem] sm:text-sm'>Kembali ke Login</a></Link>
            </form>
        </section>
    </> 
}
 
export default Register;

export function getServerSideProps(context){
    return authRedirect(context)
}