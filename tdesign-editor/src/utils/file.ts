export const localFileToURL = async (data) =>
  new Promise((resolve, reject) => {
    const file = new FileReader();
    file.readAsDataURL(data);
    file.onload = () => {
      resolve(file.result);
    };

    file.onerror = (e) => {
      reject(e);
    };
  });
