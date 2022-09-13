import { useState } from "react";
import updateName from "../manipulation/updateName";
import Cookies from "js-cookie";

const UbahNama = ({setName}) => {
    const [nama,setNama] = useState('')

    const namaDiUbah = async (e) => {
        e.preventDefault()
        const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')
        const menuAktif = document.querySelector('.sub-nav .menu-aktif')
        const pemberitahuan = document.querySelector('.sub-nav .pemberitahuan')
        const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
        const ubahNama = document.querySelector('.sub-nav .ubah-nama')

        ubahNama.classList.remove('z-30')
        ubahNama.classList.add('z-10')
        userInfoAktif.classList.add('cursor-pointer')
        menuAktif.classList.add('cursor-pointer')
     
        try{
            const {data} = await updateName(Cookies.get('token'),{nama})
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.remove('-translate-y-full')
            iconPemberitahuan.classList.add('text-biru')
            pemberitahuan.classList.add('top-1')

            pemberitahuan.classList.remove('-translate-y-full')
            iconPemberitahuan.classList.add('fa-circle-check')
            iconPemberitahuan.nextElementSibling.textContent = data.msg
           setName(data.namaUser)
     
        }catch({response}){
            iconPemberitahuan.classList.remove('fa-rotate')
            iconPemberitahuan.classList.remove('animate-iconBerputar')
            iconPemberitahuan.classList.remove('text-biru')
            iconPemberitahuan.classList.add('fa-circle-xmark')
            iconPemberitahuan.classList.add('text-sal')
            iconPemberitahuan.nextElementSibling.textContent = response.data.msg
   
            pemberitahuan.classList.remove('opacity-0')
            pemberitahuan.classList.add('top-1')
            pemberitahuan.classList.remove('-translate-y-full')
        }

        setNama('')
    }

    const closeUbahNama = () => {
        const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')
        const menuAktif = document.querySelector('.sub-nav .menu-aktif')
        const menuUbahNama = document.querySelector('.sub-nav .ubah-nama')
        userInfoAktif.classList.add('hidden')
        menuAktif.classList.add('hidden')
        menuUbahNama.classList.add('opacity-0')
        menuUbahNama.classList.add('-translate-x-[200%]')
    }

    return ( 
        <form className="ubah-nama -translate-x-[200%] opacity-0 transition-all duration-300 px-10 py-6 fixed z-30 bg-white top-1/3 mx-5 left-0 right-0 sm:mx-52 md:mx-72 lg:mx-[30rem] xl:mx-[40rem] rounded 2xl:mx-[50rem] dark:text-white dark:bg-biru-dark dark:shadow-popup">
            <h1 className="text-lg sm:text-xl mb-3">Ubah Nama</h1>
            <section className="flex justify-between items-center p-1 text-base sm:text-lg">
                <label htmlFor="nama" className="">Nama <p className="ml-5 mr-2 inline-block">:</p></label>
                <input type="text" placeholder="nama" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-base py-1 sm:py-0 sm:text-lg dark:bg-transparent" id="nama" required autoFocus onChange={e => setNama(e.target.value)} value={nama}/>
            </section>
            
            <p className="text-abu-abu mt-7 tect-base sm:text-lg">ubah nama?</p>
            <section className="w-full flex justify-between items-center mt-2">
                <p className="err text-abu-abu"></p>
                <section className="tombol text-white text-sm sm:text-lg flex">
                    <button className="py-1 px-3 bg-biru rounded-md mr-8" type="submit"onClick={namaDiUbah} >ubah</button>
                    <p className="kt text-abu-abu hidden mr-8"></p>
                    <button type="button" className="py-1 px-3 bg-sal rounded-md inline-block cursor-pointer" onClick={closeUbahNama} >tidak</button>
                </section>
            </section>
        </form>
     );
}
 
export default UbahNama;