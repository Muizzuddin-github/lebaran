import jwt from 'jsonwebtoken'

const authorization = (res,secretKey,tokenAuth) => {
    return new Promise((resolve) => {

        if(!tokenAuth) return res.status(401).json({msg : 'token tidak dikirimkan'})

        const [schemaAuth,token] = tokenAuth.split(' ')

        if(schemaAuth !== process.env.SCHEMA_TOKEN) return res.status(401).json({msg : "unauthorized"})

        jwt.verify(token,secretKey,function(err,decoded){
            if(err) return res.status(401).json({msg : err.message})
            return resolve(decoded)
        })
    })
}
 
export default authorization;


