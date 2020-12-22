import {SequelizeUser} from "../../database/db-models/SequelizeUser";
import {SequelizeShareRecord} from "../../database/db-models/SequelizeShareRecord";


export const saveShareRecord = async (req, res, next) => {
    console.log("\nShare API: REQUEST START")
    const userData = req.body;
    try {
        if (!userData) {
            console.log("No user information attached to the share.")
            console.log("Share API: REQUEST END")
            const errorThrown = new Error("Please attach user id and email to the password.")
            const error = {
                errorThrown,
                statusCode: 400
            }
            next(error)
        }
        let user: any = await SequelizeUser.findOne({where: {userId: userData.id}})
        if (!user) {
            console.log("No user found with id: " + userData.id)
            user = new SequelizeUser({
                userId: userData.id,
                email: userData.email
            })
            const savedUser = await user.save()
            if (!savedUser) {
                console.log("Something went wrong while saving a new user.")
                console.log("Share API: REQUEST END")
                const errorThrown = new Error("Something went wrong while handling user data that was passed.")
                const error = {
                    errorThrown,
                    statusCode: 500
                }
                next(error)
            }
            user = savedUser;
            console.log("Created new user.")
        } else {
            console.log("Found user with id: " + userData.id)
        }
        console.log(user.dataValues)
        const shareRecord: any = await new SequelizeShareRecord().$set('user', user)
        if (!shareRecord) {
            console.log("Something went wrong while saving share record.")
            console.log("Share API: REQUEST END")
            const errorThrown = new Error("Something went wrong.")
            const error = {
                errorThrown,
            }
            next(error)
        }
        console.log(shareRecord.dataValues)
        console.log("Recorded share for user with id: " + userData.id)
        console.log("FoodProduct API: REQUEST END")
        return res.status(201).json({message: "Successfully recorded share."})
    } catch (errorThrown) {
        const error = {
            errorThrown,
        }
        next(error)
    }
}
