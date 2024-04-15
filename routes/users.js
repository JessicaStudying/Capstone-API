import express from 'express'

const usersRouter = express.Router();

usersRouter.get('/',(req,res)=>{
    res.json('this is users')
})

export default usersRouter