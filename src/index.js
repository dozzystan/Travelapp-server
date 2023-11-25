import app from './app.js'
import mongoose from 'mongoose'
import env from './Utils/validateEnv.js'

const port = env.PORT

mongoose.connect(env.MONGODB_URI).then(()=> {
    console.log('MongoDb is connected');
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })
})

.catch(console.error)