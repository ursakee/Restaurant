export const blobToDataURL = (blob, callback) => {
  let reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(blob);
};

export const dataURLtoBlob = (dataURL) => {
  let byteString = atob(dataURL.split(",")[1]);
  let mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};
