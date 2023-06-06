const {sequelize} = require("../db/models");
const {projects} = require("../db/models");
const {getPaginationDetails,getPagingData} = require("../utils/pagination.util")
const {companies} = require("../db/models");
async function list(req,res)
{
    const {limit, offset} = getPaginationDetails(req);
    const userFilter = getPagingData(req,limit,offset);
    const projectList =userFilter ? await projects.findAll({
        limit,offset,attributes: ['id','project_name', 'company_id','project_details'],...userFilter
      }): await persons.findAndCountAll({limit,offset});
    if(projectList.length >= 1){
        res.status(200).json({projects:projectList});
    }
    else
    {
        res.status(404).json({message:"record not found"})
    }
   }

   async function getById (req,res)
   {
       try{
       const {limit, offset} = getPaginationDetails(req);
       const userFilter = getPagingData(req,limit,offset);
       const id = req.params.id;
       const projectRecord = userFilter ? await projects.findByPk(id,{limit,offset,...userFilter}):await projects.findAndCountAll({limit,offset});
       if(projectRecord)
       {
           const companyId = await projectRecord.company_id;
           const companyRecord = await companies.findOne({where : {company_id:companyId}});
           if(companyRecord){
               res.status(200).json({company:companyRecord,project: projectRecord});
           }
           else{
               res.status(404).json({message:`company record with id : ${companyId} not found`})
           }
       }
       else
       {
           res.status(404).json({message:`project with id : ${id} not found`})
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
    const companyRecord = await companies.findOne({where:{company_id:id}});
    const projectsList = userFilter ? await projects.findAll({offset,limit,where:{company_id:id},...userFilter}) : await projects.findAndCountAll({limit,offset});
    if(projectsList && companyRecord){
        res.status(200).json({company:companyRecord,projects: projectsList});
    }
    else
    {
        res.status(404).json({message:`persons in company with id : ${id} not found`})
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function updateById(req,res)
{
    try{
    const id = req.params.id;
    const {project_name,project_details,company_id} = req.body;
    const projectUpdated = await projects.update({ project_name:project_name,project_details:project_details,company_id:company_id},{where : {id:id}});
    if(projectUpdated){
        res.status(200).json({Updatedproject: projectUpdated});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function createId(req,res)
{
    try{
    const {project_name,project_details,company_id} = req.body;
    const projectCreated = await projects.create({ project_name:project_name,project_details:project_details,company_id:company_id});
    if(projectCreated){
        res.status(200).json({message: "Inserted successfully"});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function delById(req,res) {
    try{
    const id = req.params.id;
    const projectDel = await projects.destroy({where: {id : id }})
    if(projectDel){
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
module.exports = {list ,getById,getBycId,createId,delById,updateById}