const {sequelize} = require("../db/models");
const {companies} = require("../db/models");
const {getPaginationDetails,getPagingData} = require("../utils/pagination.util")

async function list(req,res)
{
    const {limit, offset} = getPaginationDetails(req);
    const userFilter = getPagingData(req,limit,offset);
    const companyList =userFilter ? await companies.findAll({
        limit,offset,attributes: ['id','company_id','name', 'noOfEmployees'],...userFilter
      }): await persons.findAndCountAll({limit,offset});
    if(companyList.length >= 1){
        res.status(200).json({companies:companyList});
    }
    else
    {
        res.status(404).json({message:"record not found"})
    }
   }

async function getById(req,res)
{
    try{
    const id = req.params.id;
    const companyRecord = await companies.findOne({where : {company_id:id}})
    if(companyRecord){
        res.status(200).json({company: companyRecord});
    }
    else
    {
        res.status(404).json({message:`company with id : ${id} not found`})
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function updateById(req,res)
{
    try{
    const id = req.params.id;
    const {name,noOfEmployees} = req.body;
    const companyUpdated = await companies.update({ name: name, noOfEmployees: noOfEmployees},{where : {company_id:id}});
    if(companyUpdated){
        res.status(200).json({UpdatedCompany: companyUpdated});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function createId(req,res)
{
    try{
    const {company_id,name,noOfEmployees} = req.body;
    const companyCreated = await companies.create({ company_id:company_id,name: name, noOfEmployees: noOfEmployees });
    if(companyCreated){
        res.status(200).json({message: "Inserted successfully"});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function delById(req,res) {
    try{
    const id = req.params.id;
    const companyDel = await companies.destroy({where: {company_id : id }})
    if(companyDel){
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
module.exports = {list ,getById,createId,delById,updateById}