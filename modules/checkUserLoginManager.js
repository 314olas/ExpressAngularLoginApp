const dataManager = require('../modules/dataManager');
const jwt = require('jsonwebtoken');
const secretKey = 'loginApp';

module.exports = async function loginUserManager(obj) {

    try {
        let response = null;
        await dataManager.getAllUsers().then( data => {

            const EmailCoincidenceUser = data.filter(user => user.email === obj.email)[0];

            if (EmailCoincidenceUser) {
                const token = jwt.sign(JSON.stringify(EmailCoincidenceUser), secretKey);
                if (EmailCoincidenceUser.password === obj.password) {
                    response = { status: 200,
                                 msg:
                                     { text: 'loggin success ',
                                        name :EmailCoincidenceUser.name,
                                        token
                                     }
                    }
                } else {
                    response = { status: 404, msg: { text: 'wrong password'} }
                }

            } else if (EmailCoincidenceUser === undefined) {
                response = { status: 404, msg: { text: 'user not found'} }
            }

        })
            .catch( (e) => {throw e});
        return response
    } catch (e) {
        return e
    }

};
