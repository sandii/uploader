function uploadFile(){
    let formData = new FormData();
    let file = document.querySelector('#file').files[0];
    formData.append('file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onload = (e) => {
        if (this.status === 200) {
             document.getElementById('result').innerHTML = this.response;
        }
    };
    xhr.send(formData);
}
document.querySelector('#btn').addEventListener('click', uploadFile, false);