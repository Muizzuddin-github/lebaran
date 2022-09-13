import { useState } from "react"
import addData from "../manipulation/addData"
import getAll from "../manipulation/getAll"
import camelCase from "../setting-website/camelCase"
import Cookies from "js-cookie"

const AddForm = ({setKunjungan}) => {
    const [nama,setNama] = useState('')
    const [alamat,setAlamat] = useState('')
    const [noHP,setNoHP] = useState('')
    const [tanggal,setTanggal] = useState('')
    const [status,setStatus] = useState('')
    
    const tambah = async (e) => {
        e.preventDefault()
        try{

            const data = {
                nama : camelCase(nama),
                alamat : camelCase(alamat),
                noHP : noHP,
                tanggal : tanggal,
                status : camelCase(status)
            }
            const hasil = await addData(data,Cookies.get('token'))
    
            const ditambahkan = document.querySelector('.add-form .tombol .kt')
            const pemberitahuanError = document.querySelector('.add-form .err')
            ditambahkan.previousElementSibling.classList.add('hidden')
            ditambahkan.textContent = hasil.data.msg
            ditambahkan.classList.remove('hidden')
            ditambahkan.nextElementSibling.textContent = 'tutup'
            pemberitahuanError.textContent = ''
    
            getAll(setKunjungan,Cookies.get('token'))
        }catch(err){
            const pemberitahuanError = document.querySelector('.add-form .err')
            pemberitahuanError.textContent = err.response.data.msg

        }
    }

    const close = () => {
        const quote = document.querySelector('.quote')
        const addForm = document.querySelector('.add-form')
        const layarAksi = document.querySelector('.layar-aksi')
        addForm.classList.add('hidden')

        if(quote.classList.contains('opacity-0')){
            layarAksi.classList.add('hidden')
        }

        setNama('')
        setAlamat('')
        setNoHP('')
        setTanggal('')
        setStatus('')
    }

    return ( 
        <form className="add-form hidden px-5 sm:px-10 py-6 fixed z-30 bg-white top-1/3 mx-5 left-0 right-0 sm:mx-52 md:mx-72 lg:mx-[30rem] xl:mx-[38rem] rounded-md text-lg sm:text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={tambah}>
            <h1 className="text-lg sm:text-2xl mb-3">Kunjungan</h1>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="nama" className="text-base sm:text-lg">Nama <p className="ml-9 mr-1 inline-block">:</p></label>
                <input type="text" placeholder="nama" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm  dark:bg-transparent text-sm sm:text-lg py-1 sm:py-0" id="nama" required autoFocus onChange={e => setNama(e.target.value)} value={nama}/>
            </section>
            
            <section className="flex justify-between items-center p-1">
                <label htmlFor="alamat" className="text-base sm:text-lg">Alamat <p className="ml-7 mr-1 inline-block">:</p></label>
                <input type="text" placeholder="alamat" className="border w-2/3 block pl-2 outline-none rounded-sm  dark:bg-transparent dark:border-abu-trans text-sm sm:text-lg py-1 sm:py-0" id="alamat" required onChange={e => setAlamat(e.target.value)} value={alamat}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="noHP" className="text-base sm:text-lg">No HP <p className="ml-8 mr-1 inline-block">:</p></label>
                <input type="tel" placeholder="noHP" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent dark:border-abu-trans text-sm sm:text-lg py-1 sm:py-0" id="noHP" required onChange={e => setNoHP(e.target.value)} value={noHP}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="tanggal" className="text-base sm:text-lg">Tanggal <p className="ml-[1.35rem] mr-1 inline-block">:</p></label>
                <input type="date" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent dark:border-abu-trans text-sm sm:text-lg py-1 sm:py-0" id="tanggal" required onChange={e => setTanggal(e.target.value)} value={tanggal}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="status" className="text-base sm:text-lg">Status <p className="ml-8 mr-1 sm:ml-9 inline-block">:</p></label>
                <input type="text" placeholder="status" className="border w-2/3 block pl-2 outline-none rounded-sm dark:bg-transparent dark:border-abu-trans text-sm sm:text-lg py-1 sm:py-0" id="status" required onChange={e => setStatus(e.target.value)} value={status}/>
            </section>
            <p className="text-abu-abu mt-7 text-base sm:text-lg">tambah kunjungan?</p>
            <section className="w-full flex justify-between items-center mt-2">
                <p className="err text-abu-abu"></p>
                <section className="tombol text-white text-sm sm:text-lg flex">
                    <button className="py-1 px-3 bg-biru rounded-md mr-8" type="submit">tambah</button>
                    <p className="kt text-abu-abu hidden mr-8"></p>
                    <button type="button" className="py-1 px-3 bg-sal rounded-md inline-block cursor-pointer" onClick={close}></button>
                </section>
            </section>
        </form>
     );
}
 
export default AddForm;