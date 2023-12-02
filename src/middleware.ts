import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/app/api/jwt";

export async function middleware(request:NextRequest){
    console.log('aaaaa')
    let pathname:string = request.nextUrl.pathname;
    let token = await request.cookies.get('Admin-Token')?.value || '';
    if(pathname.startsWith('/admin') || pathname=='/'){
        //访问的是管理后台 判断是否登录
        if(token){
            try{
                let res = await verifyToken(token);
                let {exp} = res.payload;
                let expTime = Number(exp + '000')
                let nowTime = Date.now();
                if(nowTime >= expTime){
                    return NextResponse.redirect(new URL('/login',request.url));
                }
                if(pathname=='/'){
                    return NextResponse.redirect(new URL('/admin/dashboard',request.url));
                }
            }catch(err){
                return NextResponse.redirect(new URL('/login',request.url));
            }
        }else{
            //跳转到登录页
            return NextResponse.redirect(new URL('/login',request.url));
        }
    }
}
//设置api过滤
export const config = {
    matcher: '/api/:path*',
}