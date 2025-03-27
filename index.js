const exp = require('express');
const bp = require('body-parser');
const port = process.env.PORT || 3000;
const app = exp();

const user = [{
    "house" : [],
    "bank" : [],
    "stock":[0]
}]

app.use(exp.json());
app.use(bp.json())


//MARKET
app.post('/market',(req,res)=>{
    const house = req.body.house;
    const money = req.body.money;
    user[0].house.push(house);
    user[0].bank.push(money);
    console.log(user[0])
    res.status(200).json({
        'House': house,
        'Money' : money
    })
})
//VALUE
app.get('/value',(req,res)=>{
    const current_house = user[0].house;
    const current_money = user[0].bank;
    const constant = current_house*current_money;
    //Buy Value
    const val1 = constant / (current_house - 1);
    const buy_value = val1 - current_money;
    //Sell Value
    const val2 = constant / (current_house +1);
    const sell_value = current_money - val2;
    //Response
    res.status(200).json({
        'Buy-for':buy_value,
        'Sell-for':sell_value,
        'Stocks in Wallet': user[0].stock
    })
})
//BUY
app.get('/buy',(req,res)=>{
    //Taking Input
    const current_house = user[0].house;
    const current_money = user[0].bank;
    console.log(current_house,current_money)
    //Performing Operation
    const constant = current_house*current_money;
    const val1 = constant / (current_house-1);
    const valh1 = val1 - current_money;
    //Updating the User-Array Info
    user[0].house = current_house-1;
    user[0].bank = val1;
    user[0].stock[0] = user[0].stock[0] + 1
    console.log(user[0]);
    console.log(valh1);
    //Displaying Result
    res.status(200).json({
        'Stock Purchased': '-₹'+valh1,
        'Stocks': user[0].stock[0]
    })
})

//SELL
app.get('/sell',(req,res)=>{
    //Getting Inputs from User-Array
    const current_house = user[0].house;
    const current_money = user[0].bank;
    const stocks = user[0].stock;
    console.log(user[0])
    const constant = current_house*current_money;
    //Operations
    const val1 = constant / (current_house+1);
    const valh1 = current_money-val1;
    user[0].house = current_house +1;
    user[0].bank = val1;
    user[0].stock[0] = user[0].stock[0] -1;
    console.log(user[0]);
    console.log(valh1);
    res.status(200).json({
        'Stock Sold': '+₹'+valh1,
        'Stocks': user[0].stock[0]
    })
})


app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send("This is a platform for buying and selling black stocks.")
})

app.listen(port,()=>{
    console.log(`[+] Server Live on Port:${port}`)
})