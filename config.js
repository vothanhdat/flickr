const path = require('path');
module.exports = {
  prerenderPaths: [
    '/'
  ],
  alias:{
    "@" : path.resolve(__dirname, 'src/'),
  }
}