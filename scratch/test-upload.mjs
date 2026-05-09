import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dufyqm2f2",
  api_key: "861138724541855",
  api_secret: "mPXc3K8jZ1VsnsRSQ5ZUCiDRJng",
});

async function run() {
  const uploadResponse = await cloudinary.uploader.upload(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    { folder: "artist_portfolio" }
  );
  console.log("Uploaded image:", uploadResponse.secure_url, "Public ID:", uploadResponse.public_id);

  // simulate extractPublicId
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

  const publicId = extractPublicId(uploadResponse.secure_url);
  console.log("Extracted public ID:", publicId);

  // simulate context map
  const contextMap = "title=My%20Test%20Painting|slug=my-test-painting|medium=Oil|category=Oil|year=2024|size=10x10|shortDescription=Test%20description|featured=false";
  
  try {
    const explicitResponse = await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      context: contextMap,
    });
    console.log("Explicit Response:", explicitResponse.context);
  } catch (error) {
    console.error("Explicit error:", error);
  }
}

run().catch(console.error);
