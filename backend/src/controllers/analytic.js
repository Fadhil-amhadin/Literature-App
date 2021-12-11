const { analytic } = require('../../models')

exports.addAnalytic = async (req, res) => {
    try {
        const userId = req.user.id
        const data = req.body

        await analytic.create({...data, userId})
        res.send({
            status: "success",
            message: "add data success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:"failed",
            message: "server error"
        })   
    }
}
exports.updateDownload = async (req, res) => {
    try {
        const { id, props } = req.params
        const literatureDw = req.body
        const data = JSON.parse(props)
        data.push(literatureDw.literatureDw)
        const dataTwo = JSON.stringify(data)
        await analytic.update({...dataTwo, literatureDw: dataTwo}, {
            where: {
                id
            }
        })
        res.send({
            status: "success",
            message: "update data success"
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            status:"failed",
            message: "server error"
        })   
    }
}
exports.updateUpload = async (req, res) => {
    try {
        const { id, props } = req.params
        const literatureUp = req.body
        const data = JSON.parse(props)
        data.push(literatureUp.literatureUp)
        const dataTwo = JSON.stringify(data)
        await analytic.update({...dataTwo, literatureUp: dataTwo}, {
            where: {
                id
            }
        })
        res.send({
            status: "success",
            message: "update data success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:"failed",
            message: "server error"
        })   
    }
}
exports.getAnalytics = async (req, res) => {
    try {
        const data = await analytic.findAll({
            attributes: {
                exclude:["createdAt", "updatedAt"]
            }
        })
        res.send({
            status: "success",
            message: "get data success",
            data
        })
    } catch (error) {
        res.status(500).send({
            status:"failed",
            message: "server error"
        })   
    }
}
exports.getAnalytic = async (req, res) => {
    try {
        const {props} = req.params
        const userId = req.user.id
        const data = await analytic.findOne({
            where: {
                userId,
                date: props
            }
        })
        res.send({
            status: "success",
            message: "get data success",
            data
        })
    } catch (error) {
        res.status(500).send({
            status:"failed",
            message: "server error"
        }) 
    }
}