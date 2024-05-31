import UserAccount from "../../models/user_account.model.js";

export const getInfoUserAccount = (req, res) => {
    const user = req.user;
    res.status(200).json({ user, message: "get-info-success" });
};

export const verifyLogin = (req, res) => {
    res.status(200).json({ message: "verify-success" });
}

export const getInfoUserBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const userId = req.user.id;
        const infoUser = await UserAccount.findOne({
            attributes: ["id", "username", "email", "avatar", "first_name", "last_name", "introduce", "personal_link", "date_of_birth", "gender", "language", "nation"],
            where: {
                slug: slug,
                deleted: false
            },
            raw: true
        });
        if(userId === infoUser.id){
            infoUser.isMe = true;
        }
        res.status(200).json({ infoUser, message: "get-info-user-success" });
    }catch(error){
        console.log(error);
        res.status(502).json({ message: "get-info-user-failed" });
    }
}