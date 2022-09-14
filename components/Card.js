import getSingle from "../manipulation/getSingle"
import Cookies from "js-cookie"

const Card = ({orang,setSingleKunjungan}) => {

    const ubah = async () => {
        try{
            const data = await getSingle(orang.kunjungan._id.toString(),Cookies.get('token'))
            setSingleKunjungan(data)

            const hitam = document.querySelector('.layar-aksi')
            hitam.classList.remove('hidden')
            const ubahKunjungan =  document.querySelector('.ubah-kunjungan')
            const pFormUbahKunjungan = ubahKunjungan.querySelector('.tombol .text-berhasil-ubah')

            pFormUbahKunjungan.classList.add('hidden')
            pFormUbahKunjungan.previousElementSibling.classList.remove('hidden')
            pFormUbahKunjungan.nextElementSibling.textContent = 'tidak'
            ubahKunjungan.classList.remove('hidden')
        }catch(err){
            console.log(err)
        }
    }

    const detilHapus = async (element) => {
        try{
            const data = await getSingle(orang.kunjungan._id.toString(),Cookies.get('token'))
            setSingleKunjungan(data)
            const hitam = document.querySelector('.layar-aksi')
            hitam.classList.remove('hidden')
            document.querySelector(element).classList.remove('hidden')
        }catch(err){
            console.log(err)
        }
    }

    return ( 
        <section className="card shadow-kunjungan m-5 relative rounded-md py-6 px-10 text-xl hover:shadow-kunjungan-hover hover:scale-105 transition-all ease-linear lg:px-20 lg:pl-10">
            <ul className="mb-5 dark:text-white">
                <li className="absolute -right-1 -top-2"><i className="fa-solid silang fa-circle-xmark text-2xl text-red-600 cursor-pointer dark:text-white hover:text-3xl" onClick={() => detilHapus('.delete-kunjungan')} ></i></li>
                <li className="mb-2 text-base sm:text-xl">Nama <p className="ml-5 mr-2 inline-block">:</p>{orang.kunjungan.nama}</li>
                <li  className="mb-2 text-base sm:text-xl">Alamat <p className="ml-3 mr-2 inline-block">:</p>{orang.kunjungan.alamat}</li>
                <li className="text-base sm:text-xl">No HP <p className="ml-4 mr-2 inline-block">:</p>{orang.kunjungan.noHP}</li>
            </ul>
            <button className="ubah py-1 px-4 bg-biru hover:bg-biru-hover rounded-md text-sm sm:text-lg text-white mr-1" onClick={ubah}>ubah</button>
            <button className="detil py-1 px-4 bg-biru hover:bg-biru-hover rounded-md text-sm sm:text-lg text-white ml-1" onClick={() => detilHapus('.detil-kunjungan')}>detil</button>
        </section>
     );
}
 
export default Card;