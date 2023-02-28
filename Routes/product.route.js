const express=require("express")
const Product=require("../Model/product.model")

const app=express.Router()



app.post("/",async(req,res)=>
{

    try
    {
        await Product.create({...req.body})
        res.send({msg:"Product Add Successfully"})
    }
    catch(e)
    {
        console.log(e)
        res.send(e)
    }
})


app.get("/",async(req,res)=>
{
    let {page,category,search}=req.query
    
    try
    {
        if(search)
        {
            let data=await Product.find({name:{$regex:search}}).limit(4).skip(4*(+page-1)) 
            res.send(data)
        }
       else if(category)
        {
            let data=await Product.find({category:category}).limit(4).skip(4*(+page-1))
            res.send(data)
        }
        else
        {
            let data=await Product.find().limit(4).skip(4*(+page-1))  
      
            res.send(data)
        }

       
    }
    catch(e)
    {
        res.send(e)
    }
})

app.delete("/:id",async(req,res)=>
{
    let id=req.params.id
    try
    {
        await Product.findOneAndDelete({_id:id})
        res.send({msg:"Product Deleted Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})

module.exports=app