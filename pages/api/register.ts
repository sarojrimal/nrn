import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Disable Next's default body parser — formidable handles the multipart body instead.
export const config = {
  api: {
    bodyParser: false,
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  main: "Main Team",
  veterans: "Veterans Team",
  womens: "Women's Team",
};

function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    maxFileSize: 8 * 1024 * 1024, // 8MB cap
    multiples: false,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

function firstValue(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);

    const category = firstValue(fields.category);
    const teamName = firstValue(fields.teamName);
    const contactName = firstValue(fields.contactName);
    const email = firstValue(fields.email);
    const phone = firstValue(fields.phone);
    const playersRaw = firstValue(fields.players);
    const notes = firstValue(fields.notes);

    if (!category || !CATEGORY_LABELS[category]) {
      return res.status(400).json({ error: "Invalid or missing category" });
    }
    if (!teamName || !contactName || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const fileField = files.screenshot;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) {
      return res.status(400).json({ error: "Payment screenshot is required" });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const ext = (file.originalFilename?.split(".").pop() || "jpg").toLowerCase();
    const safeTeam = teamName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const storagePath = `${category}/${Date.now()}-${safeTeam}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("payment-screenshots")
      .upload(storagePath, fileBuffer, {
        contentType: file.mimetype || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return res.status(500).json({ error: "Failed to upload screenshot" });
    }

    // Screenshot bucket is private, so we store the path and generate
    // signed URLs on demand when viewing registrations in the admin view.
    const { error: insertError } = await supabaseAdmin.from("registrations").insert({
      category: CATEGORY_LABELS[category],
      team_name: teamName,
      contact_name: contactName,
      email,
      phone,
      players: playersRaw ? parseInt(playersRaw, 10) : null,
      notes: notes || null,
      screenshot_url: storagePath,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return res.status(500).json({ error: "Failed to save registration" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
