import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Admin from "~/layouts/admin.vue";
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import GoodList from '~/pages/goods/lists.vue'
import CategoryList from '~/pages/category/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'
import ManagerList from '~/pages/manager/list.vue'
import AccessList from '~/pages/access/list.vue'
import RoleList from '~/pages/role/list.vue'
import SkusList from '~/pages/skus/list.vue'
import LevelList from '~/pages/level/list.vue'
import SettingBuy from '~/pages/setting/buy.vue'
import SettingShip from '~/pages/setting/ship.vue'
import DistributionIndex from '~/pages/distribution/index.vue'
import DistributionSetting from '~/pages/distribution/setting.vue'
import DataDrawer from '~/pages/distribution/dataDrawer.vue'
import Opinion from '~/pages/opinion/list.vue'
import addProject from '~/pages/addProject/lists.vue'
import addProjectCategory from '~/pages/addProjectCategory/list.vue'
import store from '~/pages/store/list.vue'
import withdrawal from '~/pages/distribution/withdrawal.vue'
import vip from '~/pages/vip/list.vue'
import exam from '~/pages/exam/list.vue'
import options from '~/pages/exam/options.vue'
import records from '~/pages/exam/records.vue'


// 默认路由，所有用户共享
const routes = [{
        path: "/",
        name: "admin",
        component: Admin,
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]


// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
        path: "/",
        name: "/",
        component: Index,
        meta: {
            title: "后台首页"
        }
    }, {
        path: "/goods/list",
        name: "/goods/list",
        component: GoodList,
        meta: {
            title: "商品管理"
        }
    }, {
        path: "/category/list",
        name: "/category/list",
        component: CategoryList,
        meta: {
            title: "分类列表"
        }
    }, {
        path: "/user/list",
        name: "/user/list",
        component: UserList,
        meta: {
            title: "用户列表"
        }
    }, {
        path: "/order/list",
        name: "/order/list",
        component: OrderList,
        meta: {
            title: "订单列表"
        }
    }, {
        path: "/comment/list",
        name: "/comment/list",
        component: CommentList,
        meta: {
            title: "预约管理"
        }
    }, {
        path: "/image/list",
        name: "/image/list",
        component: ImageList,
        meta: {
            title: "图库管理"
        }
    }, {
        path: "/notice/list",
        name: "/notice/list",
        component: NoticeList,
        meta: {
            title: "文章管理"
        }
    }, {
        path: "/setting/base",
        name: "/setting/base",
        component: SettingBase,
        meta: {
            title: "配置"
        }
    }, {
        path: "/coupon/list",
        name: "/coupon/list",
        component: CouponList,
        meta: {
            title: "优惠券列表"
        }
    }, {
        path: "/manager/list",
        name: "/manager/list",
        component: ManagerList,
        meta: {
            title: "套餐管理"
        }
    }, {
        path: "/access/list",
        name: "/access/list",
        component: AccessList,
        meta: {
            title: "菜单权限管理"
        }
    }, {
        path: "/role/list",
        name: "/role/list",
        component: RoleList,
        meta: {
            title: "角色管理"
        }
    }, {
        path: "/skus/list",
        name: "/skus/list",
        component: SkusList,
        meta: {
            title: "规格管理"
        }
    }, {
        path: "/level/list",
        name: "/level/list",
        component: LevelList,
        meta: {
            title: "会员等级"
        }
    }, {
        path: "/setting/buy",
        name: "/setting/buy",
        component: SettingBuy,
        meta: {
            title: "康养管理"
        }
    }, {
        path: "/setting/ship",
        name: "/setting/ship",
        component: SettingShip,
        meta: {
            title: "物流设置"
        }
    }, {
        path: "/distribution/index",
        name: "/distribution/index",
        component: DistributionIndex,
        meta: {
            title: "病例方案"
        }
    }, {
        path: "/distribution/setting",
        name: "/distribution/setting",
        component: DistributionSetting,
        meta: {
            title: "赠送项目"
        }
    }, {
        path: "/distribution/dataDrawer",
        name: "/distribution/dataDrawer",
        component: DataDrawer,
        meta: {
            title: "挂号费设置"
        }
    },
    {
        path: "/opinion/list",
        name: "/opinion/list",
        component: Opinion,
        meta: {
            title: "意见反馈"
        }
    },{
        path: "/addProject/list",
        name: "/addProject/list",
        component: addProject,
        meta: {
            title: "预约项管理"
        }
    },
    {
        path: "/addProjectCategory/list",
        name: "/addProjectCategory/list",
        component: addProjectCategory,
        meta: {
            title: "预约项分类管理"
        }
    },
    {
        path: "/store/list",
        name: "/store/list",
        component: store,
        meta: {
            title: "医院管理"
        }
    },
    {
        path: "/distribution/withdrawal",
        name: "/distribution/withdrawal",
        component: withdrawal,
        meta: {
            title: "提现管理"
        }
    },
    {
        path: "/vip/list",
        name: "/vip/list",
        component: vip,
        meta: {
            title: "VIP套餐管理"
        }
    },
    {
        path: "/exam/list",
        name: "/exam/list",
        component: exam,
        meta: {
            title: "题目管理"
        }
    },
    {
        path: "/exam/options",
        name: "/exam/options",
        component: options,
        meta: {
            title: "选项管理"
        }
    },
    {
        path: "/exam/records",
        name: "/exam/records",
        component: records,
        meta: {
            title: "答题记录"
        }
    }
]

//withdrawal
//addProject

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}