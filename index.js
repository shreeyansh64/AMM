const exp = require('express');
const bp = require('body-parser');
const port = process.env.PORT || 3000;
const app = exp();

const user = [{
    "house" : [],
    "bank" : []
}]

app.use(exp.json());
app.use(bp.json())

app.get('/market',function(req,res){
    const house = req.headers.house;
    console.log(house)
    const bank = req.headers.bank;
    user[0].house.push(house);
    user[0].bank.push(bank);
    console.log(user[0])

    res.send("Hello")
})


app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send("This is working !")
})

app.listen(port,()=>{
    console.log(`[+] Server Live on Port:${port}`)
})