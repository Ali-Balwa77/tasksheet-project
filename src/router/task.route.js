const express = require('express')
const router = new express.Router()
const taskModel = require('../model/task')
const jwt = require('jsonwebtoken')

router.post('/createtask',async(req,res)=>{
    try {
        const taskheadername = req.body.taskHeadername
        const description = req.body.description
        const status = req.body.status
        const date = new Date().toDateString()
            const token = req.body.userId
            const decodedtoken = jwt.verify(token,process.env.TOKEN_KEY)
            const userId = decodedtoken.userId

            if(decodedtoken == decodedtoken){
                const user = new taskModel({
                    taskHeadername:taskheadername,
                    description:description,
                    status:status,
                    userId:userId,
                    date:date
                })
                const result = await user.save()
                console.log(result)
                res.status(201).json(result)
            }else{
                res.status(401).json('invalid userId')
            }
    } catch (error) {
        res.status(401).json('invalid request')
    }
})

router.get('/gettask',async(req,res)=>{
    try {
        const task = await taskModel.find()
        res.status(200).json(task)
    } catch (error) {
        res.status(404).json('task not found')
    }
})

router.get('/updatetask/:id',async(req,res)=>{
    try {
        const updatetask = await taskModel.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        })
        const data = await updatetask.save()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json('not updated')
    } 
})
router.get('/deletetask/:id',async(req,res)=>{
    try {
        const deletetask = await taskModel.findByIdAndDelete(req.params.id)
        if(!deletetask){
            return res.status(500).json()
        }else{
            res.status(200).json(deletetask)
        }
           
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router