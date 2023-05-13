const imageRouter = require('express').Router();
const path = require('path');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        // 저장할 장소
        destination(req, file, cb) {
            cb(null, 'public/uploads');
        },
        // 저장할 이미지의 파일명
        filename(req, file, cb) {
            const ext = file.mimetype.split('/');
            if(ext[0])
            cb(null, path.basename(file.fieldname) +'.jpg' );
        },
    }),
});


module.exports = upload;
