import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dufyqm2f2",
  api_key: "861138724541855",
  api_secret: "mPXc3K8jZ1VsnsRSQ5ZUCiDRJng",
});

function extractPublicId(url) {
  try {
    const parts = url.split('/');
    const fileWithExt = parts.pop();
    const folder = parts.pop();
    if (!fileWithExt || !folder) return null;
    const filename = fileWithExt.split('.')[0];
    return `${folder}/${filename}`;
  } catch {
    return null;
  }
}

async function run() {
  const imageSrc = "https://res.cloudinary.com/dufyqm2f2/image/upload/v1778322568/artist_portfolio/uavsz1cjea7nrojmpbht.png";
  const publicId = extractPublicId(imageSrc);
  console.log("PublicId:", publicId);

  const contextMap = "title=My%20Title|slug=my-slug";
  try {
    const res = await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      context: contextMap
    });
    console.log("Success:", res.context);
  } catch (err) {
    console.error("Error explicit:", err);
  }
}
run();
