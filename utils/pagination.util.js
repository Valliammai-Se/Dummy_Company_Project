
const getPagingData = (req, limit, data) => {

    const page = parseInt(req.query.page);

    const size = parseInt(req.query.size);

    const { count: totalItems, rows: responses } = data;

    const currentPage = page ? page : 1;

    const totalPages = Math.ceil(totalItems / limit);

    return { data: responses, totalItems, totalPages, currentPage };

};
const getPaginationDetails = (req) => {

    const page = parseInt(req.query.page);

    const size = parseInt(req.query.size);

    const limit = size ? size : 10;

    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };

}




module.exports= {getPaginationDetails,getPagingData};