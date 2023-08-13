const db = require("../../models")
const path = require("path")
const user = db.User
const hs = db.History


const isClockIn = async ({id}) => {
    const existingHistory = await hs.findOne({
        where : {userId : id, clockOut : null},
    })
    return existingHistory !== null
}

const HistoryController = {
    employeeLogin : async(req, res) => {
        const {id} = req.user
        try {
            const userClockin = await isClockIn({id})
            if(userClockin) return res.status(500).json({message : "User already Clock in"})
            db.sequelize.transaction(async(t) => {
                const respon = await hs.create({
                    userId : id,
                    isOvertime : false,
                    clockOut : null,
                    hourlyWork : 0,
                    daySalary : 0
                })
                return res.status(200).json({message : "Login", respon})
            })
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    
    employeeLogout : async (req, res) => {
        const {id} = req.user
        try {
            db.sequelize.transaction(async(t) => {
                const respon = await hs.findOne({
                    where : {userId :id, clockOut : null},
                    order : [["clockIn", "DESC"]],
                });
                const users = await user.findOne({ where : {id}})
                console.log("history", respon)
                if(!respon){
                    return res.status(500).json({message : "User not clock in"})
                }
                respon.clockOut = new Date()
                const workTimeMilliseconds = respon.clockOut - respon.clockIn;
                const workTimeHours = workTimeMilliseconds / (60 * 60 * 1000);

                respon.hourlyWork = workTimeHours
                if (workTimeHours > 12) {
                    respon.daySalary = users.daySalary / 2;
                } else if(!respon.clockIn){
                    respon.daySalary = 0
                } else if(workTimeHours <= 11){
                    respon.daySalary = users.daySalary / 2
                }
                respon.isDone = true
                await respon.save(), {transaction : t}
                return res.status(200).json({message : "Thankyou", respon})
            })
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    getHistory : async (req, res) => {
        // const {userId} = req.params;
        const {id} = req.user
        try {
            const history = await hs.findAll({
                where : {userId : id},
                order : [["clockIn", "DESC"]]
            })
            return res.status(200).json({message : "Attendence History", history})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}

module.exports = HistoryController