import axios from 'axios'

/**
 *
 * @type {Vue} Vue
 */
export default async ({ Vue }) => {
  Vue.prototype.$axios = { axios: axios }
}
