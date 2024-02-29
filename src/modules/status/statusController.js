// import Status from "../../../databases/modeles/status.js";
// import { userModel } from "../../../databases/modeles/user.js";
// import { catchAsyncError } from "../../middleware/catchAsyncError.js";


// const createStatus = catchAsyncError(async (req, res) => {
//     const { _id } = req.user
//     const status = Status.create({
//         happy: req.body, happy,
//         sad: req.body.sad,
//         angry: req.body.angry,
//         normal: req.body.normal,
//         user: _id
//     })
//     res.json()
// })



// export {
//     createStatus
// }


import translateModel from "../../../controllers/translate.js"
import { statusModel } from "../../../databases/modeles/status.js"
import { userModel } from "../../../databases/modeles/user.js"

const createStatus = async (req, res, next) => {
    const { _id } = req.user
    const user = await userModel.findById(_id)
    if (!user) {
        return res.status(404).json({ mess: " invalid user id" })
    }
    const { emotions, count, year, month, weak, day } = req.body
    const userStatus = statusModel.findOne({ userId: _id })
    if (!userStatus) {
        const status = new statusModel({ userId: _id, year: year, month: month, weak: weak, day: day })
        status.save()
    }
    res.status(200).json({ message: "status created successfully" })

}



// Get user status by userId
async function getUserStatus(req, res) {
    try {
        const { userId } = req.params; // Assuming userId is part of the route parameters
        const userStatus = await statusModel.findOne({ userId });
        if (!userStatus) {
            return res.status(404).json({ message: 'User status not found' });
        }
        res.status(200).json(userStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    createStatus,
    getUserStatus
};

