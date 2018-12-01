const express = require('express');
const jwt = require('jwt-simple');

const router = express.Router();

const { User } = require('../db').models;



// router.get('/', (req, res, next) => {
//   if(!req.user) {
//     next({ status: 401 })
//   }

//   res.send(req.user)
// })

router.post('/login', (req, res, next) => {

  const { username, password } = req.body

  User.findOne({
    where: { username, password }
  })
  .then(user => {
     if(!user) {
       return next({ status: 401 })
     }

     const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
     res.send({ token })
  })
  .catch(error=> next(error))

})



module.exports = router
