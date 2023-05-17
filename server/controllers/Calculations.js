const Calc = require('../models/Calc')

const getCalculations = async (req, res) => {

    try {
        const post = await Calc.find({});
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getSingleCalculations = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await Calc.findById({_id: id});
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

const postCalculations = async (req, res) => {

    const {name, value, result} = req.body;

    if(name === "" || value === "" || result === ""){
        return res.send("All fields are required!");
      }
    
    try {
        const post = await Calc.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

const editCalcuations = async (req, res) => {

    const { id } = req.params;

    const {name, value, result} = req.body;

    if(name === "" || value === "" || result === ""){
        return res.send("All fields are required!");
      }
    
    try {
        const post = await Calc.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
        if(!post){
            return res.status(404).send(`No calculation with id: ${id}`);
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteCalculations = async (req, res) => {
    
    const { id } = req.params;

    try {
        await Calc.findByIdAndDelete({_id: id});
        res.status(200).json({message: "deleted"});
    } catch (error) {
        res.status(400).json(error);
    }


};

module.exports = {getCalculations, getSingleCalculations, postCalculations, editCalcuations, deleteCalculations};