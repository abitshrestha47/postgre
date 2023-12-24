import bcrypt from 'bcrypt';
const saltRounds=10;

export const hashPassword=async(password:string):Promise<string>=>{
    try {
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const compareHash=async(password:string,hash:string):Promise<boolean>=>{
    try {
        return await bcrypt.compare(password,hash);
    } catch (error) {
        console.log(error);
        throw error;
    }
}