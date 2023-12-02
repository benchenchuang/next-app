import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/app/api/jwt";
import { responseData } from "./app/api/base.interface";

/**
 * 全局 没有限制的middleware
 */
// export async function middleware(request:NextRequest){
//     let pathname:string = request.nextUrl.pathname;
//     let token = await request.cookies.get('Admin-Token')?.value || '';
//     if(pathname.startsWith('/admin') || pathname=='/'){
//         //访问的是管理后台 判断是否登录
//         if(token){
//             try{
//                 let res = await verifyToken(token);
//                 let {exp} = res.payload;
//                 let expTime = Number(exp + '000')
//                 let nowTime = Date.now();
//                 if(nowTime >= expTime){
//                     return NextResponse.redirect(new URL('/login',request.url));
//                 }
//                 if(pathname=='/'){
//                     return NextResponse.redirect(new URL('/admin/dashboard',request.url));
//                 }
//             }catch(err){
//                 return NextResponse.redirect(new URL('/login',request.url));
//             }
//         }else{
//             //跳转到登录页
//             return NextResponse.redirect(new URL('/login',request.url));
//         }
//     }
// }

//api middleware
export async function middleware(request:NextRequest){
    let {pathname} = request.nextUrl
    let token:string = request.headers.get('token') || '';
    let whitePaths:string[] = ['/api/login'];
    let isWhite:number = whitePaths.findIndex(item=>item==pathname);
    //根据token判断接口返回信息
    if(isWhite==-1){
        //不在白名单，需要token验证
        if(token){
            let res = await verifyToken(token);
            let {exp} = res.payload;
            let expTime = Number(exp + '000')
            let nowTime = Date.now();
            if(nowTime < expTime){
                console.log('登录有效期')
            }else{
                return NextResponse.json(responseData(0, `登录失效，重新登录`),{
                    status:401
                });
            }
        }else{
            return NextResponse.json(responseData(0, `认证失败，请重新登录`),{
                status:401
            });
        }
    }
}

//设置api过滤
export const config = {
    matcher: '/api/:path*',
}