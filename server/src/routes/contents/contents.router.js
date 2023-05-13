const contentsRouter = require('express').Router();

const { httpGetAllContents,httpGetContent,  httpPostContent, httpDeleteContent,}= require('./contents.controller')
const upload = require('./image.router')

contentsRouter.get('/', httpGetAllContents);

contentsRouter.get('/:id', httpGetContent);

contentsRouter.post('/', httpPostContent);

contentsRouter.delete('/:id', httpDeleteContent); 

module.exports = contentsRouter;
