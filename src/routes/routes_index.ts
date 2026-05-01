import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Cookie from 'js-cookie'

const getToken = () => Cookie.get('token')

const getUser = () => {
    const user = Cookie.get('user')
    return user ? JSON.parse(user) : null
}

const routes: RouteRecordRaw[] = [
    // Public routes
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue')
    },

    // Admin routes
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: () => import('../views/admin/dashboard/index.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/users',
        name: 'admin.users.index',
        component: () => import('../views/admin/users/index.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/users/create',
        name: 'admin.users.create',
        component: () => import('../views/admin/users/create.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/users/edit/:id',
        name: 'admin.users.edit',
        component: () => import('../views/admin/users/edit.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },

    // User routes
    {
        path: '/user/dashboard',
        name: 'user.dashboard',
        component: () => import('../views/user/dashboard/index.vue'),
        meta: { requiresAuth: true, requiresUser: true }
    },

    // Shared routes
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/shared/profile/index.vue'),
        meta: { requiresAuth: true }
    },

    // Error routes
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('../views/errors/forbidden.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/errors/not-found.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    const token = getToken()
    const user = getUser()
    const role = user?.role

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' })
        return
    }

    if (to.matched.some(record => record.meta.requiresAdmin) && role !== 'admin') {
        next({ name: 'forbidden' })
        return
    }

    if (to.matched.some(record => record.meta.requiresUser) && role !== 'user') {
        next({ name: 'forbidden' })
        return
    }

    if ((to.name === 'login' || to.name === 'register') && token) {
        if (role === 'admin') {
            next({ name: 'admin.dashboard' })
        } else {
            next({ name: 'user.dashboard' })
        }
        return
    }

    next()
})

export default router