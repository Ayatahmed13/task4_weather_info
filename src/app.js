


const express = require('express')
const app = express()



const port = process.env.PORT || 3000
app.set('view engine', 'hbs'); 
app.set('views',"./views")


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.use(express.static('public'))



app.get ('/' , (req,res) => {
    res.render('index' , {
      
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    })
    
