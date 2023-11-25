import {cleanEnv} from 'envalid'
import {str, port} from 'envalid/dist/validators.js'

export default cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
})