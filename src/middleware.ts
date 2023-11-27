import { NextRequest, NextResponse } from "next/server"

export function middleware(request:NextRequest){
    if(request.nextUrl.pathname.startsWith('/admin')){
        //访问的是管理后台 判断是否登录
        if(request.cookies.get('admin-token')){
            console.log('已经登录了')
        }else{
            //跳转到登录页
            return NextResponse.redirect(new URL('/login',request.url));
        }
    }
}