import FontAwesome from "react-fontawesome";

const AlertAuth = () => {
    return ( 
        <section className="pemberitahuan opacity-0 transition-all ease-out duration-500 -translate-y-full py-5 bg-white absolute z-20 left-[50%] right-[50%] -ml-48 w-96 rounded">
            <h1 className="text-xl font-bold ml-5 mb-1">Idul Fitri Center</h1>
            <hr />
            <section className="p-1 my-3 text-center">
                <FontAwesome className="fa-solid text-6xl block mt-5" name="" />
                <p className="mt-3 font-bold"></p>
            </section>
        </section>
     );
}
 
export default AlertAuth;
