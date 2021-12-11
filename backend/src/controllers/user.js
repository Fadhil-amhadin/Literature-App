const { user } = require('../../models')

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.user;
        const photo = req.files.photo[0].filename;
        await user.update({photo}, {
            where:{
                id
            }
        })
        res.send({
            status: "success",
            message: "update data success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}
exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "id", "password"]
            }
        })
        res.send({
            status: "success",
            message: "get data success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}