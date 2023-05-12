const contentesRouter = require('express').Router();

const { httpGetAllContents,httpGetContent,  httpPostContent, httpDeleteContent,}= require('./contents.controller')
const upload = require('./image.router')

contentesRouter.get('/', httpGetAllContents);

contentesRouter.get('/:id', httpGetContent);




contentesRouter.post('/', httpPostContent);





contentesRouter.delete('/:id', httpDeleteContent); 

module.exports = contentesRouter;