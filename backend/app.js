const express =  require('express')
const cors = require('cors')

const dishRoutes = require('./routes/dishes')

const app = express()
app.use(cors())
app.use(express.json());
app.use('/api/dishes', dishRoutes);

app.use(cors())

app.listen(3000,()=>{
    console.log('Server running on port 3000')
})