import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Cloudflare R2 Client (Lazy Initialization)
  let s3Client: S3Client | null = null;
  const getS3Client = () => {
    if (!s3Client) {
      const accountId = process.env.R2_ACCOUNT_ID;
      const accessKeyId = process.env.R2_ACCESS_KEY_ID;
      const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

      if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error("R2 configuration missing. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.");
      }

      s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    }
    return s3Client;
  };

  // API to get pre-signed URL for R2 upload
  app.post("/api/upload/presigned-url", async (req, res) => {
    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: "fileName and contentType are required" });
    }

    try {
      const client = getS3Client();
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${fileName}`,
        ContentType: contentType,
      });

      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      const publicUrl = `https://cdn.fitrimahadzir.my/${command.input.Key}`;

      res.json({ uploadUrl: url, publicUrl });
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate pre-signed URL" });
    }
  });

  // Cloudflare Analytics API
  app.get("/api/analytics/cloudflare", async (req, res) => {
    try {
      const token = process.env.CLOUDFLARE_API_TOKEN;
      const zoneId = process.env.CLOUDFLARE_ZONE_ID;
      
      if (!token || !zoneId) {
        return res.status(400).json({ error: "Cloudflare credentials not configured" });
      }

      const timeframe = req.query.timeframe || 'month';
      let days = 30;
      if (timeframe === 'week') days = 7;
      else if (timeframe === 'year') days = 365;

      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - days);
      const dateGt = pastDate.toISOString().split('T')[0];

      const query = `
        query {
          viewer {
            zones(filter: {zoneTag: "${zoneId}"}) {
              httpRequests1dGroups(limit: ${days}, orderBy: [date_ASC], filter: { date_gt: "${dateGt}" }) {
                dimensions {
                  date
                }
                sum {
                  requests
                  pageViews
                  bytes
                }
                uniq {
                  uniques
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.errors) {
        console.error("Cloudflare GraphQL Errors:", data.errors);
        return res.status(400).json({ error: "Cloudflare GraphQL query failed", details: data.errors });
      }
      res.json(data);
    } catch (error) {
      console.error("Cloudflare Analytics Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch analytics" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
