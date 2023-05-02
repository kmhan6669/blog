const contentesRouter = require('express').Router();

const {getAllContents, postContent}= require('./contents.controller')

contentesRouter.get('/', getAllContents);
  
contentesRouter.post('/', postContent)
  


module.exports = contentesRouter;