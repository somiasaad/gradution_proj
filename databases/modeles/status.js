// import mongoose from "mongoose";
// const statusSchema = mongoose.Schema({

//     happy: {
//         type: Number
//     },
//     sad: {
//         type: Number
//     },
//     angry: {
//         type: Number
//     },
//     normal: {
//         type: Number
//     },
//     userStatus: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user'
//     }

// }, { timestamps: true })


// export const statusModel = mongoose.model('status', statusSchema)

// const mongoose = require('mongoose');

// const UserStatusSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     year: {
//         type: Number,
//         required: true
//     },
//     month: {
//         type: Number,
//         required: true,
//         enum: [Jan, Feb, Mer, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
//     },
//     day: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['happy', 'angry', 'normal', 'sad'],
//         required: true
//     }
// });

// module.exports = mongoose.model('UserStatus', UserStatusSchema);







// import mongoose from 'mongoose'
// const Schema = mongoose.Schema;

// const UserStatusSchema = new Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     year: [
//         {
//             year: String,
//             happy: Number,
//             angry: Number,
//             sad: Number,
//             normal: Number

//         }
//     ],
//     month: [
//         {
//             month: String,
//             happy: Number,
//             angry: Number,
//             sad: Number,
//             normal: Number

//         }
//     ],
//     week: [
//         {
//             weekNumber: Number,
//             happy: Number,
//             angry: Number,
//             sad: Number,
//             normal: Number
//         }
//     ],
//     day: [
//         {
//             dailyName: String,
//             happy: Number,
//             angry: Number,
//             sad: Number,
//             normal: Number
//         }
//     ]

// });

// export const statusModel = mongoose.model('UserStatus', UserStatusSchema);


// import mongoose from "mongoose";
// const statusSchema = mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user', // Reference to the User model, replace with your actual User model name
//         required: true
//     },
//     happy: {
//         type: Number,
//         default: 0
//     },
//     angry: {
//         type: Number,
//         default: 0
//     },
//     sad: {
//         type: Number,
//         default: 0
//     },
//     timestamps: {
//         happy: Date,
//         angry: Date,
//         sad: Date
//     }
// }, { timestamps: true });



// export const statusModel = mongoose.model('UserStatus', statusSchema);


import mongoose from "mongoose";

const statusSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model, replace with your actual User model name
        required: true
    },
    happy: {
        type: Number,
        default: 0
    },
    angry: {
        type: Number,
        default: 0
    },
    sad: {
        type: Number,
        default: 0
    },
    timestamps: {
        happy: { type: Date, default: Date.now },
        angry: { type: Date, default: Date.now },
        sad: { type: Date, default: Date.now }
    }
}, { timestamps: true });

export const statusModel = mongoose.model('UserStatus', statusSchema);