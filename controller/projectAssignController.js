const {sequelize} = require("../db/models");
const {projectAssignments} = require("../db/models");
const {getPaginationDetails,getPagingData} = require("../utils/pagination.util")

async function list(req,res)
{
    const {limit, offset} = getPaginationDetails(req);
    const userFilter = getPagingData(req,limit,offset);
    const projectAssignList =userFilter ? await projectAssignments.findAll({
        limit,offset,attributes: ['id','project_id', 'person_id'],...userFilter
      }): await persons.findAndCountAll({limit,offset});
    if(projectAssignList.length >= 1){
        res.status(200).json({projectAssignments:projectAssignList});
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
    const projectAssignRecord = await projectAssignments.findByPk(id)
    if(projectAssignRecord){
        res.status(200).json({project: projectAssignRecord});
    }
    else
    {
        res.status(404).json({message:`project with id : ${id} not found`})
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}

async function updateById(req,res)
{
    try{
    const id = req.params.id;
    const {project_id,person_id} = req.body;
    const projectAssignUpdated = await projectAssignments.update({ project_id,person_id},{where : {id:id}});
    if(projectAssignUpdated){
        res.status(200).json({UpdatedProjectAssignment: projectAssignUpdated});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function createId(req,res)
{
    try{
    const {project_id,person_id} = req.body;
    const projectAssignCreated = await projectAssignments.create({project_id,person_id});
    if(projectAssignCreated){
        res.status(200).json({message: "Inserted successfully"});
    }}
    catch(error){
        res.status(500).json({error:error})
    }
}
async function delById(req,res) {
    try{
    const id = req.params.id;
    const projectAssignDel = await projectAssignments.destroy({where: {id : id }})
    if(projectAssignDel){
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