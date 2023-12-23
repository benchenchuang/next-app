import { NextRequest, NextResponse } from "next/server";
import { getParamsData, requestData, responseData } from "../../base.interface";
import { prisma } from "@/libs/db";

/**
 * 获取列表
 * @param req 
 * @returns 
 */
export const GET = async (req: NextRequest) => {
    try {
        let res = await getMenus('-1');
        return NextResponse.json(responseData(200, '操作成功', { list: res }))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}
/**
 * 新增信息
 * @param req
 * @returns 
 */
export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { name = '', parentId = '-1', path = "", type = '' } = data;
        if (!name) {
            return NextResponse.json(responseData(0, '菜单名不能为空'))
        }
        if (!parentId) {
            return NextResponse.json(responseData(0, '父级不能为空'))
        }
        if (!type) {
            return NextResponse.json(responseData(0, '类型不能为空'))
        }
        if (path) {
            let res = await prisma.menu.findFirst({
                where: {
                    path
                }
            });
            if (res) {
                return NextResponse.json(responseData(0, '路径不得重复'))
            }
        }
        await prisma.menu.create({ data });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}
/**
 * 更新信息
 */
export const PUT = async (req: NextRequest) => {
    try {
        let { id, ...data } = await req.json();
        let { name, path } = data;
        if (!id) {
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        if (!name) {
            return NextResponse.json(responseData(0, '缺少更新信息名称'))
        }
        if (path) {
            let result = await prisma.menu.findMany({
                where: {
                    path,
                    NOT: {
                        id
                    }
                }
            });
            if (result?.length) {
                return NextResponse.json(responseData(0, '路径重复'))
            }
        }
        delete data.children;
        const res = await prisma.menu.update({
            where: {
                id,
            },
            data
        });
        await prisma.permission.updateMany({
            where: {
                menuId: id
            },
            data: {
                parentId: data.parentId,
                orderNum: data.orderNum
            }
        })
        return NextResponse.json(responseData(200, '操作成功', res))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 删除信息
 */
export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        await prisma.menu.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        await prisma.permission.deleteMany({
            where: {
                menuId: {
                    in: ids
                }
            }
        });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}
/**
 * 使用 递归 的方式，查询菜单的所有菜单
 * @param menuId 
 * @returns 
 */
async function getMenus(parentId: string, name?: string) {
    let where: any = { parentId };
    if (name) {
        where.name = name
    }
    const node: any = await prisma.menu.findMany({
        where: { ...where }
    });
    if (!node || node.length == 0) {
        return null;
    }
    if (node.length) {
        for (const child of node) {
            const childNodes = await getMenus(child.id, name);
            child.children = childNodes;
        }
    }
    return node;
}