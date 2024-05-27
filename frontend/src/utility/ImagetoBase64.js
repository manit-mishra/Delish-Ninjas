async function ImagetoBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
  
      reader.readAsDataURL(file); // Specify the 'file' to read here
    });
  }
  
  export { ImagetoBase64 };
  