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

app.get('/market',(req,res)=>{
    const house = req.body.house;
    const money = req.body.money;
    user[0].house.push(house);
    user[0].bank.push(money);
    console.log(user[0])
    res.status(200).json({
        'Message': 'Updated Info'
    })
})

app.post('/buy',(req,res)=>{
    const current_house = user[0].house;
    const current_money = user[0].bank;
    console.log(current_house,current_money)
    const constant = current_house*current_money;
    const val1 = constant / (current_house-1);
    const valh1 = Math.round(val1 - current_money);
    user[0].house = current_house-1;
    user[0].bank = val1;
    console.log(user[0])
    console.log(valh1);
    res.status(200).json({
        'Pricing': '₹'+valh1
    })
})

app.post('/sell',(req,res)=>{
    const current_house = user[0].house;
    const current_money = user[0].bank;
    console.log(current_house,current_money)
    const constant = current_house*current_money;
})


app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send("This is working !")
})

app.listen(port,()=>{
    console.log(`[+] Server Live on Port:${port}`)
})