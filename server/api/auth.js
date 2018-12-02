const express = require('express');
const jwt = require('jwt-simple');

const router = express.Router();

const { User } = require('../db').models;

router.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET || 'dummysecret').id;
  } catch (ex) {
    return next({ status: 401, message: "Error finding logged in user" });
  }
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});

// router.get('/', (req, res, next) => {
//   if(!req.user) {
//     next({ status: 401 })
//   }

//   res.send(req.user)
// })

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({
    where: { email, password }
  })
  .then(user => {
     if (!user) {
       return next({ status: 401, message: "Could not find user" })
     }
     const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET || 'dummysecret')
     res.send({ token })
  })
  .catch(error => next(error))
})

router.get('/me', (req, res, next) => {
  if (!req.user) {
    return next({ status: 401, message: "No user set" });
  }
  res.send(req.user);
});

module.exports = router
