import axios from '@/utils/axios'

export default class listApi {
    static userApply(obj) {
        return axios.post('/dsdocapplyform/list', obj)
    }
    static news(obj) {
        return axios.post('/dsdocNews/list', obj)
    }
}