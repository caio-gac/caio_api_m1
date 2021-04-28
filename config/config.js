const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsemelhorquestartrek',
                jwtExpires : '1d',
                options: {
                    poolSize: 5,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // removendo os warnings de function deprecated
                    useFindAndModify: false
                }
            }
        case 'hml' :
            return {
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsemelhorquestartrek',
                jwtExpires : '1d',
                options: {
                    poolSize: 5,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // removendo os warnings de function deprecated
                    useFindAndModify: false
                }
            }
        case 'prod' :
            return {
                dbString : 'mongodb+srv://user:user@cluster0.gnwc8.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsemelhorquestartrek',
                jwtExpires : '1d',
                options: {
                    poolSize: 5,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // removendo os warnings de function deprecated
                    useFindAndModify: false
                }
            }
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();