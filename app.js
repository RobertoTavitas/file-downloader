const fileInput = document.querySelector('input');
const downloadBtn = document.querySelector('button');

fileInput.addEventListener("input", e => {
  document.querySelector(".preview-img img").src = e.target.value;
});

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBtn.textContent = 'Downloading file...';
  fetchFile(fileInput.value)
});

function fetchFile(url) {
  // fetch file & return response as blob
  fetch(url)
    .then(resp => resp.blob())
    .then(file => {
      // Create URL of passed object
      let tempURL = URL.createObjectURL(file)
      let aTag = document.createElement('a');
      aTag.href = tempURL;
      aTag.download = url.replace(/^.*[\\\/]/, '');
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempURL);
      downloadBtn.textContent = 'Download File';
    })
    .catch( () => {
      downloadBtn.textContent = 'Download File';
      alert('Failed to download file!');
    })
};