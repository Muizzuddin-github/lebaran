import deleteSingle from "../manipulation/deleteSingle"
import getAll from "../manipulation/getAll"
import Cookies from "js-cookie"
import { useState,useEffect } from "react"

const Delete = ({singleKunjungan,setKunjungan}) => {
    const [id,setID] = useState(0)
    const [nama,setNama] = useState('')
    const [alamat,setAlamat] = useState('')
    const [noHP,setNoHP] = useState('')
    const [status,setStatus] = useState('')
    const [tanggal,setTanggal] = useState('')

    useEffect(function(){
        if(singleKunjungan.length != 0){
            const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
            const bulan = ['Januari',"Februari","Maret","Mei","Juni","Juli","Agustus",'September',"Oktober","November","Desember"]
            const tanggalKunjungan = new Date(singleKunjungan[0].kunjungan.tanggal)
            setID(singleKunjungan[0].kunjungan._id)
            setNama(singleKunjungan[0].kunjungan.nama)
            setAlamat(singleKunjungan[0].kunjungan.alamat)
            setNoHP(singleKunjungan[0].kunjungan.noHP)
            setStatus(singleKunjungan[0].status)
            setTanggal(`${hari[tanggalKunjungan.getDay()]}, ${tanggalKunjungan.getDate()} ${bulan[tanggalKunjungan.getMonth() - 1]} ${tanggalKunjungan.getFullYear()}`)
        }
    },[singleKunjungan])


    const hapusData = async (id) => {
        try{
            const p = document.querySelector('.delete-kunjungan .tombol p')
            const text = await deleteSingle(id,Cookies.get('token'))
            p.textContent = text
            p.previousElementSibling.classList.add('hidden')
            p.classList.remove('hidden')
            p.nextElementSibling.textContent = 'tutup'
            await getAll(setKunjungan,Cookies.get('token'))
        }catch(err){
            console.log(err)
        }
    }

    const close = () => {
        const deleteKunjungan = document.querySelector('.delete-kunjungan')
        const layarAksi = document.querySelector('.layar-aksi')
        const quoteTampil = document.querySelector('.quote')

        if(!quoteTampil.classList.contains('opacity-0')){
            quoteTampil.classList.add('-translate-y-[120%]')
            quoteTampil.classList.add('opacity-0')
        }

        deleteKunjungan.classList.add('hidden')
        layarAksi.classList.add('hidden')
        setID(0)
        setNama('')
        setAlamat('')
        setNoHP('')
        setStatus('')
        setTanggal('')
    }

    return ( 
            <section className="delete-kunjungan hidden mx-20 sm:mx-48 md:mx-64 lg:mx-0 px-5 py-6 fixed z-30 bg-white right-0 left-0 lg:left-1/3 top-1/3 lg:right-1/3 rounded-md text-xl dark:text-white dark:bg-biru-dark dark:shadow-popup">
            <h2 className="text-2xl mb-2">Kunjungan</h2>
            <section key={id}>
                            <ul className="mb-5 dark:text-white pl-16 pr-10">
                            <li className="mb-2">Nama <p className="ml-5 mr-2 inline-block">:</p>{nama}</li>
                            <li className="mb-2">Alamat <p className="ml-3 mr-2 inline-block">:</p>{alamat}</li>
                            <li className="mb-2">No HP <p className="ml-4 mr-2 inline-block">:</p>{noHP}</li>
                            <li className="mb-2">Status <p className="ml-5 mr-2 inline-block">:</p>{status}</li>
                            <li>Tanggal <p className="ml-2 mr-2 inline-block">:</p>{tanggal}</li>
                            </ul>
                            <p className="text-abu-abu mt-7 ml-16">hapus kunjungan?</p>
                            <section className="w-full flex justify-end items-center mt-2">
                                <section className="tombol text-white text-lg flex">
                                    <button className="py-1 px-3 bg-biru hover:bg-biru-hover rounded-md mr-8" onClick={() => hapusData(id)}>hapus</button>
                                    <p className="text-abu-abu hidden mr-8"></p>
                                    <button type="button" className="py-1 px-3 bg-sal hover:bg-sal-hover rounded-md inline-block cursor-pointer" onClick={close}>tidak</button>
                                </section>
                            </section>
                        </section>
        </section>
    );
}
 
export default Delete;