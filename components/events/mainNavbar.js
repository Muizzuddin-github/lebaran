export const mode = (e) => {
    const bulat = document.querySelector('.main-nav .menu li:nth-child(2) .mode .bulat')
    const nav = document.querySelector('.main-nav')
    const html = document.querySelector('html')
    if(nav){
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
          if(scrollY >= 564){
             nav.classList.toggle('bg-biru')
          }
       }
    }
}

export const toggle = () => {
   const nav = document.querySelector('.main-nav')
   if(nav){
      const togglePertama = document.querySelector('.main-nav .toggle section:nth-child(1)')
      const toggleKedua = document.querySelector('.main-nav .toggle section:nth-child(2)')
      const toggleKetiga = document.querySelector('.main-nav .toggle section:nth-child(3)')
      const menuAktif = document.querySelector('.main-nav .menu-aktif')
      const menu = document.querySelector('.main-nav .menu')

      togglePertama.classList.toggle('w-full')
      togglePertama.classList.toggle('w-1/2')
      toggleKedua.classList.toggle('w-1/2')
      toggleKetiga.classList.toggle('w-full')
      toggleKetiga.classList.toggle('w-1/2')
      menuAktif.classList.toggle('hidden')
      menu.classList.toggle('translate-x-full')
   }
}  


export const scrollMainNavbar = () => {
   document.addEventListener('scroll',function(){
      const nav = document.querySelector('.main-nav')
      const html = document.querySelector('html')
      if(nav){
         if(!html.classList.contains('dark')){
            if(scrollY >= 564){
              nav.classList.add('bg-biru')
            }else{
              nav.classList.remove('bg-biru')
            }
          }
      }
    })
}

export const mainNavbarMenuAktif = () => {
   document.addEventListener('click',function(e){
      const nav = document.querySelector('.main-nav')
      if(nav){
         if(e.target.classList.contains('menu-aktif')){
            const togglePertama = document.querySelector('.main-nav .toggle section:nth-child(1)')
            const toggleKedua = document.querySelector('.main-nav .toggle section:nth-child(2)')
            const toggleKetiga = document.querySelector('.main-nav .toggle section:nth-child(3)')
            const menuAktif = document.querySelector('.main-nav .menu-aktif')
            const menu = document.querySelector('.main-nav .menu')

            togglePertama.classList.remove('w-full')
            togglePertama.classList.add('w-1/2')
            toggleKedua.classList.remove('w-1/2')
            toggleKetiga.classList.remove('w-full')
            toggleKetiga.classList.add('w-1/2')
            menuAktif.classList.add('hidden')
            menu.classList.add('translate-x-full')
          }
      }
   })

}