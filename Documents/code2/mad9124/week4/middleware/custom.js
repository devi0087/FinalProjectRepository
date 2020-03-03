function hey(req, res, next){
    console.log('HEY', req.url, Date.now());
    next();//
}
function sup(req, res, next){
    req.message = "Hey! Sup";
    next();
}
function rashad(req, res, next){
    req.message = "Hello";
    next();
}
module.exports = {hey, sup};