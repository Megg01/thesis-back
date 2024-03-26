const uploadImage = async ({ file, cat }) => {
  const cloudinary = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  return await cloudinary.uploader.upload(file, {
    folder: cat,
  });
};

module.exports = uploadImage;
