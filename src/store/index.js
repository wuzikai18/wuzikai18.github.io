import { createStore } from 'vuex'
import { login} from '~/api/manager'
import { getinfo } from '~/graphql/admin'
import {
    setToken,
    removeToken
} from '~/composables/auth'
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},

            // 侧边宽度
            asideWidth:"250px",

            menus:[],
            ruleNames:[
                "createRule,POST",
                "updateRule,POST",
                "deleteRule,POST",
                "getRuleList,GET",
                "updateRuleStatus,POST",
                "createRole,POST",
                "updateRole,POST",
                "deleteRole,POST",
                "getRoleList,GET",
                "updateRoleStatus,POST",
                "getGoodsList,GET",
                "getCurrentImageList,GET",
                "getImageClassList,GET",
                "createImageClass,POST",
                "updateImageClass,POST",
                "deleteImageClass,POST",
                "uploadImage,POST",
                "deleteImage,POST",
                "updateImage,POST",
                "getCategoryList,GET",
                "createCategory,POST",
                "sortCategory,POST",
                "updateCategory,POST",
                "updateCategoryStatus,POST",
                "deleteCategory,DELETE",
                "getSkusList,GET",
                "createSkus,POST",
                "deleteSkus,POST",
                "updateSkus,POST",
                "updateSkusStatus,POST",
                "getOrderList,GET",
                "deleteOrder,POST",
                "shipOrder,POST",
                "refundOrder,POST",
                "exportOrder,POST",
                "getCommentList,GET",
                "reviewComment,POST",
                "updateCommentStatus,POST",
                "getUserList,GET",
                "createUser,POST",
                "updateUser,POST",
                "updateUserStatus,POST",
                "deleteUser,POST",
                "getUserLevelList,GET",
                "createUserLevel,POST",
                "updateUserLevel,POST",
                "updateUserLevelStatus,POST",
                "deleteUserLevel,POST",
                "deleteManager,POST",
                "getManagerList,GET",
                "createManager,POST",
                "updateManager,POST",
                "updateManagerStatus,POST",
                "getSysSetting,GET",
                "sysconfigUpload,POST",
                "setSysSetting,POST",
                "getSysSetting,GET",
                "setSysSetting,GET",
                "readGoods,GET",
                "updateGoodsSkus,POST",
                "setGoodsBanner,POST",
                "restoreGoods,POST",
                "destroyGoods,POST",
                "deleteGoods,POST",
                "updateGoodsStatus,POST",
                "createGoods,POST",
                "updateGoods,POST",
                "checkGoods,POST",
                "createGoodsSkusCard,POST",
                "sortGoodsSkusCard,POST",
                "updateGoodsSkusCard,POST",
                "deleteGoodsSkusCard,POST",
                "createGoodsSkusCardValue,POST",
                "updateGoodsSkusCardValue,POST",
                "deleteGoodsSkusCardValue,POST",
                "getNoticeList,GET",
                "createNotice,POST",
                "updateNotice,POST",
                "deleteNotice,POST",
                "getCouponList,GET",
                "createCoupon,POST",
                "updateCoupon,POST",
                "updateCouponStatus,POST",
                "getCategoryGoods,GET",
                "connectCategoryGoods,POST",
                "deleteCategoryGoods,POST",
                "getStatistics1,GET",
                "getStatistics2,GET",
                "getStatistics3,GET",
                "setRoleRules,POST",
                "deleteCoupon,POST",
                "getShipInfo,GET",
                "getExpressCompanyList,GET",
                "getAgentStatistics,GET",
                "getAgentList,GET",
                "getUserBillList,GET",
                "getDistributionSetting,GET",
                "setDistributionSetting,POST"
            ],
            search:''
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state,user){
            state.user = user
        },
        // 展开/缩起侧边
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        },
        SET_MENUS(state,menus){
            state.menus = menus
        },
        // SET_RULENAMES(state,ruleNames){
        //     state.ruleNames = ruleNames
        // }
    },
    actions:{
        // 登录
        login({ commit }, { username,password }){
            return new Promise((resolve,reject)=>{
                login(username,password).then(res=>{
                    setToken(res.token)

                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        // 获取当前登录用户信息
        getinfo({ commit }){
            return new Promise((resolve,reject)=>{
                getinfo().then(res=>{
                    console.log(res)
                    commit("SET_USERINFO",res)
                    commit("SET_MENUS",res.menus)
                    // commit("SET_RULENAMES",res.ruleNames)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        // 退出登录
        logout({ commit }){
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_USERINFO",{})
        }
    }
})

export default store