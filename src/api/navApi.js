import axios from '../utils/axios'

class navApi {
    static nav(t) {
        return axios.get(`/sys/menu/nav?t=${t}`)
    }
}

export default navApi