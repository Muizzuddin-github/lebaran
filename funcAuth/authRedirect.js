import cookies from 'next-cookies'
import jwt from 'jsonwebtoken'

const authRedirect = (context) => {
    const {token} = cookies(context)

    if(token){
        try{
            jwt.verify(token,'gass login')
            return {
                redirect : {
                    permanent : false,
                    destination : '/kunjungan'
                }
            }

        }catch(err){
            context.res.setHeader(
                "Set-Cookie",[
                    "token=deleted; Max-Age=0"
                ]
            )
        }
    }
    return {props : {}}
}
 
export default authRedirect;