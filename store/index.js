export const state = () => {
    return {
      token: null,
      auth: false,
      expire: Date.now().toString(),
      isMobile: false,
      error: false,
      masterClass: '',
      breadcrumb: [
        {
          text: 'Inicio',
          to: '/inicio'
        }
      ]
    }
  }
  export const mutations = {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_AUTH(state, auth) {
      state.auth = auth
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_EXPIRE(state, expire) {
      state.expire = expire
    },
    SET_MOBILE(state, isMobile) {
      state.isMobile = isMobile
    },
    SET_BREADCRUMB(state, bread) {
      state.breadcrumb = bread
    },
    SET_MASTERCLASS(state, bread) {
      state.masterClass = bread
    },
    guardarImpuestosVigentes(state, impuestos) {
      state.impuestosVigentes = impuestos
    },
    guardarTasaInteresResarcitorio(state, tasa) {
      state.tasaInteresResarcitorio = tasa
    }
  }
  export const actions = {
    nuxtServerInit({ commit }, { req, redirect }) {
  
    }
  }
  