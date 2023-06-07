const {sequelize} = require("../db/models");
const {persons} = require("../db/models");
const {companies} = require("../db/models");
const projects = require("../db/models/projects");
const {getPaginationDetails,getPagingData} = require("../utils/pagination.util")

async function list(req,res)
{
    try{
    const {limit, offset} = getPaginationDetails(req);
    const userFilter = getPagingData(req,limit,offset);
    // let users = userFilter ? await persons.findAndCountAll({limit,offset,...userFilter}) : await persons.findAndCountAll({limit,offset});
    const personList = userFilter ? await persons.findAndCountAll({
        limit,offset,attributes: ['id','name', 'email','company_id'], ...userFilter
      }): await persons.findAndCountAll({limit,offset});
    if(personList.length >= 1){
        res.status(200).json({persons:personList});
    }
    else
    {
        res.status(404).json({message:"record not found"})
    }
}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function getById (req,res)
{
    try{
    const {limit, offset} = getPaginationDetails(req);
    const userFilter = getPagingData(req,limit,offset);
    const id = req.params.id;
    const personRecord = userFilter ? await persons.findByPk(id,{limit,offset,...userFilter}):await persons.findAndCountAll({limit,offset});
    if(personRecord)
    {
        const companyId = await personRecord.company_id;
        const companyRecord = await companies.findOne({where : {company_id:companyId}});
        if(companyRecord){
            res.status(200).json({company:companyRecord,person: personRecord});
        }
        else{
            res.status(404).json({message:`company record with id : ${companyId} not found`})
        }
    }
    else
    {
        res.status(404).json({message:`person with id : ${id} not found`})
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function getBycId (req,res)
{
    try{
        const {limit, offset} = getPaginationDetails(req);
        const userFilter = getPagingData(req,limit,offset);
    const id = req.params.id;
    const companyRecord = await companies.findOne({where : {company_id:id}});
    const personsList = userFilter ? await persons.findAll({offset,limit,where:{company_id:id},...userFilter}) : await persons.findAndCountAll({limit,offset});
    if(personsList && companyRecord){
        res.status(200).json({company:companyRecord,persons: personsList});
    }
    else
    {
        res.status(404).json({message:`persons in company with id : ${id} not found`})
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function updateById (req,res)
{
    try{
    const id = req.params.id;
    const {name,email,company_id} = req.body;
    const personUpdated = await persons.update({ name: name, email: email,company_id : company_id},{where : {id:id}});
    if(personUpdated){
        res.status(200).json({UpdatedPerson: personUpdated});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function createId (req,res)
{
    try{
    const {name,email,company_id} = req.body;
    const personCreated = await persons.create({company_id:company_id,name: name, email: email });
    if(personCreated){
        res.status(200).json({message: "Inserted successfully"});
    }
    else
    {
        res.status(404).json({message:"Couldn't Insert"});
    }
}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function delById(req,res) {
    try{
    const id = req.params.id;
    const personDel = await persons.destroy({where: {id : id }})
    if(personDel){
            res.status(200).json({message:"Deleted successfully"});
    }
    else
    {
        res.status(404).json({message:"record not found"})
    }
    }
    catch(error){
        res.status(500).json({error:error})
    }
}

module.exports = {list,getById,getBycId,createId,delById,updateById}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };