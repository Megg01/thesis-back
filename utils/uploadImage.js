var cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");
const { Buffer } = require("buffer");

const decodeBase64 = async (base64String) => {
  return Buffer.from(base64String, "base64");
};

const uploadImage = async (file, cat) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  let buffer = null;

  const { originalname } = file;

  if (typeof file === "string") {
    buffer = await decodeBase64(file);
  } else {
    buffer = file?.buffer;
  }

  const uploadOptions = {
    folder: cat,
    resource_type: "auto",
    tags: [cat],
    public_id: cat?.concat(originalname),
  };

  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

module.exports = uploadImage;
