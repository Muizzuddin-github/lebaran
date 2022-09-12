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
        <form className="add-form hidden mx-20 sm:mx-48 md:mx-64 lg:mx-0 px-10 py-6 fixed z-30 bg-white right-0 left-0 lg:left-1/3 top-1/3 lg:right-1/3 rounded-md text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup" onSubmit={tambah}>
            <h1 className="text-2xl mb-3">Kunjungan</h1>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="nama" className="">Nama <p className="ml-5 mr-2 inline-block">:</p></label>
                <input type="text" placeholder="nama" className="border dark:border-abu-trans w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent" id="nama" required autoFocus onChange={e => setNama(e.target.value)} value={nama}/>
            </section>
            
            <section className="flex justify-between items-center p-1">
                <label htmlFor="alamat" className="">Alamat <p className="ml-3 mr-2 inline-block">:</p></label>
                <input type="text" placeholder="alamat" className="border w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent dark:border-abu-trans" id="alamat" required onChange={e => setAlamat(e.target.value)} value={alamat}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="noHP" className="">No HP <p className="ml-4 mr-2 inline-block">:</p></label>
                <input type="text" placeholder="noHP" className="border w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent dark:border-abu-trans" id="noHP" required onChange={e => setNoHP(e.target.value)} value={noHP}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="tanggal" className="">Tanggal <p className="ml-4 mr-2 inline-block">:</p></label>
                <input type="date" className="border w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent dark:border-abu-trans" id="tanggal" required onChange={e => setTanggal(e.target.value)} value={tanggal}/>
            </section>
            <section className="flex justify-between items-center p-1">
                <label htmlFor="status" className="">Status <p className="ml-5 mr-2 inline-block">:</p></label>
                <input type="text" placeholder="status" className="border w-2/3 block pl-2 outline-none rounded-sm text-lg dark:bg-transparent dark:border-abu-trans" id="status" required onChange={e => setStatus(e.target.value)} value={status}/>
            </section>
            <p className="text-abu-abu mt-7">tambah kunjungan?</p>
            <section className="w-full flex justify-between items-center mt-2">
                <p className="err text-abu-abu"></p>
                <section className="tombol text-white text-lg flex">
                    <button className="py-1 px-3 bg-biru rounded-md mr-8" type="submit">tambah</button>
                    <p className="kt text-abu-abu hidden mr-8"></p>
                    <button type="button" className="py-1 px-3 bg-sal rounded-md inline-block cursor-pointer" onClick={close}></button>
                </section>
            </section>
        </form>
     );
}
 
export default AddForm;