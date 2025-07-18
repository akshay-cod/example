exports.isValidateAuthLogin = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0)
    {
        return res.status(400).json({ message: errors.array()[0].msg })
    }
    next();
}