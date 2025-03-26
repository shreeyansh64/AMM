const exp = require('express');
const bp = require('body-parser');
const port = process.env.PORT || 3000;
const app = exp();

app.use(exp.json());

app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send("This is working !")
})

app.listen(port,()=>{
    console.log(`[+] Server Live on Port:${port}`)
})