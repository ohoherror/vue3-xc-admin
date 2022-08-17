export const listMenu = [{
    menuId: 1,
    name: "系统管理",
    open: null,
    orderNum: 0,
    parentId: 0,
    parentName: null,
    perms: null,
    type: 0,
    url: null,
    children: [
        {
            icon: "role",
            children: [
                {
                    icon: "role",
                    children: [
                        {
                            icon: "role",
                            children: null,
                            menuId: 144,
                            name: "测试管理",
                            open: null,
                            orderNum: 2,
                            parentId: 44,
                            parentName: null,
                            perms: null,
                            type: 1,
                            url: "sys/test",
                        }
                    ],
                    menuId: 44,
                    name: "子系统管理",
                    open: null,
                    orderNum: 2,
                    parentId: 3,
                    parentName: null,
                    perms: null,
                    type: 1,

                }
            ],
            menuId: 3,
            name: "角色管理",
            open: null,
            orderNum: 2,
            parentId: 1,
            parentName: null,
            perms: null,
            type: 1,

        },
        {
            icon: "menu",
            children: null,
            menuId: 4,
            name: "菜单管理",
            open: null,
            orderNum: 3,
            parentId: 1,
            parentName: null,
            perms: null,
            type: 1,
            url: "sys/menu",
        }
    ]
}]