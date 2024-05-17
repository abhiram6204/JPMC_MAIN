const jwt=require("jsonwebtoken")
const express=require("express")
const { verify } = require("crypto")
const fs=require("fs")
const app=express()
app.post("/login",(req,res)=>{
    const user={
        username:"cvr",
        password:"cvr123"
    }
    jwt.sign({user},"secret key",{"expiresIn":200},(err,token)=>{
        res.json({token:token})
    })
})
app.get("/profile",verifyToken,(req,res)=>{
    res.send(req.user)
})
function verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'secret key', (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ auth: false, message: 'Token expired.' });
            }
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = decoded.user;
        next();
    });
}
//streams
app.get("/stream",(req,res)=>{
    var read=fs.createReadStream(__dirname+"/readS.txt","utf-8")
    var write=fs.createWriteStream(__dirname+"/write.txt","utf-8")
    read.on("data",(chunk)=>{
        console.log("new chunk recieved")
        write.write(chunk);
    })
    res.send("wrote successfully")
})

//pipe
app.get("/pipe",(req,res)=>{
    var read=fs.createReadStream(__dirname+"/readS.txt","utf-8")
    var write=fs.createWriteStream(__dirname+"/write.txt","utf-8")
    read.pipe(write)
    res.send("wrote successfully")
})
console.log("Server listening on port 1001")
app.listen(1001)