const { literature, user } = require('../../models')

exports.addLiterature = async (req, res) => {
    try {
        const dataFile = req.files;
        const {id} = req.user;
        const data = req.body;

        await literature.create({...data, userId: id, attachment: dataFile.attachment[0].filename, status: 'waiting'});
        res.send({
            status: "success",
            message: "add data success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getLiteratures = async (req, res) => {
    try {
        const data = await literature.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "status"]
                    }
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"]
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

exports.getLiterature = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await literature.findOne({
            where: {
                id
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
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
exports.updateLiterature = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        await literature.update({...data}, {
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
exports.deleteLiterature = async (req, res) => {
    try {
        const {id} = req.params;
        await literature.destroy({
            where: {
                id
            }
        })
        res.send({
            status : "success",
            message : "delete data success"
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}
exports.getCancel = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await literature.findOne({
            where: {
                userId: id,
                status: "cancel"
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
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