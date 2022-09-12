import deleteAccount from '../../manipulation/deleteAcoount'
import Cookies from "js-cookie";
import Router from "next/router";

export const toggle = () => {
   const subNav = document.querySelector('.sub-nav')
   if(subNav){
      const togglePertama = document.querySelector('.sub-nav .toggle section:nth-child(1)')
      const toggleKedua = document.querySelector('.sub-nav .toggle section:nth-child(2)')
      const toggleKetiga = document.querySelector('.sub-nav .toggle section:last-child')
      const menuAktif = document.querySelector('.sub-nav .menu-aktif')
      const menu = document.querySelector('.sub-nav .menu')
      const hapusAkun = document.querySelector('.sub-nav .hapus-akun')
      const ubahNama = document.querySelector('.sub-nav .ubah-nama')
      const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')

      togglePertama.classList.toggle('w-full')
      togglePertama.classList.toggle('w-1/2')
      toggleKedua.classList.toggle('w-1/2')
      toggleKetiga.classList.toggle('w-full')
      toggleKetiga.classList.toggle('w-1/2')

      if(userInfoAktif.classList.contains('hidden')){
         menuAktif.classList.remove('hidden')
         menuAktif.classList.add('cursor-pointer')
      }

      if(!hapusAkun.classList.contains('opacity-0') || !ubahNama.classList.contains('opacity-0')){
         menuAktif.classList.remove('cursor-pointer')
      }
      menu.classList.toggle('translate-x-full')
   }

}


export const mode = (e) => {
    const subNav = document.querySelector('.sub-nav')
    const bulat = document.querySelector('.sub-nav .menu li:nth-child(3) .mode .bulat')
    const html = document.querySelector('html')
   
    if(subNav){
       if(e.target.classList.contains('mode') || e.target.classList.contains('bulat')){
          const checkMode = localStorage.getItem('webMode')

          if(checkMode === 'light'){
             localStorage.setItem('webMode','dark')
             bulat.classList.add('translate-x-6')
             html.classList.add('dark')
          }else{
             localStorage.setItem('webMode','light')
             bulat.classList.remove('translate-x-6')
             html.classList.remove('dark')
          }
       }
    }
}


export const menuAktifNavbar = () => {
   const togglePertama = document.querySelector('.sub-nav .toggle section:nth-child(1)')
   const toggleKedua = document.querySelector('.sub-nav .toggle section:nth-child(2)')
   const toggleKetiga = document.querySelector('.sub-nav .toggle section:last-child')
   const menuAktif = document.querySelector('.sub-nav .menu-aktif')
   const menu = document.querySelector('.sub-nav .menu')
   const menuUser = document.querySelector('.sub-nav .menu-user')
   const pemberitahuan = document.querySelector('.sub-nav .pemberitahuan')
   const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
   const hapusAkun = document.querySelector('.sub-nav .hapus-akun')
   const ubahNama = document.querySelector('.sub-nav .ubah-nama')

   togglePertama.classList.remove('w-full')
   togglePertama.classList.add('w-1/2')
   toggleKedua.classList.remove('w-1/2')
   toggleKetiga.classList.remove('w-full')
   toggleKetiga.classList.add('w-1/2')
   menu.classList.add('translate-x-full')
   menuUser.classList.add('translate-x-full')
   menuUser.classList.add('opacity-0')

   if(hapusAkun.classList.contains('opacity-0') || iconPemberitahuan.classList.contains('fa-circle-xmark')){
      
      if(ubahNama.classList.contains('opacity-0')){
         menuAktif.classList.add('hidden')    
      }else if(!pemberitahuan.classList.contains('opacity-0')){
         menuAktif.classList.add('hidden')    
         ubahNama.classList.add('opacity-0')
         ubahNama.classList.add('-translate-x-[200%]')
         ubahNama.classList.remove('z-10')
         ubahNama.classList.add('z-30')
      }
      
      pemberitahuan.classList.add('-translate-y-full')
      pemberitahuan.classList.add('opacity-0')
      hapusAkun.classList.add('-translate-x-[180%]')
      hapusAkun.classList.add('opacity-0')
   }
}

export const userInfoAktif = (e) => {
   const hapusAkun = document.querySelector('.sub-nav .hapus-akun')
   const menuUser = document.querySelector('.sub-nav .menu-user')
   const pemberitahuan = document.querySelector('.sub-nav .pemberitahuan')
   const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')
   const ubahNama = document.querySelector('.sub-nav .ubah-nama')

   if(!menuUser.classList.contains('opacity-0')){
      menuUser.classList.add('opacity-0')
      menuUser.classList.add('translate-x-full')
      e.target.classList.add('hidden')
   }

   if(!pemberitahuan.classList.contains('-translate-y-full')){
      if(iconPemberitahuan.classList.contains('fa-circle-xmark') || !ubahNama.classList.contains('opacity-0')){
         pemberitahuan.classList.add('-translate-y-full')
         pemberitahuan.classList.add('opacity-0')
         ubahNama.classList.add('opacity-0')
         ubahNama.classList.add('-translate-x-[200%]')
         ubahNama.classList.remove('z-10')
         ubahNama.classList.add('z-30')
         hapusAkun.classList.add('-translate-x-[180%]')
         hapusAkun.classList.add('opacity-0')
         e.target.classList.add('hidden')
      }
   }
   
}

export const tombolAkunDihapus = async () => {
   const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')
   const menuAktif = document.querySelector('.sub-nav .menu-aktif')
   const pemberitahuan = document.querySelector('.sub-nav .pemberitahuan')
   const hapusAkun = document.querySelector('.sub-nav .hapus-akun')
   const iconPemberitahuan = pemberitahuan.querySelector('.fa-solid')

   pemberitahuan.classList.remove('opacity-0')
   pemberitahuan.classList.remove('-translate-y-full')
   hapusAkun.classList.remove('z-20')


   try{

      iconPemberitahuan.classList.remove('text-sal')
      iconPemberitahuan.classList.remove('fa-circle-xmark')
      iconPemberitahuan.classList.add('fa-rotate')
      iconPemberitahuan.classList.add('text-biru')
      iconPemberitahuan.classList.add('animate-iconBerputar')
      iconPemberitahuan.nextElementSibling.textContent = 'Tunggu sebentar'

      pemberitahuan.classList.remove('opacity-0')
      pemberitahuan.classList.add('top-1')
      pemberitahuan.classList.remove('-translate-y-full')

      const {data} = await deleteAccount(Cookies.get('token'))

      setTimeout(function(){
         iconPemberitahuan.classList.remove('fa-rotate')
         iconPemberitahuan.classList.remove('animate-iconBerputar')
         iconPemberitahuan.classList.add('fa-circle-check')
         iconPemberitahuan.nextElementSibling.textContent = data.msg
            
      },1000)
      Cookies.remove('token')

      setTimeout(function(){
         Router.replace('/')
      },1700)
      

   }catch({response}){
      setTimeout(function(){
         userInfoAktif.classList.add('cursor-pointer')
         menuAktif.classList.add('cursor-pointer')
         iconPemberitahuan.classList.remove('fa-rotate')
         iconPemberitahuan.classList.remove('animate-iconBerputar')
         iconPemberitahuan.classList.remove('text-biru')
         iconPemberitahuan.classList.add('fa-circle-xmark')
         iconPemberitahuan.classList.add('text-sal')
         iconPemberitahuan.nextElementSibling.textContent = response.data.msg

         pemberitahuan.classList.remove('opacity-0')
         pemberitahuan.classList.add('top-1')
         pemberitahuan.classList.remove('-translate-y-full')
      },1500)
   }
}
     


export const infoUser = (e) => {
   const menuUser = document.querySelector('.sub-nav .menu-user')
   const layarAksi = document.querySelector('.sub-nav .menu-aktif')
   const menuUserAktif = document.querySelector('.sub-nav .user-info-aktif')
   if(e.target.classList.contains('user') || e.target.classList.contains('text-user')){
      menuUser.classList.toggle('opacity-0')
      menuUser.classList.toggle('translate-x-full')
      layarAksi.classList.add('cursor-pointer')

      if(layarAksi.classList.contains('hidden')){
         menuUserAktif.classList.remove('hidden')
         menuUserAktif.classList.add('cursor-pointer')

      }
   }
}

export const tombolTutupPeringatanHapusAkun = () => {
   const menuAktif = document.querySelector('.sub-nav .menu-aktif')
   const menuUserAktif = document.querySelector('.sub-nav .user-info-aktif')
   const hapusAkun = document.querySelector('.sub-nav .hapus-akun')

   menuUserAktif.classList.add('hidden')
   menuAktif.classList.add('hidden')
   hapusAkun.classList.add('-translate-x-[180%]')
   hapusAkun.classList.add('opacity-0')
}

export const tombolHapusAkun = () => {
   const menuUser = document.querySelector('.sub-nav .menu-user')
   const hapusAkun = document.querySelector('.sub-nav .hapus-akun')
   const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')
   userInfoAktif.classList.remove('cursor-pointer')
   menuUser.classList.add('opacity-0')
   menuUser.classList.add('translate-x-full')
   hapusAkun.classList.remove('-translate-x-[180%]')
   hapusAkun.classList.remove('opacity-0')
   hapusAkun.classList.add('z-20')
   toggle()
}

export const penUbahNama = () => {
   const userInfoAktif = document.querySelector('.sub-nav .user-info-aktif')
   const menuUser = document.querySelector('.sub-nav .menu-user')
   const ubahNama = document.querySelector('.sub-nav .ubah-nama')
   userInfoAktif.classList.remove('cursor-pointer')
   menuUser.classList.add('opacity-0')
   menuUser.classList.add('translate-x-full')
   ubahNama.classList.remove('-translate-x-[200%]')
   ubahNama.classList.remove('opacity-0')
   toggle()
}

export const logout = () => {
   Cookies.remove('token')
   Router.replace('/')
}