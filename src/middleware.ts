import { NextRequest, NextResponse } from "next/server"
import { getCache } from "./libs/session";

export function middleware(request:NextRequest){
    let pathname:string = request.nextUrl.pathname;
    let token = request.cookies.get('Admin-Token')?.value || '';
    if(pathname.startsWith('/admin') || pathname=='/'){
        //访问的是管理后台 判断是否登录
        if(token){
            console.log('已经登录了')
            if(pathname=='/'){
                return NextResponse.redirect(new URL('/admin/dashboard',request.url));
            }
        }else{
            //跳转到登录页
            return NextResponse.redirect(new URL('/login',request.url));
        }
    }
}