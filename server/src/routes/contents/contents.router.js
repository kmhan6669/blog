const contentesRouter = require('express').Router();

const { httpGetAllContents, httpPostContent, httpDeleteContent, httpModifyContent } = require('./contents.controller')

contentesRouter.route('/')
  .get(httpGetAllContents)
  .post(httpPostContent)
  .delete(httpDeleteContent)
  .patch(httpModifyContent);
  
module.exports = contentesRouter;