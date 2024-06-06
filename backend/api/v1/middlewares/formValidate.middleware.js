import UserAccount from "../models/user_account.model.js";

export const validateRegister = async (req, res, next) => {
    const { email, password, confirmPassword} = req.body;

    const emailExisted = await UserAccount.findOne({
        where: {
            email: email
        }
    });
    
    if(emailExisted){
        return res.status(400).json({
            message: "email-existed"
        });
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            message: "password-incorrect"
        });
    }
    next();
}

export const validatePinUploader = async (req, res, next) => {
    const { url, title } = req.body;
    if(url === null ){
        return res.status(400).json({
            message: "url-required"
        });
    }

    if(title === "" ){
        return res.status(400).json({
            message: "title-required"
        });
    }

    next();
}