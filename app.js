let fs = require('fs');
let path = require('path');
let express = require('express');
let multiparty = require('multiparty');

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.post('/upload', (req, res) => {

    let form = new multiparty.Form({uploadDir: './upload'});
    form.on('error', (err) => {
        console.log(`Error parsing form: ${err.stack}`);
    });
    form.parse(req, (err, fields, files) => {
        let filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log(`parse error: ${err}`);
            res.send('写文件操作失败。');

        } else {
            res.send('文件上传成功');
            console.log(`parse files: ${filesTmp}`);

            let fileNameArr = Object.keys(files);
            let firstFilename = fileNameArr[0];
            let fileDataArr = files[firstFilename];
            console.log(typeof fileDataArr);
            console.log(fileDataArr);
            let fileData = fileDataArr[0];

            let uploadedPath = fileData.path;
            let dstPath = `./upload/${fileData.originalFilename}`;
            fs.rename(uploadedPath, dstPath, (err) => {
                if (err){
                    console.log('重命名文件错误：'+ err);
                } else {
                    console.log('重命名文件成功。');
                }
            });
        }
    });
});

app.listen(3000);