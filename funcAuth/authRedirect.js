import cookies from 'next-cookies';

const authRedirect = (context) => {
    const {token} = cookies(context)

    if(token){
        return {
            redirect : {
                permanent : false,
                destination : '/kunjungan'
            }
        }
    }
    return {props : {}}
}
 
export default authRedirect;