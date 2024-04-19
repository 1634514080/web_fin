
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    
    { path: '/admin/:id?', 
    name: 'admin',
    component: ()=>import("../pages/admin.vue"), 
    children: [
      
        { path: '/admin/user', 
        name: 'user',
        component: ()=>import("../pages/user.vue") 
        },
        { path: '/admin/test', 
        name: 'test',
        component:()=>import("../pages/test.vue") 
        },
        { path: '/admin/Add_meetingroom', 
        name: 'add_meetingroom',
        component: ()=>import("../pages/Add_meetingroom.vue") 
        },
        { path: '/admin/Book_meeting', 
        name: 'Book_meeting',
        component: ()=>import("../pages/Book_meeting.vue")
        },
        { path: '/admin/department_man', 
        name: 'department_man',
        component: ()=>import("../pages/department_man.vue")
        },
        { path: '/admin/Employee_registration', 
        name: 'Employee_registration',
        component: ()=>import("../pages/Employee_registration.vue")
        },
        { path: '/admin/meeting_statistics', 
        name: 'meeting_statistics',
        component: ()=>import("../pages/meeting_statistics.vue")
        },
        { path: '/admin/Registration_approval', 
        name: 'Registration_approval',
        component: ()=>import("../pages/Registration_approval.vue")
        },
        { path: '/admin/Search_employees', 
        name: 'Search_employees',
        component: ()=>import("../pages/Search_employees.vue")
        },
        { path: '/admin/search_meeting', 
        name: 'search_meeting',
        component: ()=>import("../pages/search_meeting.vue")
        },
        { path: '/admin/View_meetingroom', 
        name: 'View_meetingroom',
        component: ()=>import("../pages/View_meetingroom.vue")
        },
        { path: '/admin/member', 
        name: 'member',
        component: ()=>import("../pages/member.vue")
        },
        { path: '/admin/mymeeting', 
        name: 'mymeeting',
        component: ()=>import("../pages/mymeeting.vue")
        },
        { path: '/admin/mybooking', 
        name: 'mybooking',
        component: ()=>import("../pages/mybooking.vue")
        },
    ]
  },

    { path: '/', 
    name: 'login',
    component: ()=>import("../pages/login.vue") },
  ]

const router=createRouter({
history: createWebHistory(),
routes, 
})


export default router;