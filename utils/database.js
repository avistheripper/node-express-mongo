if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://<Avis>:<Avistheripper25812>@ds117334.mlab.com:17334/avistheripper'}
  } else {
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
  }