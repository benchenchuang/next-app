/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-11-25 22:40:43
 * @FilePath: /next-app/src/app/api/system/users/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    let data = await prisma.dictData.findMany({
        skip:0, //从skip开始（不包含skip)
        take:1,//取几条
    });
    return NextResponse.json({
        code: 200,
        message: "成功",
        data
    })
}
export const POST = async (data: any)=>{
    console.log(data)
}