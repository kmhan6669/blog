const contentsRouter = require('express').Router();

const { httpGetAllContents, httpPostContent, httpDeleteContent, httpModifyContent }= require('./contents.controller')

contentsRouter.get('/', httpGetAllContents);
  
contentsRouter.post('/', httpPostContent);

module.exports = contentsRouter;