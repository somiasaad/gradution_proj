import { userModel } from "../../../databases/modeles/user.js";
import { statusModel } from '../../../databases/modeles/status.js'
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendToEmail, sendToEmailToResetPassword } from "../mails/sendEmail.js";
import i18n from "i18n";


const signUp = catchAsyncError(async (req, res, next) => {
    const gmail = await userModel.findOne({ email: req.body.email })
    if (gmail) return next(new AppError("Account Already Exist", 403))

    if (req.file) {
        req.body.imgCover = req.file.filename
    }
    req.body.fullname = req.body.firstname + " " + req.body.lastname
    const user = new userModel(req.body)
    await user.save()
    const createStatus = await new statusModel({ userId: user._id })
    sendToEmail({ email: req.body.email })
    res.json({ message: "success", user })
})

const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return next(new AppError("Account Not Found", 401))
    if (!(await bcrypt.compare(password, user.password))) return next(new AppError("Password Wrong", 403))
    if (!user.confrimEmail) return next(new AppError("Please Verfiy Your Email and Login Again"))
    let token = jwt.sign({ email: user.email, userId: user._id, firstname: user.firstname, lastname: user.lastname, fullname: user.fullname }, 'moracp57');
    res.json({ message: "success", user, token })
})

const verfiyEmail = catchAsyncError(async (req, res, next) => {
    const { token } = req.params
    jwt.verify(token, 'email123456', async function (err, decoded) {
        if (err) return next(new AppError("Not Verfiy Token"))
        await userModel.findOneAndUpdate({ email: decoded.email }, { confrimEmail: true })
        res.json({ message: "success" })
    });
})
const sendToEmailAgain = catchAsyncError(async (req, res, next) => {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (user && !user.confrimEmail) {
        await sendToEmail({ email: req.body.email })
        res.json({ message: "Success And Check In Your Email" })
    } else {
        next(new AppError("Check In Your Date", 403))
    }

})

const updateDate = catchAsyncError(async (req, res, next) => {
    if (req.body.firstname || req.body.lastname) {
        req.body.fullname = (req.body.firstname || req.user.firstname) + " " + (req.body.lastname || req.user.lastname)
    }
    if (req.file) {
        req.body.imgCover = req.file.filename
    }
    const user = await userModel.findById(req.user._id)
    if (!user) return next(new AppError("Not Valid Email", 403))
    const newUpdate = await userModel.findByIdAndUpdate(req.user, req.body, { new: true })
    res.json({ message: "success", newUpdate })
})
const changePassword = catchAsyncError(async (req, res, next) => {
    const { newPassword, oldPassword } = req.body
    const user = await userModel.findById(req.user._id)
    if (!user) return next(new AppError("Not Valid Email", 403))
    if (!oldPassword) return next(new AppError("please Enter Old Password", 403))
    if (!(await bcrypt.compare(oldPassword, user.password))) return next(new AppError("Password That You Enter is Wrong"))
    const newUpdate = await userModel.findByIdAndUpdate(req.user, { password: newPassword }, { new: true })
    res.json({ message: "success", newUpdate })
})

const forgetPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return next(new AppError("User Not Found", 403))
    await sendToEmailToResetPassword({ email })
    res.json({ message: "success" })
})

const verfiyResetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params
    jwt.verify(token, 'email21848', async function (err, decoded) {
        if (err) return next(new AppError("Not Verfiy Token"))
        await userModel.findOneAndUpdate({ email: decoded.email }, { resetPassword: true })
        res.json({ message: "success" })
    });
})

const resetPassword = catchAsyncError(async (req, res, next) => {
    const { NewPassword, email } = req.body
    const user = await userModel.findOne({ email })
    if (!user || !user.resetPassword) return next(new AppError("Check in Your Email First", 403))
    const change = await userModel.findOneAndUpdate({ email }, { password: NewPassword, resetPassword: false }, { new: true })
    res.json({ message: "success", change })
})

const getUser = catchAsyncError(async (req, res, next) => {
    const user = await userModel.findById(req.user._id)
    if (!user) return next(new AppError("User Not Found", 403))
    res.json({ message: "success", user })
})

const logout = catchAsyncError(async (req, res, next) => {
    req.body.logout = Date.now()
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
    res.json({ message: "success", user })
})

const removeAccount = catchAsyncError(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.user._id)
    res.json({ message: "Account Deleted ." })
})

// const translation = (req, res) => {
//     const locale = req.params.lang;

//     i18n.setLocale(locale);

//     const title = res.__('title');
//     const message = res.__('message');

//     res.json({ title, message });
// }

const translation = (req, res) => {
    const title = res.__('title');
    const message = res.__('message');

    res.json({ title, message });
};




// const saveDate = async (req, res) => {
//     const { feel } = req.body

//     const { _id } = req.user
//     const user = await userModel.findById(_id)
//     if (!user) {
//         return res.status(404)
//         // console.log("User not found");
//     }
//     const userStatus = await statusModel.findOne({ userId: user._id })
//     if (!userStatus) {
//         const newUserStatus = new statusModel({ happy: 1, userId: _id })
//         await newUserStatus.save()
//         res.json(newUserStatus)
//     } else {
//         const updateStatus = await statusModel.findOneAndUpdate({ userId: _id }, { $inc: { feel: 1 } }, { new: true })
//         // console.log(updateStatus);
//         res.json(updateStatus)
//     }
//     // if (status) {
//     //     // const happy = req.body.happy
//     //     const updateStatus = await statusModel.findOneAndUpdate({ userId: user._id }, { $inc: { status: 1 } }, { new: true })
//     //     console.log(updateStatus);
//     //     res.json(updateStatus)

//     // } else {
//     //     res.json("hi")
//     // }

// }


const saveDate = async (req, res) => {
    const { feel } = req.body;
    const { _id } = req.user;

    const user = await userModel.findById(_id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const userStatus = await statusModel.findOne({ userId: user._id });

    if (!userStatus) {
        const newUserStatus = new statusModel({ [feel]: 1, userId: _id });
        newUserStatus.timestamps[feel] = Date.now();
        await newUserStatus.save();
        res.json(newUserStatus);
    } else {
        const updateStatus = await statusModel.findOneAndUpdate(
            { userId: _id },
            { $inc: { [feel]: 1 } },
            { new: true }
        );
        updateStatus.timestamps[feel] = Date.now();
        res.json(updateStatus);
    }
};




export {
    signUp,
    signIn,
    verfiyEmail,
    updateDate,
    changePassword,
    forgetPassword,
    verfiyResetPassword,
    resetPassword,
    getUser,
    logout,
    removeAccount,
    sendToEmailAgain,
    translation,
    saveDate
}