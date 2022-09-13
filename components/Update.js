import { useEffect, useState } from "react"
import updateData from "../manipulation/updateData"
import getAll from "../manipulation/getAll"
import Cookies from "js-cookie"

const UpdateForm = ({singleKunjungan,setKunjungan}) => {
    const [id,setID] = useState(0)
    const [nama,setNama] = useState('')
    const [alamat,setAlamat] = useState('')
    const [noHP,setNoHP] = useState('')
    const [tanggal,setTanggal] = useState('')
    const [status,setStatus] = useState('')

    useEffect(function(){
        if(singleKunjungan.length != 0){
            setID(singleKunjungan[0].kunjungan._id.toString())
            setNama(singleKunjungan[0].kunjungan.nama)
            setAlamat(singleKunjungan[0].kunjungan.alamat)
            setNoHP(singleKunjungan[0].kunjungan.noHP)
            setTanggal(singleKunjungan[0].kunjungan.tanggal)
            setStatus(singleKunjungan[0].status)
        }
    },[singleKunjungan])
    
    const ubah = async (e) => {
        e.preventDefault()
        try{
            const data = {nama,alamat,noHP,tanggal,status}
            const text = await updateData(id,data,Cookies.get('token'))
    
            const ditambahkan = document.querySelector('.ubah-kunjungan .tombol p')
            ditambahkan.previousElementSibling.classList.add('hidden')
            ditambahkan.textContent = text
            ditambahkan.classList.remove('hidden')
            ditambahkan.nextElementSibling.textContent = 'tutup'
    
            getAll(setKunjungan,Cookies.get('token'))
        }catch(err){
            console.log(err)
        }
    }

    const close = () => {
        const updateForm = document.querySelector('.ubah-kunjungan')
        const layarAksi = document.querySelector('.layar-aksi')
        const quoteTampil = document.querySelector('.quote')

        if(!quoteTampil.classList.contains('opacity-0')){
            quoteTampil.classList.add('-translate-y-[120%]')
            quoteTampil.classList.add('opacity-0')
        }


        updateForm.classList.add('hidden')
        layarAksi.classList.add('hidden')

        setID(0)
        setNama('')
        setAlamat('')
        setNoHP('')
        setTanggal('')
        setStatus('')
    }

    return ( 
        <form className="ubah-kunjungan hidden px-5 sm:px-10 py-6 fixed z-30 bg-white top-1/3 mx-5 left-0 right-0 sm:mx-52 md:mx-72 lg:mx-[30rem] xl:mx-[38rem] rounded-md text-lg sm:text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={ubah}>
            <h1 className="text-lg sm:text-2xl mb-3">Kunjungan</h1>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="nama" className="text-base sm:text-lg">Nama <p className="ml-9 mr-1 inline-block">:</p></label>
                <input type="text" placeholder="nama" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0" id="nama" required onChange={e => setNama(e.target.value)} value={nama}/>
            </section>
            
            <section className="flex justify-between items-center p-1">
                <label htmlFor="alamat" className="text-base sm:text-lg">Alamat <p className="ml-7 mr-1 inline-block">:</p></label>
                <input type="text" placeholder="alamat" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0 dark:border-abu-trans" id="alamat" required onChange={e => setAlamat(e.target.value)} value={alamat}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="noHP" className="text-base sm:text-lg">No HP <p className="ml-8 mr-1 inline-block">:</p></label>
                <input type="tel" placeholder="noHP" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0 dark:border-abu-trans" id="noHP" required onChange={e => setNoHP(e.target.value)} value={noHP}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="tanggal" className="text-base sm:text-lg">Tanggal <p className="ml-[1.35rem] mr-1 inline-block">:</p></label>
                <input type="date" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0 dark:border-abu-trans" id="tanggal" required onChange={e => setTanggal(e.target.value)} value={tanggal}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="status" className="text-base sm:text-lg">Status <p className="ml-8 mr-1 sm:ml-9 inline-block">:</p></label>
                <input type="text" placeholder="status" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0 dark:border-abu-trans" id="status" required onChange={e => setStatus(e.target.value)} value={status}/>
            </section>
            <p className="text-abu-abu mt-7 text-base sm:text-lg">ubah kunjungan?</p>
            <section className="w-full flex justify-end items-center mt-2">
                <section className="tombol text-white text-sm sm:text-lg flex">
                    <button className="py-1 px-3 bg-biru hover:bg-biru-hover rounded-md mr-8" type="submit">ubah</button>
                    <p className="text-abu-abu hidden mr-8"></p>
                    <button type="button" className="py-1 px-3 bg-sal hover:bg-sal-hover rounded-md inline-block cursor-pointer" onClick={close}></button>
                </section>
            </section>
        </form>
     );
}
 
export default UpdateForm;