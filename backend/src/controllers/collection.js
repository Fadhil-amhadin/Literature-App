const { collection,literature, user } = require('../../models')

exports.addCollection = async (req, res) => {
    try {
        const {id} = req.user;
        const data = req.body;

        await collection.create({...data, userId: id});
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
exports.getCollections = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await collection.findAll({
            where: {
                userId: id
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "status"]
                    }
                },
                {
                    model: literature,
                    as: "literature",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
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

exports.deleteCollection = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        await collection.destroy({
            where: {
                literatureId : id,
                userId
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