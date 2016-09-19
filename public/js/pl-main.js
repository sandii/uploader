var uploader = new plupload.Uploader({
    runtimes : 'html5,html4',
    // runtimes : 'html5,flash,silverlight,html4',
     
    browse_button : 'pickfiles',
    container: document.querySelector('#container'),
     
    url : "/upload",
     
    filters : {
        max_file_size : '3096mb',
        mime_types: [
            {title : "Image files", extensions : "jpg,gif,png"},
            {title : "Sound files", extensions : "mp3"},
            {title : "Video files", extensions : "mp4,flv"},
            {title : "Zip files", extensions : "zip,rar"}
        ]
    },
 
    // Flash settings
    // flash_swf_url : '/plupload/js/Moxie.swf',
 
    // Silverlight settings
    // silverlight_xap_url : '/plupload/js/Moxie.xap',
     
 
    init: {
        PostInit: function() {
            document.getElementById('filelist').innerHTML = '';
 
            document.getElementById('uploadfiles').onclick = function() {
                uploader.start();
                return false;
            };
        },
 
        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
            });
        },
 
        UploadProgress: function(up, file) {
            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },
 
        Error: function(up, err) {
            document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
        }
    }
});
uploader.init();