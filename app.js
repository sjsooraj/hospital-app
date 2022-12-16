const express=require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app=new express();
const fs=require('fs');
app.use(express.json());
const datas=require('./data.json');
app.get('/patient',(req,res)=>{
    res.send(datas);
})
app.post('/patient',(req,res)=>{
datas.push(req.body);
fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
    if(err){
        res.send("data cannot be written");

    }
    else{
        res.send("written successfully");
    }
})
})
app.put('/patient/:name',(req,res)=>{
    let name=req.params.name;
    datas.forEach((item)=>{
        if(item.nameofthehospital==name){
            item.patientcount=req.body.patientcount;
            item.Hospitallocation=req.body.Hospitallocation;

        }
    })
    fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
        if(err){res.send("data could not updated")}
        else{res.send("data updated")}
    })
})
app.delete('/patient/:name',(req,res)=>{
    let name=req.params.name;
    let value=datas.filter(item=>item.nameofthehospital!==name);
    fs.writeFile('data.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send('data not deleted')
        }
        else{
            res.send('data deleted')
        }
    })
    })

app.listen(3000);