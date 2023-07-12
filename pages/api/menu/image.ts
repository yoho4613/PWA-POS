import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "../../../lib/s3";
import { nanoid } from "nanoid";
import { z } from "zod";
import { MAX_FILE_SIZE } from "../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const fileTypeSchema = z.object({
      fileType: z.string(),
    });

    if (!fileTypeSchema.safeParse(JSON.parse(req.body)).success) {
      res.status(400).json("Invalid Type");
    }

    const { fileType } = JSON.parse(req.body);

    const id = nanoid();
    const ex = fileType.split("/")[1] || "";
    const key = `${id}.${ex}`;

    const { url, fields } = (await new Promise((resolve, reject) => {
      s3.createPresignedPost(
        {
          Bucket: "pwa-pos",
          Fields: { key },
          Expires: 60,
          Conditions: [
            ["content-length-range", 0, MAX_FILE_SIZE],
            ["starts-with", "$Content-Type", "image/"],
          ],
        },
        (err, data) => {
          console.log(err);
          if (err) return reject(err);
          resolve(data);
        }
      );
    })) as any as { url: string; fields: string[] };

    res.status(200).json({ url, fields, key });
  }

  if (req.method === "DELETE") {
    const imageSchema = z.object({
      imageKey: z.string(),
    });

    if (!imageSchema.safeParse(JSON.parse(req.body)).success) {
      res.status(400).json("Invalid Type");
    }
    const { imageKey } = req.body;
    await s3.deleteObject({ Bucket: "pwa-pos", Key: imageKey }).promise();
    // Delete the image form db

    res.status(200).json({ success: true });
  }
}
