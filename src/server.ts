import express from "express";


const app  = express();

app.get('/',(req,res)=>{
    res.json({message:"Hello World"})

})
const PORT = 5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})