import Employee from "../models/Employee.js"

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.status(201).json({employees, count:employees.length})
        //res.status(201).json({employee})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getEmployee = async(req, res) => {
    try {
        let {id:employeeId}=req.params
        const employee = await Employee.findOne({_id:employeeId})
        if(!employee){
            return res.status(404).json({msg:`No Employee with id:${employeeId} found`})
        }
        res.status(201).json({employee})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createEmployee = async(req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({employee})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateEmployee = async (req, res) => {
    try {
        let {id:employeeId}=req.params
        const employee = await Employee.findOneAndUpdate({_id:employeeId}, req.body,{new:true, runValidators:true})
        if(!employee){
            return res.status(404).json({msg:`No Employee with id:${employeeId} found`})
        }
        res.status(201).json({msg:"Succesfully updated Employee"})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let {id:employeeId}=req.params
        const employee = await Employee.findOneAndDelete({_id:employeeId})
        if(!employee){
            return res.status(404).json({msg:`No Employee with id:${employeeId} found`})
        }
        res.status(201).json({msg:"Employee succesfully deleted"})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}