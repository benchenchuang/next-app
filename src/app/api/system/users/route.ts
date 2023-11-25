/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-11-25 22:31:49
 * @FilePath: /next-app/src/app/api/system/users/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { connectToDB } from "@/libs/db";
import { User } from "@/models/users";
import { NextApiRequest } from "next/types";

export const GET = async () => {
    try {
        connectToDB();
        const users = await User.find();
        return Response.json({
            data: {
                list: users,
                total: users.length
            }, code: 200, message: '请求成功'
        })
    } catch (err: any) {
        console.log(err)
        // throw new Error('Failed to fetch users!');
        return Response.json({ message: err, code: 1 })
    }
}