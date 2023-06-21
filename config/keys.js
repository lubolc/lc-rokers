if(process.env.NODE_ENV == 'production'){
    console.log('PROD')
    module.exports = require('./prod')
}else if(process.env.NODE_ENV == "development"){
    console.log('DEV')
    module.exports = require('./dev')
}else{
    console.log('LOCAL')
    module.exports = require('./local')
}