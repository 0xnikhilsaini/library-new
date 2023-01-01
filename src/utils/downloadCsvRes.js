const { Parser } = require('json2csv');
let fs = require('fs');
let path = require('path');


module.exports = (res, fileName, fields, data) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  fs.writeFile(fileName, csv, (err,d) => {
    if (err)
      console.log(err);
    else {
      console.log(d)
      res.download(fileName, (err) => {
        if (err) {
          console.log(err);
        }
        fs.unlink(fileName, (err) => {
          if (err) {
            console.log(err);
          }
          console.log('FILE [' + fileName + '] REMOVED!');
        });
      });
    }
  });
}