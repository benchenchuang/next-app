import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { responseData } from "@/app/api/base.interface";
import { decryption } from "../encrypt";
import * as jose from 'jose';

const JWT_SECRET = 'next-app';
/**
 * 登录
 * @param req 
 * @returns 
 */
export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { username, password } = data;
        //根据username查询用户，判断是否管理员以及密码校验是否正确
        let userInfo = await prisma.user.findUnique({ where: { username } });
        if (!userInfo) {
            return NextResponse.json(responseData(0, `无${username}用户`))
        }
        let { role } = userInfo;
        let isPermission = decryption(password, userInfo.password as string)
        if (role !== 'ADMIN') {
            return NextResponse.json(responseData(0, `${username}用户无登录权限`))
        }
        if (!isPermission) {
            return NextResponse.json(responseData(0, `登录密码错误`))
        }
        let { id, name, phone } = userInfo
        //根据用户信息生成token返回
        let jwtToken = await new jose.SignJWT({
            id,
            username,
            name,
            phone
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(new TextEncoder()
                .encode(JWT_SECRET))
        return NextResponse.json(responseData(200, '登录成功', {
            token: jwtToken,
            ...userInfo,
            password: ''
        }),{
            headers:{
                'Set-Cookie': `Admin-Token=${jwtToken}; sameSite=strict; httpOnly=true; maxAge=60*60*24`
            }
        })
    } catch (err: any) {
        return NextResponse.json(responseData(0, `登录失败`))
    }
}

/**
 * 退出
 */
export const PUT = async (req:NextRequest)=>{
    return NextResponse.json(responseData(200, `操作成功`),{
        headers:{
            'Set-Cookie': `Admin-Token="";path="/";`
        }
    })
}