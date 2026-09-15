"use client";

import { useRef, useState } from "react";

import { Field } from "@/components/admin/ui";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * Pick an image, put it on Cloudinary, keep the delivered URL. The field also
 * accepts a pasted URL, so artwork that already lives somewhere does not have
 * to be re-uploaded.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "tbest",
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    const url = await uploadToCloudinary(file, folder);
    setUploading(false);
    if (!url) {
      setErr("Upload failed. Please try again.");
      return;
    }
    onChange(url);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-bone">
          {value ? (
            // A preview inside the dashboard only. A plain <img> sidesteps
            // next/image host configuration and never throws on a URL the
            // admin has just pasted.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-muted">None</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-bone disabled:opacity-60"
            >
              {uploading
                ? "Uploading…"
                : value
                  ? "Replace image"
                  : "Upload image"}
            </button>
            {value && !uploading && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value.trim())}
            placeholder="…or paste an image URL"
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-brand-900 outline-none transition-colors placeholder:text-muted/60 focus:border-copper-400"
          />
          {err && <p className="text-xs text-red-600">{err}</p>}
        </div>
      </div>
    </Field>
  );
}
