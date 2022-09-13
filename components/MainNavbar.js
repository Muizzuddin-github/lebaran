import Link from "next/link"
import FontAwesome from "react-fontawesome"
import { useEffect } from "react"
import { mode,toggle,scrollMainNavbar,mainNavbarMenuAktif } from "./events/mainNavbar"

const MainNavbar = () => {

   useEffect(function(){
      mainNavbarMenuAktif()
      scrollMainNavbar()
   },[])
   

    return ( 
        <nav className="main-nav font-inter flex justify-between items-center py-3 px-5 fixed w-full top-0 z-10">
                  <h1 className="text-3xl font-bold text-white">Idul Fitri Center</h1>

                  <section className="p-1 w-14 flex flex-col cursor-pointer toggle items-center toggle md:hidden" onClick={toggle}>
                     <section className="menu-tombol w-1/2 h-2 bg-white rounded self-start transition-all duration-300 ease-linear"></section>
                     <section className="menu-tombol w-full my-1 h-2 transition-all bg-white rounded duration-300 ease-linear"></section>
                     <section className="menu-tombol w-1/2 h-2 bg-white rounded self-end transition-all duration-300 ease-linear"></section>
                  </section>

                  <section className="menu-aktif hidden transition-all duration-300 ease-linear cursor-pointer"></section>

                  <ul className="menu w-60 sm:w-80 bg-white md:bg-transparent flex justify-evenly items-center fixed right-0 top-16 flex-col h-96 rounded-md z-30 translate-x-full transition-all duration-300 ease-linear md:translate-x-0 md:static md:flex-row md:h-auto md:w-96 md:p-2 dark:bg-biru-dark dark:md:bg-transparent">

                           <li>
                              <a href="https://github.com/Muizzuddin-github" target="_blank" rel="noreferrer" className="py-2 px-5 text-white bg-biru hover:bg-biru-hover rounded md:bg-transparent md:py-0 menu-list md:hover:bg-transparent">Github</a>
                           </li>
                           <li className="py-1 px-2 text-white bg-biru hover:bg-biru-hover md:hover:bg-transparent rounded flex justify-between items-center md:bg-transparent md:py-0 menu-list">
                           <FontAwesome className="fa-solid fa-sun text-lg" name="icon sun"></FontAwesome>
                              <section className="mode w-12 bg-white mx-2 rounded-xl cursor-pointer p-1 flex dark:bg-biru-tua" onClick={mode}>
                                 <section className="bg-biru w-4 h-4 rounded-full bulat transition-all ease-linear dark:bg-white"></section>
                              </section>
                              <FontAwesome className="fa-solid fa-moon text-lg" name="icon moon"></FontAwesome>
                           </li>
                           <li> 
                              <Link href={'/auth/login'}><a className="py-2 px-5 text-white rounded bg-biru hover:bg-biru-hover md:bg-transparent md:hover:bg-transparent">Login</a></Link>
                           </li>
                  </ul>
        </nav>
     );
}
 
export default MainNavbar;