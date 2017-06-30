/*jslint node: true */
module.exports = {
    '/': require('./controllers/WelcomeController'),
    '/signup': require('./controllers/SignupController'),
    '/authenticate': require('./controllers/AuthenticationController'),
    '/users': require('./controllers/UserController'),
    '/offers': require('./controllers/OfferController'),
    '/companies': require('./controllers/CompanyController')
};
