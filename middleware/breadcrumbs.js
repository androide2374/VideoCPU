export default ({ ctx, route, store }) => {
    if (route.path !== '/' && (route.path.toLowerCase() !== '/mobile' && route.path.toLowerCase() !== '/mobile/')) {
      store.commit('SET_BREADCRUMB', route.meta[0].breadcrumb)
    }
  }
  