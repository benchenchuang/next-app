import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let data = await req.json();
    let { username, password } = data;
    console.log(username, password)
    //根据username查询用户，判断是否管理员以及密码校验是否正确

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