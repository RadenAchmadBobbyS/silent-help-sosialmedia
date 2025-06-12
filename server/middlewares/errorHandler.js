

function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack trace for debugging

    // Handle specific error types
    if (err.name === 'Missing Email' || err.name === 'Missing Password') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'User Already Exists') {
        return res.status(409).json({ message: err.message });
    }

    if (err.name === 'Invalid Credentials') {
        return res.status(401).json({ message: err.message });
    }

    if (err.name === 'Unauthorized') {
        return res.status(401).json({ message: err.message });
    }   

    // Set the response status code and send a JSON response
    res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;