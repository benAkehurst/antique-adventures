//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   D E P E N D E N C I E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const request = require('request');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const async = require("async");
//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   C O N F I G U R A T I O N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Makes Express avaliable
const app = express();
// Get our API routes
const api = require('./server/serverRoutes/api');
// Requirements
require('dotenv').config()
// Setting default server settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use(express.static(path.join(__dirname, 'dist'))); // Point static path to dist
// app.use('/api', api); // Set our api routes - if i want to use an api for a bigger project

// Connect to DB with mongoose
mongoose.Promise = global.Promise;
// Local DB
mongoose.connect("mongodb://localhost:27017/antiqueAdventuresDB", function (err) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Connected to Database")
    }
});
// Live DB
// mongoose.connect(process.env.DB_CONNECT, function (err) {
//     if (err) {
//         console.log("Error: " + err);
//     } else {
//         console.log("Connected to Database")
//     }
// });

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// ─── MODELS ─────────────────────────────────────────────────────────────────────
//
const User = require('./server/serverModels/userModel');
const Antique = require('./server/serverModels/antiqueModel');
//
// ─────────────────────────────────────────────────────────────────── MODELS ─────
//
//
// ─── LOGIN AND REGISTER ─────────────────────────────────────────────────────────
//
/**
 * Registers a user in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/registerUser', function (req, res, next) {
    var data = req.body.data;
    var user = new User({
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10)
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred with sign up',
                error: err
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(201).json({
            message: 'User created',
            success: true,
            token: token,
            obj: result
        });
    });
});

/**
 * Logs in a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/login', function (req, res, next) {
    var data = req.body.data;
    User.findOne({ email: data.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                success: false,
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            return res.status(401).json({
                success: false,
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            success: true,
            token: token,
            obj: user
        });
    });
});

//
// ─────────────────────────────────────────────────────── LOGIN AND REGISTER ─────
//

//
// ─── DATABASE ACTIONS ROUTES ───────────────────────────────────────────────────────
//
/**
 * Gets all the antiques in the database
 * @param {*} req
 * @param {*} res
 */
app.get("/getAllAntiques", function (req, res) {
    Antique.find({})
        .exec(function (err, user) {
            if (err) {
                console.log("Error: " + " " + err);
                res.send({success: false, message: err});
            } else {
                console.log(user);
                res.send({ success: true, data: antiques})
            }
        })
});

/**
 * Gets one antique in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/getAntique", function(req, res, next){
    Antique.findOneById({ _id: req.data.antique})
        .exec(function (err, user) {
            if (err) {
                console.log("Error: " + " " + err);
                res.send({ success: false, message: err });
            } else {
                console.log(user);
                res.send({ success: true, data: antiques })
            }
        })
});

/**
 * Saves a new Antique to the user model in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/saveNewAntique", function (req, res, next) {
    const data = req.body.data;
    const userId = req.body.data.user;
    const objectId = mongoose.Types.ObjectId(userId);

    const newRoute = new Route({
        locationOne: data.route.locationOne,
        locationTwo: data.route.locationTwo,
        locationThree: data.route.locationThree,
        user: objectId
    });
    newRoute.save(function (err, route) {
        if (err) {
            return next(err);
        }
        User.findByIdAndUpdate(
            userId,
            { $push: { savedRoutes: route._id } },
            function (err, user) {
                if (err) {
                    return next(err);
                }
                res.send({
                    success: true,
                    message: 'route saved'
                });
            }
        );
    });
});

/**
 * Edits an antique in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/editAntique", function(req,res, next){

});

/**
 * removes an antique in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/deleteAntique", function (req, res, next) {
    var routeId = req.body.data.route;
    var userId = req.body.data.user;
    async.parallel(
        {
            updateRoute: function (callback) {
                Route.findByIdAndRemove(routeId).exec(function (err, updatedRoute) {
                    callback(err, updatedRoute);
                });
            },
            updatedUser: function (callback) {
                User.findByIdAndUpdate(
                    userId,
                    { $pull: { savedRoutes: routeId } },
                    { new: true }
                ).exec(function (err, updatedUser) {
                    callback(err, updatedUser);
                });
            }
        },
        function (err, results) {
            if (err) {
                next(err);
                return;
            }
            res.send({ success: true, user: results.updatedUser });
        }
    );
});
//
// ───────────────────────────────────────────────────── DATABASE ACTIONS ROUTES ─────
//

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R U N   C O M M A N D S   A N D   P O R T   A C C E S S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);
// Creates an HTTP server
const server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));