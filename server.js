const http=require('node:http')
let db=[]


const server=http.createServer(reqServer)


function reqServer(req,res){
    if(req.url==='/' && req.method==="GET"){
       res.end(JSON.stringify({data:db, message:'This is the data base'}))
       console.log(db)
    }

     else if(req.url==="/" && req.method==="POST"){
        let body=[]

        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const joke=JSON.parse(parsedBody)
            db.push(joke)
            res.end(JSON.stringify(db))
            console.log(db)
        })
     }
     else if(req.url.split("")[0]==="/" && req.method==="PATCH"){
        let body=[]

        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const jokeUpdate=JSON.parse(parsedBody)

            const updateID=req.url.split("")[1];

            const dataIndex=db.findIndex((item)=>item.id===updateID)
            db[dataIndex]= {...db[dataIndex], ...jokeUpdate}

            res.writeHead(200)
            res.end(JSON.stringify(jokeUpdate))
            console.log(dataIndex)

     })
    }
    else if(req.url.split("")[0]==="/" && req.method==="DELETE"){
        let body=[]

        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const jokeDelete=JSON.parse(parsedBody)

            const deleteID=req.url.split("")[1];

            const dataIndex=db.findIndex((item)=>item.id===deleteID)
            db[dataIndex]= {...db[dataIndex], ...jokeUpdate}

            res.writeHead(200)
            res.end(JSON.stringify(jokeDelete))
            console.log(dataIndex)

     })
    }
     else{
        res.writeHead(404)
        res.end(JSON.stringify({message:'not found'}))
     }

}

function postJoke(req,res){


    res.on('data', (chunk) => {
      db += chunk;
    });
  
    res.on( () => {
        res.end(JSON.stringify(db))
      console.log('Response:', db);
        
});
}

server.listen(4000,"localhost",()=>{
    console.log('The server is up and running')
})