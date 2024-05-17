var http=require("http")
var fs=require('fs')
var url=require('url')
var users=[{"id":1,"name":"John"},{"id":2,"name":"Rithan"}]
const lib=require("./factorial.js")
var server=http.createServer((req,res)=>
{
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    const id = queryParams.id;
    if(req.url==='/')
        {
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write("<h1>THIS IS HOMEPAGE</h1>")
            res.end()
        }
    else if(req.url==='/students')
        {
            var data=fs.readFileSync("./students.json")
            res.write(data);
            res.end()   
        }
    else if(req.url==='/users')
        {
            res.write(JSON.stringify(users))
            res.end()
        }
    else if(req.url==='/website')
        {
            var html1=fs.readFileSync("./index.html")
            res.write(html1)
            res.end()
        }
    else if(req.url.includes("/fact"))
        {
            res.write("Factorial of number is  ")
            res.write(JSON.stringify(lib.fact(id)))
            res.end()
        }
    else
    {
        var img=fs.readFileSync("404notfound.png")
        //res.write(img)
        res.write("No end points found")
        res.end()
    }
})
server.listen(6203)
console.log("server listening at port 6203")