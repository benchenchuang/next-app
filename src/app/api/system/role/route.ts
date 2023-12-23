import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { responseData } from "@/app/api/base.interface";
/**
 * 查询列表
 * @param req 
 * @param params
 * @returns 
 */
export const GET = async (req: NextRequest) => {
    try {
        let data = await prisma.role.findMany({});
        let total = await prisma.role.count()
        return NextResponse.json(responseData(200, '操作成功', { list: data, total: total }))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 添加数据
 * @param data 
 */
export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { name = '', code = '', status, permission = [] } = data;
        if (!name) {
            return NextResponse.json(responseData(0, '角色名不能为空'))
        }
        if (!code) {
            return NextResponse.json(responseData(0, '角色编码不能为空'))
        }
        let res = await prisma.role.create({ data: { name, code, status } });
        await dealRoleAndMenu(res.id, permission);
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        console.log(err)
        let message = '操作失败'
        let target = err.meta?.target || ''
        if (target) {
            let labelBox = target.split('_');
            let label = labelBox[1];
            message = `${label} 已存在`
        }
        return NextResponse.json(responseData(0, message))
    }
}
/**
 * 删除信息
 * @param req 
 */
export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        let users = await prisma.user.findMany({
            where: {
                roleId: {
                    in: ids
                }
            }
        })
        if (users?.length) {
            return NextResponse.json(responseData(0, '存在关联用户，请取消关联重试'))
        }
        await dealRoleAndMenu(ids[0])
        await prisma.role.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (error: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 更新信息
 * @param req 
 */
export const PUT = async (req: NextRequest) => {
    try {
        let { id, permission, ...data } = await req.json();
        let { name, code } = data;
        if (!id) {
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        let result = await prisma.role.findMany({
            where: {
                name,
                NOT: {
                    id
                }
            }
        });
        if (result?.length) {
            return NextResponse.json(responseData(0, '名称重复'))
        }
        let codeResult = await prisma.role.findMany({
            where: {
                code,
                NOT: {
                    id
                }
            }
        });
        if (codeResult?.length) {
            return NextResponse.json(responseData(0, '编码重复'))
        }
        delete data.password;
        const res = await prisma.role.update({
            where: {
                id,
            },
            data
        });
        await dealRoleAndMenu(res.id, permission);
        return NextResponse.json(responseData(200, '操作成功', res))
    } catch (error: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 处理关联表
 */
const dealRoleAndMenu = async (roleId: string, data?: string[]) => {
    try {
        if (!roleId) {
            return NextResponse.json(responseData(0, '角色不能为空'))
        }
        await prisma.permission.deleteMany({
            where: {
                roleId
            }
        });
        if (data?.length) {
            let list: { roleId: string; menuId: string; parentId: string, orderNum: number }[] = [];
            data.map((item: any) => {
                let { menuId, parentId, orderNum } = item;
                list.push({ roleId, menuId, parentId, orderNum })
            })
            await prisma.permission.createMany({ data: list });
        }
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}