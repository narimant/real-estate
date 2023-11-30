import { compare, hash } from "bcryptjs";


async function hashPassword(password){
    const hashedPassword=await hash(password,12);
    return hashedPassword;
}
async function verifyPassword(password,hashedPassword){
const isValid=await compare(password,hashedPassword);
return isValid;
}

// function verifyToken(token,secretKey){
//     try{

//        const result= verify(token,secretKey);
//        return {email:result.email}
       
//     }catch(err){
//         return false;
//     }
// }

export {hashPassword,verifyPassword};