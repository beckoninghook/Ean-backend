const sendErrorResponse = (err, req, res, next) => {
    console.log("Handling an error.")
    console.log(err)
    console.log("Sending error response.")
    const status = err.statusCode || 500;
    const message = err.errorThrown.message || "Something went wrong.";
    res.status(status).json({message: message})
}

export default sendErrorResponse
