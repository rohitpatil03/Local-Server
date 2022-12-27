const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

const PORT = 8080
server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))
server.use(fileUpload())

let files_array = []
function checkFilesDir(){
    const fullPath = path.join(__dirname, 'uploads')
    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
            files_array = files
        //files.forEach( file => files_array.push(file))
    })

}



server.get("/home", (req, res)=>{
    //res.send("Server is running ...")
    checkFilesDir()
    res.render("home", {"data":files_array})
})

server.get("/download/:element", (req, res)=>{
    //res.send("Server is running ...")
    //res.render("home", {"data":files_array})
    var file = req.params.element
    checkFilesDir()
    res.download(__dirname+`/uploads/${file}`)
})

server.delete("/delete/:element", (req, res)=>{
    //res.send("Server is running ...")
    //res.render("home", {"data":files_array})
    var file = req.params.element
    fs.unlink(__dirname+`/uploads/${file}`, (err)=>{
        if(err){
            console.log(err)
        }
    })
    checkFilesDir()
    res.render("home", {"data":files_array})
})

server.get("/upload", (req, res)=>{
    //res.send("Server is running ...")
    checkFilesDir()
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
            checkFilesDir()
        }
        else{
            for (let i = 0; i < files.length; i++) {
                files[i].mv('./uploads/'+files[i].name, (err)=>{
                    if (err){
                        console.log(err)
                    }
                })
                checkFilesDir()
            }
        }
        res.render("fileupload", {"status":"Uploaded Successfully"})
    }
    else{
        res.render("fileupload", {"status":"Error in Uploading"})
    }
})

server.listen(PORT, (req, res)=>{console.log(`Server is running on port ${PORT}`)})