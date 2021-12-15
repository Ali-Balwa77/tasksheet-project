const express = require('express')
const router = new express.Router()
const userModel = require('../model/user')
const jwt = require('jsonwebtoken')

// function verifytoken (req,res,next){
//     try {
//         console.log(`this is ${req.body.userId}`)
//         const token = req.token
//         const decodedtoken = jwt.verify(token,process.env.TOKEN_KEY)
//         console.log(decodedtoken)
//         if(decodedtoken == decodedtoken){
//             res.render('dashboard')
//         }else{
//             res.render('login')
//         }
//         next()
//     } catch (error) {
//         res.status(404).json('token not found')
//     }
    
// }

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/register',async(req,res)=>{
    res.render('register')
})

router.post('/register',async(req,res)=>{
    try {
        const username = req.body.user_name
        const email = req.body.email
        const password = req.body.password
        const confirm_password = req.body.confirm_passoword
        
        if(password === confirm_password){
            if(password.length >= 6){
                if(email === userModel.findOne({email:email})){
                    res.json('Email already Exists!')
                }
                    const registeruser = new userModel({
                        name:username,
                        email:email,
                        password:password
                    })
                    const data = await registeruser.save()
                    // console.log(data)
                    res.render('login')
            }else{
                res.sa.json('password can must be 6 character')
            }
        }else{
            res.json('Password can be not match!')
        }

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
        await userModel.findOne({email:req.body.email})!==null&&
        await userModel.findOne({email:req.body.email,password:req.body.password})
        .then(user=>{
            console.log('this i token')
            if(user!==null){
                const token = jwt.sign({userId:user._id},process.env.TOKEN_KEY,{expiresIn:86400})
                
                // localStorage.setItem('usertoken',token)
                res.render('login')
                console.log(token)
                return res.status(200).json({
                    userId:user._id,
                    token:token
                })
                // console.log((`${token} login Succesfully`))
                // res.redirect('dashboard')
                
            }else{
                res.send("password is incorrect");
            }
        }).catch(err=>res.json(err))
        
        // !==null?(
            
        //     res.send("Login Succesfull")
        
        // ):res.send("Password is incorrect")
        // :res.send("no user with this email")
        // const token = jwt.sign({_id:user._id},process.env.TOKEN_KEY)
})

router.get('/dashboard',(req,res)=>{
    
})    

router.get('/logout',(req,res)=>{
    res.redirect('login')
})

module.exports = router


