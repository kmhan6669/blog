const contentesRouter = require('express').Router();

const { httpGetAllContents, httpPostContent, httpDeleteContent, httpModifyContent }= require('./contents.controller')

contentesRouter.get('/', httpGetAllContents);
  
contentesRouter.post('/', httpPostContent);
  
contentesRouter.get('/', httpDeleteContent);

contentesRouter.get('/', httpModifyContent); 

module.exports = contentesRouter;