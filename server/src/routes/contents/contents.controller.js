const contents = [{
    id: 0,
    date : new Date(),
    creator: '',
    ops: [
      {
        attributes: {
          bold: true
        },
        insert: "이거 되는거 맞아?"
      },
      {
      attributes: {
          header: 1
        },
        insert: "\n"
      },
      {
        attributes: {
          italic: true
        },
        insert: "헐 이게 되네ㄷㄷ"
      },
      {
        attributes: {
          header: 2
        },
        insert: "\n"
      },
      {
        insert: "대박 와우\n"
      }
    ]
  }];


function getAllContents (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(contents);
}

function postContent (req, res) {
    const newContents = req.body;
    contents.push({
      id: contents.length,
      ...newContents,
    });
    res.status(201).send(contents[contents.length-1]);
}

module.exports = {
    getAllContents,
    postContent,
};