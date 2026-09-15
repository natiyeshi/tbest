/**
 * Cloudinary unsigned uploads — the same shared account the firm's other sites
 * use. Runs from the browser in the admin forms, so no secret is involved and
 * nothing here may be imported into a server-only path expecting one.
 */
export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME || "de7yugvwl";
const UPLOAD_PRESET = "mymymy";

/** Serve an auto-format, auto-quality variant of a Cloudinary asset. */
export function optimizedCloudinaryUrl(secureUrl: string): string {
  return secureUrl.includes("/upload/")
    ? secureUrl.replace("/upload/", "/upload/f_auto,q_auto/")
    : secureUrl;
}

/**
 * Upload one file and return its optimized secure URL, or null if the upload
 * failed — the caller shows the error; nothing is thrown at the form.
 */
export async function uploadToCloudinary(
  file: File,
  folder = "tbest",
): Promise<string | null> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("cloud_name", CLOUD_NAME);
  data.append("folder", folder);
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`,
      { method: "POST", body: data },
    );
    const result = await res.json();
    if (!res.ok) {
      console.error("Cloudinary upload failed:", result?.error?.message);
      return null;
    }
    return optimizedCloudinaryUrl(result.secure_url as string);
  } catch (e) {
    console.error("Cloudinary upload error:", e);
    return null;
  }
}
