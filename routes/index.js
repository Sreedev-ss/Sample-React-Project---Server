var express = require('express');
var router = express.Router();
const usercontroller = require('../controller/userController')
const jwt  = require('jsonwebtoken')

require('dotenv').config()

const authenticateToken = (req,res,next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token,'==token');

  if(token == null ) return res.sendStatus(401)
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)
    req.user = user
  })
  
  next()

}

/* GET home page. */
router.get('/get-user',authenticateToken,(req,res)=>{
  res.send(req.user)
})

router.post('/get-userdata',authenticateToken,usercontroller.getUserData)

router.get('/user-data',authenticateToken,usercontroller.getUser)

router.post('/signup' ,usercontroller.signup)

router.post('/login' ,usercontroller.login)

router.delete('/delete-user',authenticateToken,usercontroller.deleteUser)

router.put('/update-user',authenticateToken,usercontroller.editUser)

module.exports = router;
