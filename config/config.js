const env = process.env.NODE.ENV || 'dev';

const config = () =>{
    switch (env) {
        case 'dev' : 
            return {
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : '',
                jwtExpress : '3d'
            }
        case 'hml' : 
            return {
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : '',
                jwtExpress : '3d'
            }
        case 'prod' : 
            return{
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : '',
                jwtExpress : '3d'
            }

    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();