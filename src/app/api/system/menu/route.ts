import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    let data = await prisma.goods.findMany({
        orderBy: {
            createdTime: 'desc',
        }
    });
    return NextResponse.json({
        success: true,
        message: '获取数据成功',
        data
    })
}

export const POST = async(req:NextRequest)=>{
    const data = await req.json();
    console.log(data)
    await prisma.goods.create({data,});
    return NextResponse.json({
        success:true,
        message:'创建成功',
        data:{}
    })
}