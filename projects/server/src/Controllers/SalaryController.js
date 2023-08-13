const db = require("../../models")
const user = db.User
const hs = db.History
const {Op} = require("sequelize")

const salaryController = {
    employeeSalary : async (req,res) => {
        try {
            const {id} = req.user
            const findHistory = await hs.findOne({
                where : {userId : id, clockIn: {[Op.ne] : null}}, 
                order : [["clockIn", "DESC"]]
            })
            if(!findHistory)
            return res.status(404).json({message : "No history working found"})
            const today = findHistory.clockIn
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear()

            const historyRecords = await hs.findAll({
                where : {userId : id,} 
            })
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}