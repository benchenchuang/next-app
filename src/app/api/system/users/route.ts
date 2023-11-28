/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-11-25 22:40:43
 * @FilePath: /next-app/src/app/api/system/users/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {prisma} from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest,{params}:any)=>{
    let data = await prisma.goods.findMany({});
    return NextResponse.json({
        code:200,
        message:"成功",
        data
    })
}

// export const GET = async (req:Request | NextRequest,res: any) => {
//     try {
//         connectToDB();
//         const users = await User.find();
//         return Response.json({
//             data: {
//                 list: users,
//                 total: users.length
//             },
//             code: 200,
//             message: '请求成功'
//         })
//     } catch (err: any) {
//         // throw new Error('Failed to fetch users!');
//         return Response.json({ 
//             message: err,
//             code: 1
//         })
//     }
// }