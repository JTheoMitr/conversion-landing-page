const fileInput = document.getElementById("fileInput");
const convertBtn = document.getElementById("convertBtn");
const previewContainer = document.getElementById("previewContainer");

let selectedFile = null;

// Handle file input
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (e) => {
    img.src = e.target.result;

    img.onload = () => {
      selectedFile = img;
      previewContainer.innerHTML = "";
      previewContainer.appendChild(img);
      img.style.maxWidth = "100%";
      img.style.maxHeight = "300px";
      img.style.marginTop = "1rem";
    };
  };

  reader.readAsDataURL(file);
});

// Convert & Download
convertBtn.addEventListener("click", () => {
  if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }

  const format = document.querySelector('input[name="format"]:checked').value;

  const canvas = document.createElement("canvas");
  canvas.width = selectedFile.naturalWidth;
  canvas.height = selectedFile.naturalHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(selectedFile, 0, 0);

  let mimeType;
  let extension;

  switch (format) {
    case "jpg":
      mimeType = "image/jpeg";
      extension = "jpg";
      break;
    case "png":
      mimeType = "image/png";
      extension = "png";
      break;
    case "webp":
      mimeType = "image/webp";
      extension = "webp";
      break;
    default:
      alert("Unsupported format selected.");
      return;
  }

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, mimeType);
});
