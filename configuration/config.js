/*jslint node: true */
module.exports = {
    app: {
        // Server IP
        ip: process.env.ip || undefined,

        // Server port
        port: process.env.PORT || 3000
    },

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/soo'
    },
    jwt: {
        secret: 'secret',
        alghorithm: 'HS512',
        type: 'Bearer',
        header: 'authorization'
    },
    passport: {
        options: {
            session: false
        }
    }
};
