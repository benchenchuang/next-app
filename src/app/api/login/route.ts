/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-01 19:15:44
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:28:08
 * @FilePath: /next-app/src/app/api/login/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { responseData } from "@/app/api/base.interface";
import { decryption } from "../encrypt";
import { signJWT } from "../jwt";


/**
 * 登录
 * @param req 
 * @returns 
 */
export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { username, password } = data;
        //根据username查询用户，判断是否管理员以及密码校验是否正确
        let userInfo = await prisma.user.findUnique({ where: { username } });
        if (!userInfo) {
            return NextResponse.json(responseData(0, `无${username}用户`))
        }
        let isPermission = decryption(password, userInfo.password as string)
        let { roleId } = userInfo;
        if (roleId == '') {
            return NextResponse.json(responseData(0, `用户无登录权限`))
        }
        if (!isPermission) {
            return NextResponse.json(responseData(0, `登录密码错误`))
        }
        //根据用户信息生成token返回
        let jwtToken = await signJWT(userInfo as any);
        let permission: any = await getUserPermission(userInfo.roleId, '-1');

        return NextResponse.json(responseData(200, '登录成功', {
            token: jwtToken,
            ...userInfo,
            password: '',
            permission
        }), {
            headers: {
                'Set-Cookie': `Admin-Token=${jwtToken};path=/;`
            }
        })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, `登录失败`))
    }
}

/**
 * 退出
 */
export const PUT = async (req: NextRequest) => {
    return NextResponse.json(responseData(200, `操作成功`), {
        headers: {
            'Set-Cookie': `Admin-Token=;path=/;`
        }
    })
}


/**
 * 获取登录用户权限
 * @param roleId  角色Id
 * @param parentId 
 * @returns 
 */
export const getUserPermission = async (roleId: string, parentId: string):Promise<any> => {
    let where: any = { parentId, roleId };
    const node: any = await prisma.permission.findMany({
        where,
        orderBy: {
            'orderNum': 'asc'
        },
        include: {
            menu: true
        }
    });
    if (!node || node.length == 0) {
        return null;
    }
    if (node.length) {
        for (const child of node) {
            const childNodes = await getUserPermission(roleId, child.menuId);
            child.children = childNodes;
        }
    }
    return node;
}

