export function configRouter (router) {

    // normal routes
    router.map({
        '/': {
            name: 'home',
            component: require('./components/home.vue')
        },
        '/about': {
            name: 'about',
            component: require('./components/about.vue')
        },
        '/students': {
            name: 'students',
            component: require('./components/students.vue')
        },
        '/courses': {
            name: 'courses',
            component: require('./components/courses.vue')
        }
    });
}