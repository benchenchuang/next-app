import { connectToDB } from "@/libs/db";
import { User } from "@/models/users";
import { NextApiRequest } from "next/types";

interface ResponseData {
    code: number;
    message: string;
    data?: any
}
export const GET= async(req: NextApiRequest)=>{
    try {
        connectToDB();
        const users = await User.find();
        return Response.json({ data: {
            list:users,
            total:users.length
        }, code: 200, message: '请求成功' })
    } catch (err: any) {
        console.log(err)
        // throw new Error('Failed to fetch users!');
        return Response.json({ message: err, code: 1 })
    }
}