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
        uri: 'mongodb://sooserver:arbulon@ds060749.mlab.com:60749/soodb'
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
