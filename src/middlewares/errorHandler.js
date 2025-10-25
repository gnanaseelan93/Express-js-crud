
//central error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred!', error: err.message ,status:500});
}

export default errorHandler;
