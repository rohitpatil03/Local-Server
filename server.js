const express = require('express')
const fileUpload = require('express-fileupload')

const PORT = 4000
server = express()

server.set('view engine', 'ejs')
server.use(fileUpload())

server.get("/", (req, res)=>{
    //res.send("Server is running ...")
    res.render("fileupload", {"name":"rohit"})
})

server.get("/upload", (req, res)=>{
    //res.send("Server is running ...")
    res.render("fileupload", {"status":""})
})

server.post("/upload", (req, res)=>{
    if (req.files){
        const files = req.files.filename

        if (files.length==undefined){
            files.mv('./uploads/'+files.name, (err)=>{
                if (err){
                    console.log(err)
                }
            })
        }
        else{
            for (let i = 0; i < files.length; i++) {
                files[i].mv('./uploads/'+files[i].name, (err)=>{
                    if (err){
                        console.log(err)
                    }
                })
            }
        }
        res.render("fileupload", {"status":"Uploaded Successfully"})
    }
    else{
        res.render("fileupload", {"status":"Error in Uploading"})
    }
})

server.listen(PORT, (req, res)=>{console.log(`Server is running on port ${PORT}`)})