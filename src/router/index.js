import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import local from '../utils/local.js'

// 解决面包屑导航栏报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function Push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 引入字体图标的样式和初始话样式

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/after',
    children: [
      {
        path: '/after',
        icon: 'icon-shouye',
        component: () =>
          import(/* webpackChunkName: "after" */ '../views/after/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "after" */ '../views/lndex.vue')
  },
  // 404
  {
    path: '/404',
    isVisible: false,
    component: () => import(/* webpackChunkName: "after" */ '../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// 提取需要动态的计算的路由
const syncRouter = [
  // 仪表盘
  {
    path: '/after',
    isVisible: true,
    icon: 'icon-shouye',
    meta: { name: '后台首页' },
    component: () =>
      import(/* webpackChunkName: "after" */ '../views/after/index.vue')
  },
  // 订单管理
  {
    path: '/order',
    isVisible: true,
    icon: 'icon-icon-',
    meta: { path: '/order', name: '订单管理', role: ['super', 'normal'] },
    redirect: '/order/link',
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/index.vue'),
    children: [
      {
        path: '/order/link',
        meta: { path: '/order', name: '', role: ['super', 'normal'] },
        component: () =>
          import(/* webpackChunkName: "order" */ '../views/order/link.vue')
      },
      {
        path: '/order/edit/:id',
        meta: { path: '/order', name: '订单查看', role: ['super', 'normal'] },
        component: () =>
          import(/* webpackChunkName: "order" */ '../views/order/edit.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/productC',
    isVisible: true,
    icon: 'icon-shangpin',
    meta: { path: '/productC', name: '商品管理', role: ['super', 'normal'] },
    component: () =>
      import(
        /* webpackChunkName: "productLinkHome" */ '../views/product/index.vue'
      ),
    // 商品列表
    redirect: '/productC/productLink',
    children: [
      {
        path: '/productC/productLink',
        isVisible: true,
        meta: { path: '/productC/productLink', name: '商品列表' },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '../views/product/productList.vue'
          )
      },
      // 商品添加
      {
        path: '/productC/productadd',
        isVisible: true,
        meta: { path: '/productC/productadd', name: '商品添加' },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '@/views/product/productadd.vue'
          )
      },
      // 商品分类
      {
        path: '/productC/classify',
        isVisible: true,
        meta: { path: '/productC/classify', name: '商品分类' },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '@/views/product/classify.vue'
          )
      }
    ]
  },
  // 店铺管理
  {
    path: '/store',
    isVisible: true,
    icon: 'icon-dianpu',
    meta: { path: '/store', name: '店铺管理', role: ['super'] },
    component: () =>
      import(/* webpackChunkName: "after" */ '../views/store/index.vue')
  },
  // 账号管理
  {
    path: '/account',
    isVisible: true,
    icon: 'icon-zhanghao',
    meta: { path: '/account', name: '账号管理', role: ['super', 'normal'] },
    component: () =>
      import(
        /* webpackChunkName: "productLinkHome" */ '../views/account/index.vue'
      ),
    redirect: '/productC/productLink',
    children: [
      {
        path: '/account/accountAdd',
        isVisible: true,
        meta: {
          path: '/account/accountAdd',
          name: '账号添加',
          role: ['super']
        },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '../views/account/accountAdd.vue'
          )
      },
      // 账号列表
      {
        path: '/account/accountLink',
        isVisible: true,
        meta: {
          path: '/account/accountLink',
          name: '账号列表',
          role: ['super']
        },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '@/views/account/accountLink.vue'
          )
      },
      // 修改账号
      {
        path: '/account/accountCad',
        isVisible: true,
        meta: {
          path: '/account/accountAdd',
          name: '账号修改',
          role: ['super', 'normal']
        },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '@/views/account/accountCad.vue'
          )
      }
    ]
  },
  // 销售统计
  {
    path: '/statistics',
    isVisible: true,
    icon: 'icon-tongji',
    meta: { path: '/statistics', name: '销售统计' },
    component: () =>
      import(
        /* webpackChunkName: "productLinkHome" */ '../views/statistics/index.vue'
      ),
    // 销售列表
    redirect: '/productC/productLink',
    children: [
      {
        path: '/statistics/statisticsA',
        isVisible: true,
        meta: { path: '/statistics/statisticsA', name: '销售列表' },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '../views/statistics/statisticsA.vue'
          )
      },
      // 订单统计
      {
        path: '/statistics/statisticsB',
        isVisible: true,
        meta: {
          path: '/statistics/statisticsB',
          name: '订单统计',
          role: ['super', 'normal']
        },
        component: () =>
          import(
            /* webpackChunkName: "productLink" */ '@/views/statistics/statisticsB.vue'
          )
      }
    ]
  },
  // 个人中心
  {
    path: '/center',
    isVisible: false,
    component: () =>
      import(/* webpackChunkName: "after" */ '../views/center/center.vue')
  },
  // esharts
  {
    path: '/esharts',
    component: () =>
      import(/* webpackChunkName: "after" */ '../views/after/hhh/linkC.vue')
  }
]
const router = new VueRouter({
  routes
})
// 计算角色，根据角色计算对应的路由，进行对比
addRouter()
export function addRouter() {
  const role = local.get('role')
  const calcArr = calcRoute(syncRouter, role)
  routes[0].children = calcArr
  console.log(routes[0].children)
  router.addRoutes(routes)
  local.set('menu', JSON.stringify(calcMenu(calcArr)))
}
// 计算菜单
function calcMenu(arr) {
  return arr.filter(item => {
    if (item.isVisible) {
      if (item.children && item.children.length > 0) {
        item.children = calcMenu(item.children)
      }
      return true
    } else {
      return false
    }
  })
}
// 计算路由
function calcRoute(r, role) {
  // filter 返回一个满足条件的数组
  return r.filter(item => {
    if (hasPermision(item, role)) {
      // 这里父级路由有所保留，看是否还有子级路由
      if (item.children && item.children.length > 1) {
        item.children = calcRoute(item.children, role)
      }
      return true
    } else {
      return false
    }
  })
}
// 判断当前角色是否在role中
function hasPermision(item, role) {
  // console.log(item)
  if (item.meta && item.meta.role) {
    return item.meta.role.includes(role)
  } else {
    return true
  }
}
// 导航守卫 --- 拦截路由
router.beforeEach((to, from, next) => {
  // 先获取token
  const token = local.get('token')

  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
