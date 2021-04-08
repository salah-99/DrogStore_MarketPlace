const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
const data = require("../data");
const generateToken = require("../utils");


const userRouter = express.Router();

// Get Users
userRouter.get('/send', expressAsyncHandler(async (req, res) =>{
    // await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({createUsers});
}));

// Signin
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// Registration
userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser),
      });
    })
  );

// // User Details
// userRouter.get(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send({ message: 'User Not Found' });
//     }
//   })
// );

// // Update User
// userRouter.put('/profile', expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       // if (user.isSeller) {
//       //   user.seller.name = req.body.sellerName || user.seller.name;
//       //   user.seller.logo = req.body.sellerLogo || user.seller.logo;
//       //   user.seller.description =
//       //     req.body.sellerDescription || user.seller.description;
//       // }
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }
//       const updatedUser = await user.save();
//       res.send({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         // isSeller: user.isSeller,
//         token: generateToken(updatedUser),
//       });
//     }
//   })
// );

module.exports = userRouter;