import { decodeImage } from "../Utils/decodeImage.js";

export const handleFileChange = (event, setFile, setSrc, setContent, ref) => {
  const file = event.target.files[0];
  if (file) {
    setFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const content = reader.result;
      setContent(content);
      setSrc(content); // Update the imageSrc with the base64 content
      // decodeImage(content, document.getElementById("image"));
      if (ref) {
        decodeImage(content, ref);
      } else {
        console.error("Image element is null or undefined.");
      }
    };
  }
};

export const handleBannerChange = (event, setFile, setSrc, setContent, ref) => {
  const file = event.target.files[0];
  if (file) {
    setFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const content = reader.result;
      setContent(content);
      setSrc(content); // Update the imageSrc with the base64 content
      // decodeImage(content, document.getElementById("image"));
      if (ref) {
        decodeImage(content, ref);
      } else {
        console.error("Image element is null or undefined.");
      }
    };
  }
};
