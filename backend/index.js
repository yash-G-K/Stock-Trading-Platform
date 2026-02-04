const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;
const Holdingmodel = require("./model/Holdingmodel");
const Positionmodel = require("./model/positionmodel");
const { ordermodel } = require("./model/ordermodel");
const Usermodel = require("./model/Usermodel");
const bcrypt = require("bcryptjs");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB then start server
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => console.log(`Server is running on port: ${port}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        // do not exit here so developer can inspect logs if needed
    });

// Routes
// app.get("/addHoldings", async (req, res) => {
//     try {
//         const tempholdings = [
//             {
//                 name: "BHARTIARTL",
//                 qty: 2,
//                 avg: 538.05,
//                 price: 541.15,
//                 net: "+0.58%",
//                 day: "+2.99%",
//             },
//             {
//                 name: "HDFCBANK",
//                 qty: 2,
//                 avg: 1383.4,
//                 price: 1522.35,
//                 net: "+10.04%",
//                 day: "+0.11%",
//             },
//             {
//                 name: "HINDUNILVR",
//                 qty: 1,
//                 avg: 2335.85,
//                 price: 2417.4,
//                 net: "+3.49%",
//                 day: "+0.21%",
//             },
//             {
//                 name: "INFY",
//                 qty: 1,
//                 avg: 1350.5,
//                 price: 1555.45,
//                 net: "+15.18%",
//                 day: "-1.60%",
//                 isLoss: true,
//             },
//             {
//                 name: "ITC",
//                 qty: 5,
//                 avg: 202.0,
//                 price: 207.9,
//                 net: "+2.92%",
//                 day: "+0.80%",
//             },
//             {
//                 name: "KPITTECH",
//                 qty: 5,
//                 avg: 250.3,
//                 price: 266.45,
//                 net: "+6.45%",
//                 day: "+3.54%",
//             },
//             {
//                 name: "M&M",
//                 qty: 2,
//                 avg: 809.9,
//                 price: 779.8,
//                 net: "-3.72%",
//                 day: "-0.01%",
//                 isLoss: true,
//             },
//             {
//                 name: "RELIANCE",
//                 qty: 1,
//                 avg: 2193.7,
//                 price: 2112.4,
//                 net: "-3.71%",
//                 day: "+1.44%",
//             },
//             {
//                 name: "SBIN",
//                 qty: 4,
//                 avg: 324.35,
//                 price: 430.2,
//                 net: "+32.63%",
//                 day: "-0.34%",
//                 isLoss: true,
//             },
//             {
//                 name: "SGBMAY29",
//                 qty: 2,
//                 avg: 4727.0,
//                 price: 4719.0,
//                 net: "-0.17%",
//                 day: "+0.15%",
//             },
//             {
//                 name: "TATAPOWER",
//                 qty: 5,
//                 avg: 104.2,
//                 price: 124.15,
//                 net: "+19.15%",
//                 day: "-0.24%",
//                 isLoss: true,
//             },
//             {
//                 name: "TCS",
//                 qty: 1,
//                 avg: 3041.7,
//                 price: 3194.8,
//                 net: "+5.03%",
//                 day: "-0.25%",
//                 isLoss: true,
//             },
//             {
//                 name: "WIPRO",
//                 qty: 4,
//                 avg: 489.3,
//                 price: 577.75,
//                 net: "+18.08%",
//                 day: "+0.32%",
//             },
//         ];
//         console.log("Adding holdings...");

//         // Use Promise.all to wait for all saves to complete
//         await Promise.all(tempholdings.map(item => {
//             const newholding = new Holdingmodel({
//                 name: item.name,
//                 qty: item.qty,
//                 avg: item.avg,
//                 price: item.price,
//                 net: item.net,
//                 day: item.day,
//             });
//             return newholding.save();
//         }));

//         res.send("Holdings added");
//     } catch (error) {
//         console.error("Error adding holdings:", error);
//         res.status(500).json({ error: error.message });
//     }
// });


// app.get("/addpositions", async (req, res) => {
//     try {
//         const positions = [
//             {
//                 product: "CNC",
//                 name: "EVEREADY",
//                 qty: 2,
//                 avg: 316.27,
//                 price: 312.35,
//                 net: "+0.58%",
//                 day: "-1.24%",
//                 isLoss: true,
//             },
//             {
//                 product: "CNC",
//                 name: "JUBLFOOD",
//                 qty: 1,
//                 avg: 3124.75,
//                 price: 3082.65,
//                 net: "+10.04%",
//                 day: "-1.35%",
//                 isLoss: true,
//             },
//         ];

//         await Promise.all(positions.map(item => {
//             const newposition = new Positionmodel({
//                 product: item.product,
//                 name: item.name,
//                 qty: item.qty,
//                 avg: item.avg,
//                 price: item.price,
//                 net: item.net,
//                 day: item.day,
//                 isLoss: item.isLoss,
//             });
//             return newposition.save();
//         }));
//         res.send("Positions added");
//     } catch (error) {
//         console.error("Error adding positions:", error);
//         res.status(500).send("Error adding positions: " + error.message);
//     }
// });


app.get("/allholdings", async (req, res) => {
    let allholdings = await Holdingmodel.find({});
    res.json(allholdings);
});

app.get("/allpositions", async (req, res) => {
    let allpositions = await Positionmodel.find({});
    res.json(allpositions);
});

// Create new order
app.post("/neworder", async (req, res) => {
    try {
        const { name, qty, price, orderType, productType } = req.body;

        // Validate required fields
        if (!name || !qty || !price || !orderType || !productType) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["name", "qty", "price", "orderType", "productType"]
            });
        }

        const newOrder = new ordermodel({
            name,
            qty: Number(qty),
            price: Number(price),
            orderType,
            productType
        });

        await newOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
app.get("/allorders", async (req, res) => {
    try {
        let allorders = await ordermodel.find({});
        res.json(allorders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: error.message });
    }
});

// ==================== USER AUTHENTICATION ROUTES ====================

// SIGNUP ROUTE - Register a new user
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // 1. Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and password"
            });
        }

        // 2. Check if user already exists
        const existingUser = await Usermodel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // 3. Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // 4. Hash the password for security
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 5. Create new user
        const newUser = new Usermodel({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone: phone || ""
        });

        // 6. Save to database
        await newUser.save();

        // 7. Return success (don't send password back)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        // Handle validation errors from Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error during signup",
            error: error.message
        });
    }
});

// LOGIN ROUTE - Authenticate existing user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // 2. Find user by email
        const user = await Usermodel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Login successful
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error.message
        });
    }
});

// GET USER BY ID - Fetch user details
app.get("/user/:id", async (req, res) => {
    try {
        const user = await Usermodel.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: user
        });

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user details",
            error: error.message
        });
    }
});

