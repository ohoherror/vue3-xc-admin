import axios from '../utils/axios'

class loginApi {
    static login(obj) {
        return axios.post('/sys/login', obj)
    }
}

export default loginApi