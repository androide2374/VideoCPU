import Vue from 'vue'
import moment from 'moment'
moment.locale('es')

const padLeft = function(nbr, n, str) {
    if (String(nbr).length > n) {
      return nbr
    }
    return Array(n - String(nbr).length + 1).join(str || '0') + nbr
  }
  
Vue.prototype.formatDate = (date) => {
    const newdate = new Date(date)
    return {
      origin: date,
      fullDate: newdate,
      format:
        padLeft(newdate.getUTCDate(), 2) +
        '/' +
        padLeft(newdate.getUTCMonth() + 1, 2) +
        '/' +
        padLeft(newdate.getUTCFullYear(), 2),
      hour:
        padLeft(newdate.getUTCHours(), 2) +
        ':' +
        padLeft(newdate.getUTCMinutes(), 2) // + ':' + padLeft(newdate.getUTCSeconds(), 2)
    }
  }
  
  Vue.prototype.formatDateNoUTC = (date) => {
    const newdate = new Date(date)
    return {
      origin: date,
      fullDate: newdate,
      format:
        padLeft(newdate.getDate(), 2) +
        '/' +
        padLeft(newdate.getMonth() + 1, 2) +
        '/' +
        padLeft(newdate.getFullYear(), 2),
      hour:
        padLeft(newdate.getHours(), 2) + ':' + padLeft(newdate.getMinutes(), 2) // + ':' + padLeft(newdate.getSeconds(), 2)
    }
  }
  
  Vue.prototype.formatFecha = (fecha) => {
    const anio = fecha.substr(-8, 4)
    const mes = fecha.substr(-4, 2)
    const dia = fecha.substr(-2, 2)
    return dia + '/' + mes + '/' + anio
  }