const express=require("express")
const fs=require("fs")
const app=express()
app.use(express.json());

let students=[
    {
    "id":1,
    "name":"patta"
    },
    {
    "id":2,
    "name":"kurva"
    }
]
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.get("/contact",(req,res)=>{
    res.status(200).send("<h1>Contact page</h1>")
})
app.get("/bad",(req,res)=>{
    res.status(404).send("404 page not found")
})
app.get("/students",(req,res)=>{
    res.send(students);
})
app.get("/users",(req,res)=>{
    let data=fs.readFileSync("users.json")
    const users=JSON.parse(data)
    res.json(users)
})
app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/users.json');
});
app.delete('/deleteUser/:id', (req, res) => {
    let data = fs.readFileSync('users.json', 'utf8');
    let jsonData = JSON.parse(data);
    let users = jsonData;
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        fs.writeFileSync('users.json', JSON.stringify(jsonData));
        res.send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
});
app.post("/addUser/:id",(req,res)=>{
    let data=fs.readFileSync("users.json")
    const users=JSON.parse(data)
    const id=parseInt(req.params.id)
    const user={id:id,name:"sai"}
    users.push(user)
    fs.writeFileSync("users.json",JSON.stringify(users))
    res.send("User added")
})
app.get("/users/:id",(req,res)=>{
    let data=fs.readFileSync("users.json")
    const users=JSON.parse(data)
    const id=parseInt(req.params.id)
    const user=users.find(user=>user.id===id)
    res.send(user)
})
app.patch("/users/:id",(req,res)=>{
    let data=fs.readFileSync("users.json")
    const users=JSON.parse(data)
    const id=parseInt(req.params.id)
    const user=users.find(user=>user.id===id)
    user.name=req.body.name
    fs.writeFileSync("users.json",JSON.stringify(users))
    res.send("User updated")
})
app.post("/add/:id/:name",(req,res)=>{
    let newStudent=
        {
        "id":req.params.id,
        "na":req.params.name
        }
    students.push(newStudent)
    res.send("data added")
})
console.log("server started and running at port 1000")
app.listen(1000)