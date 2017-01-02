/**
 * Created by tonyStark on 1/2/2017.
 */

module.exports = require('./env/'+process.env.NODE_ENV||'development'+'.js');

