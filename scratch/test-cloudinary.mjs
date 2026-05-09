import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dufyqm2f2",
  api_key: "861138724541855",
  api_secret: "mPXc3K8jZ1VsnsRSQ5ZUCiDRJng",
});

async function run() {
  const result = await cloudinary.api.resources({
    type: "upload",
    max_results: 50,
  });

  for (const res of result.resources) {
    console.log(res.public_id);
  }
}

run().catch(console.error);
