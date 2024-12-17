export const decodeImage = (base64Image, imgElement) => {
  base64Image = base64Image.split(",")[1];
  const binaryString = atob(base64Image);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  imgElement.src = url;

  imgElement.onload = () => {
    URL.revokeObjectURL(url);
  };
};
