import Link from "next/link";
import FontAwesome from "react-fontawesome";
import AlertAuth from "./AlertAuth";
import UbahNama from "./UbahNama";
import { 
   menuAktifNavbar,toggle,mode,userInfoAktif,
   tombolAkunDihapus,infoUser,tombolTutupPeringatanHapusAkun,tombolHapusAkun,logout,
   penUbahNama
} from "./events/navbarEvents";
import { useState } from "react";

const Navbar = ({user}) => {
   const [name,setName] = useState(user.nama)

          return ( 
              <nav className="sub-nav font-inter flex justify-between items-center py-3 px-5 fixed w-full top-0 z-10 bg-biru dark:bg-biru-dark">
                        <h1 className="text-3xl font-bold text-white">Idul Fitri Center</h1>
      
                        <section className="p-1 w-14 flex flex-col cursor-pointer toggle items-center toggle md:hidden" onClick={toggle}>
                           <section className="menu-tombol w-1/2 h-2 bg-white rounded self-start transition-all duration-300 ease-linear"></section>
                           <section className="menu-tombol w-full my-1 h-2 transition-all bg-white rounded duration-300 ease-linear"></section>
                           <section className="menu-tombol w-1/2 h-2 bg-white rounded self-end transition-all duration-300 ease-linear"></section>
                        </section>
      
                        <section className="menu-aktif hidden transition-all duration-300 ease-linear" onClick={menuAktifNavbar}></section>
                        <section className="user-info-aktif hidden transition-all duration-300 ease-linear" onClick={userInfoAktif}></section>
      
                        <ul className="menu w-80 bg-white md:bg-transparent flex justify-evenly items-center fixed right-0 top-16 flex-col h-96 rounded-md z-30 md:z-10 translate-x-full transition-all duration-300 ease-linear md:translate-x-0 md:static md:flex-row md:h-auto md:w-96 md:p-2 dark:bg-biru-dark dark:md:bg-transparent">
      

                                 <li><Link href={"/"}><a className="py-2 px-5 text-white bg-biru hover:bg-biru-hover rounded md:bg-transparent md:py-0 menu-list md:hover:bg-transparent">Beranda</a></Link></li>
                                 <li><a href="https://github.com/Muizzuddin-github" target="_blank" rel="noreferrer" className="py-2 px-5 text-white bg-biru hover:bg-biru-hover rounded md:bg-transparent md:py-0 menu-list md:hover:bg-transparent">Github</a></li>
                                 <li className="md:mr-7 py-1 px-2 text-white bg-biru hover:bg-biru-hover rounded flex justify-between items-center md:bg-transparent md:py-0 menu-list md:hover:bg-transparent">
                                 <FontAwesome className="fa-solid fa-sun text-lg" name="icon sun"></FontAwesome>
                                    <section className="w-12 bg-white mx-2 rounded-xl cursor-pointer p-1 flex mode dark:bg-biru-tua" onClick={mode}>
                                       <section className="bg-biru w-4 h-4 rounded-full bulat transition-all ease-linear dark:bg-white"></section>
                                    </section>
                                    <FontAwesome className="fa-solid fa-moon text-lg" name="icon moon"></FontAwesome>
                                 </li>
                                 <li className="relative p-5 md:p-0">

                                    <section className="user rounded-full bg-biru md:bg-white w-15 h-15 md:w-10 md:h-10 absolute -top-2 -left-2 flex justify-center items-center cursor-pointer peer md:-top-5 md:-left-7" onClick={infoUser}>
                                       <p className="text-user text-2xl font-bold text-white md:text-biru dark:md:text-biru-dark">{name[0].toUpperCase()}</p>
                                    </section>
                                 </li>
                        </ul>
                        <section className="menu-user absolute opacity-0 z-30 right-0 top-[28rem] md:top-15 px-4 py-8 transition-all duration-500 bg-biru rounded text-center translate-x-full">
                                       <section className=" text-white text-lg mb-2 cursor-default break-words w-[18.5rem]">
                                          <p >{name}</p>
                                          <FontAwesome className="fa-solid fa-pen text-md absolute top-3 right-20 cursor-pointer" name="icon pen" onClick={penUbahNama}></FontAwesome>
                                       </section>
                                       <hr />
                                       <p className="text-white cursor-default w-[18.5rem] mt-2 m-auto break-words">{user.email}</p>
                                       <button className="text-white m-auto block py-1 px-5 bg- rounded-sm mt-4 hover:bg-biru-tua" onClick={logout}>Logout</button>
                                       <button className="text-white m-auto block py-1 px-5 bg- rounded-sm mt-4 hover:bg-biru-tua" onClick={tombolHapusAkun}>Hapus akun</button>
                                    </section>
                        <AlertAuth />
                        <section className="hapus-akun dark:bg-biru-dark bg-white fixed z-20 rounded shadow-cari -translate-x-[180%] opacity-0 transition-all duration-300 top-1/3 mx-5 left-0 right-0 sm:mx-52 md:mx-72 lg:mx-[30rem] xl:mx-[38rem]">
                           <h1 className="mt-2 ml-4 text-lg sm:text-xl font-bold text-red-600 dark:text-white mb-2">Peringatan 😢</h1>
                           <hr />
                           <section className="p-5 flex flex-col dark:text-white text-base sm:text-lg">
   
                              <section className="w-80 mb-2 flex">
                                 <p>Nama</p>
                                 <p className="ml-6 mr-4">:</p>
                                 <section className="break-words w-2/3 inline-block">
                                     <p>{user.nama}</p>
                                 </section>
                              </section>
                              <section className="w-80 mb-2 flex">
                                 <p>Email</p>
                                 <p className="ml-7 mr-4">:</p>
                                 <section className="break-words w-2/3 inline-block">
                                     <p>{user.email}</p>
                                 </section>
                              </section>
                              <hr />
                              <section className="w-80 mt-2 mb-2">
                                 <p className="inline-block text-abu-abu dark:text-white">catatan</p>
                                 <p className="ml-3 mr-4 inline-block">:</p>
                                 <p className="break-words text-sm ml-2 text-abu-abu dark:text-white">jika anda menghapus akun anda maka daftar kunjungan anda akan ikut terhapus semua</p>
                              </section>
                              <section className="self-end mt-3">
                                 <button className="py-1 px-4 bg-biru text-white rounded-md mr-1 text-sm sm:text-base" onClick={tombolAkunDihapus}>Hapus</button>
                                 <button className="py-1 px-4 text-white bg-sal rounded-md ml-1 text-sm sm:text-base"  onClick={tombolTutupPeringatanHapusAkun}>Tidak</button>
                              </section>
                           </section>
                        </section>
                        <UbahNama setName={setName} />
              </nav>
           );
}
 
export default Navbar;