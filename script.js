const uploadInput = document.getElementById("upload");
const downloadBtn = document.getElementById("download");
const previewArea = document.getElementById("preview-area");

let convertedDataUrl = null;

uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || file.type !== "image/webp") {
    alert("Please upload a valid WebP image.");
    return;
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    convertedDataUrl = canvas.toDataURL("image/jpeg", 0.92);

    // Show preview
    previewArea.innerHTML = `<img src="${convertedDataUrl}" alt="Converted Image" />`;

    downloadBtn.disabled = false;
  };
});

downloadBtn.addEventListener("click", () => {
  if (!convertedDataUrl) return;

  const link = document.createElement("a");
  link.href = convertedDataUrl;
  link.download = "converted.jpg";
  link.click();
});
