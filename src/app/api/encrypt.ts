import bcrypt from 'bcryptjs';
//加密
export const encryption = (password: string) => {
    let salt:string = bcrypt.genSaltSync(10);
    let hash:string = bcrypt.hashSync(password, salt)
    return hash;
}

//解密
export const decryption = (new_password: string, old_password: string) => {
    let compare:Boolean = bcrypt.compareSync(new_password, old_password);
    return compare;
}

