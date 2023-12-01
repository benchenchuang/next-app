import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { responseData } from "@/app/api/base.interface";
import { decryption } from "../encrypt";

export const POST = async (req: NextRequest) => {
    let data = await req.json();
    let { username, password } = data;
    //根据username查询用户，判断是否管理员以及密码校验是否正确
    let userInfo = await prisma.user.findUnique({where:{username}});
    if(!userInfo){
        return NextResponse.json(responseData(0, `无${username}用户`))
    }
    let {role} = userInfo;
    let isPermission = decryption(password,userInfo.password as string)
    if(role=='USER'){
        return NextResponse.json(responseData(0, `${username}用户无登录权限`))
    }
    if(!isPermission){
        return NextResponse.json(responseData(0, `登录密码错误`))
    }
    console.log(userInfo);
    //根据用户信息生成token返回
    return NextResponse.json(
        {
            success: true,
            message: '登录成功'
        },
        {
            headers: {
                'Set-Cookie': "admin-token=123;path='/'"
            }
        }
    )
}