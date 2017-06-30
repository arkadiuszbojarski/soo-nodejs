/*jslint node: true */
module.exports = {
    app: {
        // Server IP
        ip: process.env.OPENSHIFT_NODEJS_IP
                || process.env.ip
                || undefined,

        // Server port
        port: process.env.OPENSHIFT_NODEJS_PORT
                || process.env.PORT
                || 3000
    },

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://sooserver:arbulon@ds060749.mlab.com:60749/soodb'
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
