const http=require('node:http')
const db=[


]


const server=http.createServer(reqServer)


function reqServer(req,res){
    if(req.url==='/' && req.method==="GET"){
       res.end(JSON.stringify({data:db, message:'This is the data base'}))
       console.log(db)
    }

     else if(req.url==="/" && req.method==="POST"){
        postJoke(req,res)
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