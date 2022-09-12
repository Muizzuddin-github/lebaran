// setting dark or light mode web storage for website

const modeWeb = (nav,liKe) => {
    const bulat = nav.querySelector(`.menu li:nth-child(${liKe}) .mode .bulat`)
    const html = document.querySelector('html')
    const checkMode = localStorage.getItem('webMode')
    
    if(!checkMode){
      localStorage.setItem('webMode','light')
    }
    
    if(nav){
      const checkMode2 = localStorage.getItem('webMode')
      if(checkMode2 === 'dark'){
        bulat.classList.add('translate-x-6')
        html.classList.add('dark')
      }else{
        bulat.classList.remove('translate-x-6')
        html.classList.remove('dark')
      }
    }

}
 
export default modeWeb;