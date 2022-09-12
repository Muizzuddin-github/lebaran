import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router';
import FontAwesome from 'react-fontawesome';
import AlertAuth from '../../components/AlertAuth'
import Cookies from 'js-cookie';
import Particle from '../../components/Particle';
import {authLogin} from '../../manipulation/auth/authentication'
import { useEffect,useState } from 'react';
import authRedirect from '../../funcAuth/authRedirect';
import forgotPassword from '../../manipulation/forgotPassword';

const Login = () => {
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


    const login = async (e) => {
        e.preventDefault()
        const layarAksiLogin = document.querySelector('.menu-login .layar-aksi-login')
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')

        try{
            iconPemberitahuan.classList.remove('text-sal')
            iconPemberitahuan.classList.remove('fa-circle-xmark')
            iconPemberitahuan.classList.remove('fa-circle-check')
            iconPemberitahuan.classList.remove('fa-envelope-circle-check')
            iconPemberitahuan.classList.add('fa-rotate')
            iconPemberitahuan.classList.add('animate-iconBerputar')
            
            iconPemberitahuan.classList.add('text-biru')
            iconPemberitahuan.nextElementSibling.textContent = 'Tunggu sebentar'
            
            layarAksiLogin.classList.remove('hidden')
            layarAksiLogin.classList.remove('cursor-pointer')
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.remove('-translate-y-full')
            const {data} = await authLogin({email,password})

            setTimeout(function(){
                iconPemberitahuan.classList.remove('fa-rotate')
                iconPemberitahuan.classList.remove('animate-iconBerputar')
                iconPemberitahuan.classList.add('fa-envelope-circle-check')
                iconPemberitahuan.nextElementSibling.textContent = data.msg
            },1000)

            Cookies.set('token',data.token,{expires : 1})
            setEmail('')
            setPassword('')

            setTimeout(function(){
                Router.push('/kunjungan')
            },1700)
           

        }catch({response}){
            layarAksiLogin.classList.remove('cursor-pointer')
            setTimeout(function(){
                iconPemberitahuan.classList.remove('fa-rotate')
                iconPemberitahuan.classList.remove('animate-iconBerputar')
                iconPemberitahuan.classList.remove('text-biru')
                iconPemberitahuan.classList.add('fa-circle-xmark')
                iconPemberitahuan.classList.add('text-sal')
                iconPemberitahuan.nextElementSibling.textContent = response.data.msg
    
                layarAksiLogin.classList.remove('hidden')
                layarAksiLogin.classList.add('cursor-pointer')
                pemberitahuan.classList.remove('opacity-0')
                pemberitahuan.classList.remove('-translate-y-full')
            },1500)
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

    const closeErrPemberitahuanLogin = (e) => {
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
        const layarAksiLogin = document.querySelector('.layar-aksi-login')

        if(e.target.classList.contains('layar-aksi-login')){
            if(iconPemberitahuan.classList.contains('fa-circle-xmark')){
                pemberitahuan.classList.add('-translate-y-full')
                layarAksiLogin.classList.add('hidden')
            }

        }


    }

    const lupaPassword = async () => {
        const layarAksiLogin = document.querySelector('.menu-login .layar-aksi-login')
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')

        try{
            iconPemberitahuan.classList.remove('text-sal')
            iconPemberitahuan.classList.remove('fa-circle-xmark')
            iconPemberitahuan.classList.remove('fa-circle-check')
            iconPemberitahuan.classList.remove('fa-envelope-circle-check')
            iconPemberitahuan.classList.add('fa-rotate')
            iconPemberitahuan.classList.add('animate-iconBerputar')
            
            iconPemberitahuan.classList.add('text-biru')
            iconPemberitahuan.nextElementSibling.textContent = 'Tunggu sebentar'
            
            layarAksiLogin.classList.remove('hidden')
            layarAksiLogin.classList.remove('cursor-pointer')
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.remove('-translate-y-full')

            const {data} = await forgotPassword({email})

            layarAksiLogin.classList.add('cursor-pointer')
            iconPemberitahuan.classList.remove('fa-rotate')
            iconPemberitahuan.classList.remove('animate-iconBerputar')
            iconPemberitahuan.classList.add('fa-envelope-circle-check')
            iconPemberitahuan.nextElementSibling.textContent = data.msg


        }catch({response}){
            layarAksiLogin.classList.remove('cursor-pointer')
            setTimeout(function(){
                iconPemberitahuan.classList.remove('fa-rotate')
                iconPemberitahuan.classList.remove('animate-iconBerputar')
                iconPemberitahuan.classList.remove('text-biru')
                iconPemberitahuan.classList.add('fa-circle-xmark')
                iconPemberitahuan.classList.add('text-sal')
                iconPemberitahuan.nextElementSibling.textContent = response.data.msg
    
                layarAksiLogin.classList.remove('hidden')
                layarAksiLogin.classList.add('cursor-pointer')
                pemberitahuan.classList.remove('opacity-0')
                pemberitahuan.classList.remove('-translate-y-full')
            },1500)
        }
    }


    return <>
    <Head>
        <meta name="description" content="Login" />
        <link rel="icon" href="/gambar-utama.png" />
        <title>Login</title>
    </Head>
    <Particle bgColor={modeWeb} />
    <AlertAuth />
        <section className="menu-login p-5 absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center ">
            <section className="layar-aksi-login hidden transition-all duration-300 ease-linear cursor-pointer" onClick={closeErrPemberitahuanLogin}></section>
            <form className="login opacity-0 animate-authMuncul py-6 px-10 relative bg-white rounded-md text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={login}>
                <FontAwesome className='fa-solid fa-circle-user block text-center text-[5.5rem] mb-3 absolute -top-12 left-[50%] -ml-9' name='' />
                <h1 className="text-2xl mb-6 text-center mt-8">Silahkan Login</h1>
                <section className='h-24 flex flex-col justify-between'>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="email">Email <p className="ml-10 mr-2 inline-block">:</p></label>
                        <input type="email" placeholder="email" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent" id="email" required defaultValue={email} onChange={e => setEmail(e.target.value)} />
                    </section>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="password" className='flex'>Password <p className="ml-3 mr-5 inline-block">:</p></label>
                        <section className='w-full flex justify-between items-center border dark:border-abu-trans'>
                            <input type="password" placeholder="password" className="w-[85%] block pl-2 outline-none rounded-sm text-lg dark:bg-transparent" id="password" required defaultValue={password} onChange={e => setPassword(e.target.value)}/>
                            <i className="fa-solid fa-eye text-gray-400 mr-2 cursor-pointer" onClick={iconMata}></i>
                        </section>
                    </section>
                </section>
                <button className="py-2 w-full bg-biru rounded hover:bg-biru-hover dark:bg-biru-tua dark:hover:bg-biru-hover text-white mt-6 mb-2" type="submit">Login</button>
                <section className='flex justify-between mt-1'>
                    <Link href={'/auth/register'}><a className='text-sm'>belum punya akun?</a></Link>
                    <p className='text-sm cursor-pointer' onClick={lupaPassword}>lupa password?</p>
                </section>
            </form>
        </section>
    </> 
}
 
export default Login;


export function getServerSideProps(context){

    return authRedirect(context)

}