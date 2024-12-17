// This are all requirements which is needed in our website
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("../db/dataBase");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const Register = require("../model/registerModel");
const User = require("../model/userModel");
const cors = require('cors');

const ApiFeatures = require("../utils/ApiFeatures");
const { isAuthenticated, autorizeRoles } = require("../utils/isAuthenticated");
const order = require("../model/orderModel");

// The usable things of our website

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// products api to add products to our e commerce website

app.post(
  "/product/new",
  isAuthenticated,
  autorizeRoles("admin"),
  async (req, res) => {
    // const [ name ,email ,password ,category ,stock ,price ,description ,numOfReview ,review ,createdAt ] = req.body

    try {
      const User = await new Register(req.body);

      await User.save();
      console.log(User);

      res.status(201).send("The new products is added to the website");
    } catch (error) {
      res.status(401).send(`there is a error in this page ${error}`);
    }
  }
);

app.get("/products", async (req, res) => {
  try {

    const numOfPdt=3;
    const countedProducts = await Register.find()

    const productCount = countedProducts.length
  

    const apifeature = new ApiFeatures(Register.find(), req.query)
      .search()
      .filter()
      .pagination(numOfPdt);

    const products = await apifeature.query;

    res.status(201).send({products,numOfPdt,productCount});
  } catch (error) {
    res
      .send(401)
      .send(
        `There is an error getting all the products of our website : ${error}`
      );
  }
});

app.get("/products/detail/:_id" , async (req, res) => {
  try {

    // const numOfPdt = 8;

    // const apifeature = new ApiFeatures(Register.find(), req.query)
    //   .search()
    //   .filter()
    //   .pagination(numOfPdt);

    // const products = await apifeature.query;

    // res.status(201).send(products);

    const product = await Register.findById({ _id: req.params._id });
    console.log("product=============>",product);

    res
    .status(201)
    .send( product );

  } catch (error) {
    res
      .send(401)
      .send(
        `There is an error getting all the products of our website : ${error}`
      );
  }
});

app.delete(
  "/products/:_id",
  isAuthenticated,
  autorizeRoles("admin"),
  async (req, res) => {
    try {
      const product = await Register.findOneAndDelete({ _id: req.params._id });
      console.log(product);

      res
        .status(201)
        .send(`The specific product is being deleted : ${product}`);
    } catch (error) {
      res
        .status(401)
        .send(
          `There is an error in deleting the product of our website : ${error}`
        );
    }
  }
);

app.put(
  "/product/updateData",
  isAuthenticated,
  autorizeRoles("admin"),
  async (req, res) => {
    try {
      const product = await Register.findById(req.body._id);
      console.log(!product);

      if (!product) {
        res.send("Such a product dosen't exist");
      }

      product.name = req.body.name;
      product.email = req.body.email;
      product.category = req.body.category;
      product.stock = req.body.stock;
      product.price = req.body.price;
      product.description = req.body.description;

      await product.save();
      res.send(
        `The product details are updated and new details are : ${product}`
      );
    } catch (error) {
      res.send(`There is some error in updatig the new product : ${error}`);
    }
  }
);

app.put(
  "/product/updatePassword",
  isAuthenticated,
  autorizeRoles("admin"),
  async (req, res) => {
    try {
      const specificProduct = await Register.findById(req.body._id);

      console.log(specificProduct);

      if (!specificProduct) {
        return res.send("User not found.");
      }

      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const confirmNewPassword = req.body.confirmPassword;

      console.log(specificProduct.password);

      if (specificProduct.password !== oldPassword) {
        res.send("Please type the old password correct .");
      }

      if (newPassword !== confirmNewPassword) {
        res.send(
          `The new password and confirm new password dosen't matches so please type them correctly.`
        );
      }

      specificProduct.password = newPassword;

      await specificProduct.save();

      res.send({specificProduct});
    } catch (error) {
      res.send({error});
    }
  }
);

app.put("/product/createReview", isAuthenticated, async (req, res) => {
  try {
    const SpecificProduct = await Register.findById(req.body._id);

    if (!SpecificProduct) {
      res.send("There no such product exist");
    }

    const review = req.body.review;

    await SpecificProduct.reviews.push({review});

    SpecificProduct.numOfReview = SpecificProduct.reviews.length;

    await SpecificProduct.save();

    res.send({SpecificProduct});
  } catch (error) {
    res.send({error});
  }
});

app.put("/product/deleteReview/:_id", isAuthenticated, async (req, res) => {
  try {
    const SpecificProduct = await Register.findById(req.body._id);

    if (!SpecificProduct) {
      res.send("There no such product exist");
    }

    const updatedReviews = SpecificProduct.reviews.filter(
      (review) => review._id.toString() !== req.params._id
    );

    SpecificProduct.reviews = updatedReviews;

    SpecificProduct.numOfReview = SpecificProduct.reviews.length;

    await SpecificProduct.save();

    res.send({SpecificProduct});
  } catch (error) {
    res.send({error});
  }
});

// Products API get over here

// ________________________________________________________________________________________________

// Users api of our website

app.post("/user/new", async (req, res) => {
  try {
    const user = new User(req.body);

    const token = await user.getJwtToken();
    console.log(token,"token");

    const options = {
      expire: new Date(
        Date.now() + process.env.JWT_COOKIEEXPIRE * 1000 * 60 * 60 * 24
      ),
      httpOnly: true,
    };

    res.cookie("token", token, options);

    await user.save();

    res
      .status(201)
      .send({user});
  } catch (error) {
    res
      .status(401)
      .send({error});
  }
});

app.get("/users", isAuthenticated, autorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find();

    console.log(users);

    res
      .status(201)
      .send(users);
  } catch (error) {
    res
      .status(401)
      .send(error);
  }
});

// app.get("/users/login" , async(req,res)=>{

//         try {
//             const {email,password} = req.body

//             const specificUser = await User.findOne({email})

//             const token = await specificUser.getJwtToken()

//             const options = {
//                 expires: new Date( Date.now() + process.env.JWT_COOKIEEXPIRE * 1000 * 60 * 60 * 24),
//                 httpOnly:true
//             }

//             res.cookie("token" , token , options)

//             const comparePassword = await bcrypt.compare(password,specificUser.password)

//             if (comparePassword) {

//                 await specificUser.save()

//                 res.status(201).send(`The user is being login successfully ! : ${specificUser} and token generated is : ${token}`)
//             }
//             else{
//                 res.send(" Please enter the correct email adn password !")
//             }

//         }

//         catch (error) {
//             res.send(`Please enter the correct email and password : ${error}`)
//         }

// })

// to log out we need email for verification

app.post("/user/login",cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const specificUser = await User.findOne({ email });

    if (!specificUser) {
      return res
        .status(400)
        .send("Please enter the correct email and password!");
    }

    const comparePassword = await bcrypt.compare(
      password,
      specificUser.password
    );

    if (comparePassword) {
      const token = await specificUser.getJwtToken();
      const options = {
        expire: Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
      };
      res.cookie("token", token, options);

      await specificUser.save();
      res
        .status(200)
        .send({specificUser , token});
        
    } else {
      res.status(400).send({specificUser});
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error}`);
  }
});

app.get("/users/logout",cors(), async (req, res) => {
  try {
    // Use findOne to find user by email
    const specificUser = await User.findOne({ email: req.body.email });
    console.log(specificUser);
    if (!specificUser) {
      return res.status(404).send("User not found");
    }
    // Assuming you want to invalidate all tokens or a specific one, add your logic in filter()
    // For example, to remove all tokens:
    specificUser.tokens = [];

    res.clearCookie("token");
    // Alternatively, to filter out a specific token, you might need additional information from req.body
    // specificUser.tokens = specificUser.tokens.filter(token => token !== theTokenToInvalidate);

    await specificUser.save();

    res.status(200).send("The user has been logged out successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("There is some error in logging out");
  }
});

app.post("/users/resetPassword",cors(), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(res.send("User not found !"));
  }

  const token = await user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/login/resetPassword/${token}`;

  const message = `Your rest password token :-\n\n ${resetPasswordUrl}\n\n And you have not requested for thisreset password then please ignore the email.`;

  const subject = "This mail consist of the reset password link.";

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Secure SSL port
      service: "gmail",
      auth: {
        user: "shraddha9577@gmail.com",
        pass: "sunscribetomychannel",
      },
    });

    const mailOptions = {
      from: "shraddha9577@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    };

    await transporter.sendMail(mailOptions);

    res.send("Check you mail you must have got a link to rest your password");
  } catch (error) {
    res.send(
      `There is some error in sending the email please check the code : ${error}`
    );
  }
});

app.post("/users/resetPassword/newpassword",cors(), async (req, res) => {});

app.put("/users/updatePassword", cors(), isAuthenticated, async (req, res) => {
  try {
    const specificUser = await User.findById(req.body._id);
    if (!specificUser) {
      return res.status(404).send("User not found.");
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmPassword;

    console.log(specificUser.password);

    const comparePassword = await bcrypt.compare(
      oldPassword,
      specificUser.password
    );
    console.log(comparePassword);

    if (!comparePassword) {
      res.send("Please type the old password correct .");
    }

    if (newPassword !== confirmNewPassword) {
      res.send(
        `The new password and confirm new password dosen't matches so please type them correctly.`
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    specificUser.password = hashedNewPassword;

    await specificUser.save();

    res.send(
      `Your password is updated and the updated user is : ${specificUser}`
    );
  } catch (error) {
    res.send(`There is some error in updating user password : ${error}`);
  }
});

app.put("/users/updateDetails", cors(), isAuthenticated, async (req, res) => {
  try {
    const specificUser = await User.findById(req.body._id);
    if (!specificUser) {
      return res.status(404).send("User not found.");
    }

    const updateName = req.body.updateName;
    const updateEmail = req.body.updateEmail;

    specificUser.name = updateName;
    specificUser.email = updateEmail;

    await specificUser.save();

    res.send(
      `Your details are updated and the user looks like this : ${specificUser}`
    );
  } catch (error) {
    res.send(`There is some error in updating user details : ${error}`);
  }
});

app.put("/users/updateDetails/role/:_id", cors(), isAuthenticated,autorizeRoles("admin"), async (req, res) => {
  try {
    const specificUser = await User.findById(req.params._id);
    if (!specificUser) {
      return res.status(404).send("User not found.");
    }

    const updateRole = req.body.role;

    specificUser.role = updateRole;

    await specificUser.save();

    res.send(specificUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.get("/users/:_id", cors(), isAuthenticated, async (req, res) => {
  try {
    const userDetails = await User.findById(req.params._id);

    // console.log(userDetails);

    res.send(userDetails);
  } catch (error) {
    res.send(error);
  }
});

app.delete( "/users/admin/:_id",cors(),isAuthenticated,autorizeRoles("admin"),async (req, res) => {
    try {
      const userDetails = await User.findById({_id:req.params._id});

      await userDetails.deleteOne()

      console.log(userDetails);

      res.send(userDetails);
    } catch (error) {
      res.status(401).send(error);
    }
  }
);

// user api section get over here

// Orders api section starts from here

app.post("/orders/newOrder",cors(), isAuthenticated, async (req, res) => {

  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      paitAt,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
      deliveredAt,
      createdAt,
    } = req.body;
  
    const Order = new order({
        shippingInfo,
        orderItems,
        user:req.user._id,
        paymentInfo,
        paitAt,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
        deliveredAt,
        createdAt,
    })

    await Order.save()

    res.send(Order)

  } catch (error) {
    res.status(404).send(error)
  }

});

app.get("/orders/:_id" ,cors(), isAuthenticated , async(req,res,next)=>{
  try {

    const Order = await order.findById({_id:req.params._id})
    .populate(
      "user",
      "name email"
    )

    if (!Order) {
      return next(res.send("Such a order dosen't exist"))
    }

    await Order.save()
    res.send(Order)
  } 
  catch (error) {
    res.send(error)
  }
})

app.get("/orders/user/myorders/:_id",cors(), isAuthenticated,async(req,res,next)=>{
  try {
    const Order = await order.find({user:req.params._id})

    if (!Order) {
      return next(res.send("You have no orders yet !"))
    }

    res.send(Order)

  } catch (error) {
    res.status(404).send(error)
  }
})

app.delete("/order/deleteOrder/:_id",cors(), isAuthenticated , async(req,res,next)=>{
  try {
    const Order = await order.findById({_id:req.params._id})

    await Order.deleteOne()

    console.log(Order);

    res.send(Order)

  } catch (error) {
    res.status(400).send(error)
  }
})

app.get("/orders/user/admin-orders-dashboard",cors(), isAuthenticated , autorizeRoles("admin") , async(req,res,next)=>{
  try {
    const Order = await order.find()

    if (!Order) {
      return next(res.send("You have no orders yet !"))
    }

    res.send(Order)

  } catch (error) {
    res.status(401).send(error)
  }
})

app.put("/orders/admin-orders-dashboard/updateStatusOrder",cors(), isAuthenticated , autorizeRoles("admin") , async(req,res,next)=>{
  try {
    const Order = await order.findOne({_id:req.body.id})
    console.log(Order.orderStatus);

    // if (Order.orderStatus === "Delivered") {
    //   return next(
    //     res.send("Your order is already delivered")
    //   )
    // }

    Order.orderStatus = req.body.status

    if (req.body.status === "Delivered") {
      Order.deliveredAt = Date.now()
      Order.orderItems.forEach( async (element) => {
        const product = await Register?.findById(element.product)
  
        product.stock = product.stock - element.quantity
        await  product.save()
      })
    }

    await Order.save()

    res.send(Order)

  } catch (error) {
    console.log("error=========>",error);
    res.status(400).send(error)
  }
})

app.delete("/orders/user/admin-orders-dashboard/deleteOrder/:_id",cors(), isAuthenticated , autorizeRoles("admin") , async(req,res,next)=>{
  try {
    const Order = await order.findOne({_id:req.params._id})

    await Order.deleteOne()

    res.send(`Your specific order has been deleted : ${Order}`)

  } catch (error) {
    res.send(`There is som error in listing your orders : ${error}`)
  }
})

// Order api section get over here

// ____________________________________________________________________________________________

// The UI Routing of our website

app.get("/", (req, res) => {
  res.send("This is a very nice website !");
});

app.listen(port, () => {
  console.log(`The website is live at port : ${port}`);
});
