import {SequelizeUser} from "../../database/db-models/SequelizeUser";
import {SequelizeShareRecord} from "../../database/db-models/SequelizeShareRecord";

/**
 * Controller function used when a POST request is made on the /share endpoint.
 * Takes a body with a user id and an email. It then finds an existing user or creates the user if it was not found.
 * Then it creates a share record with a timestamp and a foreign relation to the user.
 * Technically this endpoint should be authenticated, but it's not possible yet because this is a proof-of-concept server
 * with no access to EatMyRide's private key.
 */
export const saveShareRecord = async (req, res, next) => {
    console.log("\nShare API: POST REQUEST START")
    const userData = req.body;
    try {
        //Check if no data or unusable data was attached to the POST request.
        if (!userData.id || !userData.email) {
            console.log("No user information attached to the share.")
            console.log("Share API: REQUEST END")
            const errorThrown = new Error("Please attach user id and email to the request.")
            const error = {
                errorThrown,
                statusCode: 400
            }
            next(error)
        }
        //Find a user with the id provided in the request body.
        let user: any = await SequelizeUser.findOne({where: {userId: userData.id}})
        if (!user) {
            //If no user found, proceed to create a user with the data attached to the request.
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
        //Sets the user found as the user of a new share record. The share record receives a timestamp on creation.
        const shareRecord: any = await new SequelizeShareRecord().$set('user', user)
        if (!shareRecord) {
            console.log("Something went wrong while saving share record.")
            console.log("Share API: REQUEST END")
            const errorThrown = new Error("Something went wrong.")
            const error = {
                errorThrown,
            }
            return next(error)
        }
        console.log(shareRecord.dataValues)
        console.log("Recorded share for user with id: " + userData.id)
        console.log("FoodProduct API: REQUEST END")
        return res.status(201).json({statusCode: 201, message: "Successfully recorded share."})
    } catch (errorThrown) {
        const error = {
            errorThrown,
        }
        return next(error)
    }
}

/**
 * Receives a user id in the route parameters. Then it counts the amount of shares in the database
 * for a particular user by id.
 * Technically this endpoint should be authenticated, but because this is a proof-of-concept back-end it's not possible to
 * use the real JWT EatMyRide uses to authenticate the retrieval of the amount of shares done because we do not have the
 * private key.
 */
export const countShareRecordsForUser = async (req, res, next) => {
    console.log("\nShare API: GET REQUEST START")
    const userId = req.params.id
    if (!userId) {
        const errorThrown = new Error("No user specified. Please specify a User ID.");
        const error = {
            errorThrown,
            statusCode: 400
        }
        return next(error)
    }
    const user: any = await SequelizeUser.findOne({where: {userId: userId}})
    if (!user) {
        const errorThrown = new Error("No user found with ID: " + userId)
        const error = {
            errorThrown,
            statusCode: 404
        }
        return next(error)
    }
    const count = await SequelizeShareRecord.count({
        where: {
            userId: userId
        }
    })
    console.log("Counted " + count + " shares for user with ID: " + userId)
    if (!count || count == 0) {
        const errorThrown = new Error("No share records found for user with ID: " + userId)
        const error = {
            errorThrown,
            statusCode: 404
        }
        return next(error)
    }
    console.log("FoodProduct API: REQUEST END")
    return res.status(200).json({
        statusCode: 200,
        message: `Found ${count} shares for user with ID ${userId}`,
        count: count
    })
}
