export function configRouter (router) {

    // normal routes
    router.map({
        '/entities': {
            name: 'entities',
            component: require('./components/entities.vue')
        },
        '/other': {
            name: 'other',
            component: require('./components/other.vue')
        }
    });
}