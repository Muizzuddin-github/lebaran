import Head from 'next/head'
import Router from 'next/router';
import FontAwesome from 'react-fontawesome';
import AlertAuth from '../../components/AlertAuth'
import Particle from '../../components/Particle';
import { useEffect,useState } from 'react';
import { checkStrength } from '@password-generator/check-strength';
import resetPassword from '../../manipulation/resetPassword'


const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const [ubahPassword,setUbahPassword] = useState('')
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
        const statusPassword = document.querySelector('.menu-reset .reset .status-password-reset')
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


    const reset = async (e) => {
        e.preventDefault()
        const layarAksiReset = document.querySelector('.menu-reset .layar-aksi-reset')
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')

        try{
            if(password !== ubahPassword){
                throw {response : {data : {msg : "Konfirmasi password salah"}}}
            }

            const {data} = await resetPassword({token : Router.query.token,password : ubahPassword})
            iconPemberitahuan.classList.remove('text-sal')
            iconPemberitahuan.classList.remove('fa-circle-xmark')

            iconPemberitahuan.classList.remove('fa-envelope-circle-check')
            iconPemberitahuan.classList.add('fa-circle-check')
            iconPemberitahuan.classList.add('text-biru')
            iconPemberitahuan.nextElementSibling.textContent = data.msg

            layarAksiReset.classList.remove('hidden')
            layarAksiReset.classList.remove('cursor-pointer')
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.remove('-translate-y-full')

        }catch({response}){
            iconPemberitahuan.classList.remove('text-biru')            
            iconPemberitahuan.classList.remove('fa-envelope-circle-check')
            iconPemberitahuan.classList.add('fa-circle-xmark')
            iconPemberitahuan.classList.add('text-sal')

            iconPemberitahuan.nextElementSibling.textContent = response.data.msg

            layarAksiReset.classList.remove('hidden')
            layarAksiReset.classList.add('cursor-pointer')
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

    const closeErrPemberitahuanLogin = (e) => {
        const pemberitahuan = document.querySelector('.pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
        const layarAksiReset = document.querySelector('.layar-aksi-reset')

        if(e.target.classList.contains('layar-aksi-reset')){
            if(iconPemberitahuan.classList.contains('fa-circle-xmark')){
                pemberitahuan.classList.add('-translate-y-full')
                layarAksiReset.classList.add('hidden')
            }else if(iconPemberitahuan.classList.contains('fa-envelope-circle-check')){
                pemberitahuan.classList.add('-translate-y-full')
                layarAksiReset.classList.add('hidden')
            }

        }
    }


    return <>
    <Head>
        <meta name="description" content="reset password" />
        <link rel="icon" href="/gambar-utama.png" />
        <title>Reset Password</title>
    </Head>
    <Particle bgColor={modeWeb} />
    <AlertAuth />
        <section className="menu-reset p-5 absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center ">
            <section className="layar-aksi-reset hidden transition-all duration-300 ease-linear" onClick={closeErrPemberitahuanLogin}></section>
            <form className="reset opacity-0 animate-authMuncul py-6 px-10 relative bg-white rounded-md text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={reset}>
                <FontAwesome className='fa-solid fa-circle-user block text-center text-[5.5rem] mb-3 absolute -top-12 left-[50%] -ml-9' name='' />
                <h1 className="text-2xl mb-6 text-center mt-8">Reset password anda</h1>
                <section className='h-24 flex flex-col justify-between'>
                    <section className="flex justify-between items-center p-1 w-full">
                        <label htmlFor="password">Password<p className="ml-6 mr-2 inline-block">:</p></label>
                        <input type="text" placeholder="password" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent" id="passowrd" required defaultValue={password} onChange={e => setPassword(e.target.value)} autoComplete='off' />
                    </section>
                    <p className='ml-32 status-password-reset text-sm'></p>
                    <section className="flex justify-between items-center p-1 w-full mt-2">
                        <label htmlFor="konfirmasi" className='flex'>Konfirmasi<p className="ml-3 mr-3 inline-block">:</p></label>
                        <section className='w-full flex justify-between items-center border dark:border-abu-trans'>
                            <input type="password" placeholder="konfirmasi" className="w-[85%] block pl-2 outline-none rounded-sm text-lg dark:bg-transparent" id="konfirmasi" required defaultValue={ubahPassword} onChange={e => setUbahPassword(e.target.value)}/>
                            <i className="fa-solid fa-eye text-gray-400 mr-2 cursor-pointer" onClick={iconMata}></i>
                        </section>
                    </section>
                </section>
                <button className="py-2 w-full bg-biru rounded hover:bg-biru-hover dark:bg-biru-tua dark:hover:bg-biru-hover text-white mt-6 mb-2" type="submit">Reset</button>
            </form>
        </section>
    </> 
}
 
export default ResetPassword;
