import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    return NextResponse.json(
        {
            success: true,
            message:'登录成功'
        },
        {
            headers: {
                'Set-Cookie': "admin-token=123;path='/'"
            }
        }
    )
}