const express = require('express')
const router  = express.Router();
const config = require('config')
var mongoose = require('mongoose');
const User = require('../../models/User')

router.post("/add", async(req,res) => { 
    const {first_name,last_name,age,dob,gender,phone,user_type} = req.body
    try{
         user = new User({
            first_name,
            last_name,
            age,
            dob,
            gender,
            phone,
            user_type,
            deleted:false
         })
         await user.save();
         res.json({user})
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

router.get("/",async(req,res) => {
    try{
        const user = await User.find()
        if(!user){
            res.status(400).json({msg:'No Users'})
        }
        res.json(user)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

router.post("/update", async(req,res) => { 
    const {first_name,last_name,age,dob,gender,phone,user_type,id} = req.body
    const userFields = {}
    if(first_name) userFields.first_name = first_name
    if(last_name) userFields.last_name = last_name
    if(age) userFields.age = age
    if(dob) userFields.dob = dob
    if(gender) userFields.gender = gender
    if(phone) userFields.phone = phone
    if(user_type) userFields.user_type = user_type
    try{
        let user = await User.findOne({_id:id})
        if(user){
            user = await User.findOneAndUpdate({_id:id},{ $set: userFields},{new:true})
            return res.json({user})
        }
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

router.post("/delete", async(req,res) => {
    const {id} = req.body
    try{
        console.log(id)
        let user = await User.findOne({_id:id})
        user.deleted = !user.deleted
        await user.save()
        return res.json({user})
    }catch(err){
        console.log(err)
    }
})


module.exports = router