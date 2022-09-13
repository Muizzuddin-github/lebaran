import FontAwesome from "react-fontawesome";

const Footer = () => {
    return ( 
        <footer className="p-5 bg-biru text-white text-center text-lg sm:text-xl dark:bg-biru-dark dark:shadow-sm dark:shadow-white ">
            <p className="mb-2">Created by M.Mu&apos;izzuddin</p>
            <a href="https://www.instagram.com/mzdn404/" className="mr-3" target="_blank" rel="noreferrer">
                 <FontAwesome className="fa-brands fa-instagram text-2xl" name="icon instagram"></FontAwesome>
            </a>
            <a href="https://t.me/muiz000" className="ml-3" target="_blank" rel="noreferrer">
              <FontAwesome className="fa-brands fa-telegram text-2 text-2xl" name="icon telegram"></FontAwesome>
            </a>
        </footer>
     );
}
 
export default Footer;