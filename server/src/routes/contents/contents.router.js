const contentesRouter = require('express').Router();

const {httpGetAllContents, httpPostContent}= require('./contents.controller')

contentesRouter.get('/', httpGetAllContents);
  
contentesRouter.post('/', httpPostContent);
  
contentesRouter.get('/', httpDeletContent);

contentesRouter.get('/', httpModifyContent); 

module.exports = contentesRouter;