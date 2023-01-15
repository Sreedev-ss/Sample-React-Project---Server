const db = require('../model/db')
const jwt =  require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    getUser: async (req,res) =>{
        console.log("hi");
        const data = await db.user.find({})
        res.json(data)
    },

    signup:async(req,res) => {
       try {
         let data = {
             name : req.body.name,
             email : req.body.email,
             mobile : req.body.mobile,
             password : req.body.password
         }
         
         const user = await db.user(data)
         await user.save()
         res.send({status:true})

       } catch (error) {
            console.log(error.message);
            res.send({status:false})
       }    
        
    },

    login : async(req,res) => {
        try {
            let data = {
                email : req.body.email,
                password : req.body.password
            }
            let userData = await db.user.findOne({email:data.email})

                if(userData) {
                    if(userData.password == data.password){
                        
                        const data = userData.email
                        const email = {email:data}
                        
                        const accessToken = jwt.sign(email,process.env.ACCESS_TOKEN_SECRET)
                        res.send({status : true,email:userData.email,accessToken:accessToken})

                    }else{
                        res.send({status:false})
                    }
                 }else{
                    res.send({status:false})
                 }

        } catch (error) {
            
        }
    },

    getUserData:async(req,res)=>{
        try {
            let email = req.body.email
            const userData = await db.user.findOne({email:email})
            res.json(userData.name)
        } catch (error) {
            res.send({error:error.message})
        }
    },


    deleteUser : async(req,res) => {
        try {   
            let uid = req.body.id
            db.user.deleteOne({_id:uid}).then(()=>{
                res.send({delete:true})
            }).catch((error)=>{
                res.send({error:error.message})
            })
        } catch (error) {
            console.log(error);
        }
    },

    editUser : async(req,res) => {
        try {
            let data = {
                id:req.body.id,
                name : req.body.name,
                email : req.body.email,
                mobile : req.body.mobile
            }

           db.user.updateOne({_id:data.id},{
            $set:{
                name : req.body.name,
                email : req.body.email,
                mobile : req.body.mobile,
            }
           }).then(()=>{
               res.send({update:true})
           }).catch((error)=>{
            res.send({error:error.message})
           })

        } catch (error) {
            console.log(error);
        }
    }


}

