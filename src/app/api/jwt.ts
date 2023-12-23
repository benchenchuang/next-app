import * as jose from 'jose';

const JWT_SECRET = 'next-app';

//生成token
export const signJWT = async (info: { id: any; username: any; name: any; phone: any; email?: string | null; post?: string | null; password?: string | null; role?:any; avatar?: string | null; departId?: number | null; createTime?: Date; updatedTime?: Date; }) => {
    let { id, username, name, phone } = info;
    //根据用户信息生成token返回
    let jwtToken = await new jose.SignJWT({
        id,
        username,
        name,
        phone
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(new TextEncoder()
            .encode(JWT_SECRET))
    return jwtToken;
}
//验证token
export const verifyToken = async (token: string) => {
    let res = await jose.jwtVerify(
        token, new TextEncoder().encode(JWT_SECRET)
    );
    return res;
}
