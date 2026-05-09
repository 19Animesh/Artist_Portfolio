"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, CheckCircle, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  /** The name of the hidden input (read by the parent form) */
  name: string;
  /** Pre-filled URL when editing an existing painting */
  defaultValue?: string;
  required?: boolean;
}

type Mode = "file" | "url";

export function ImageUploader({ name, defaultValue = "", required }: ImageUploaderProps) {
  const [mode, setMode] = useState<Mode>("file");
  const [preview, setPreview] = useState<string>(defaultValue);
  const [urlInput, setUrlInput] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(!!defaultValue);
  const fileRef = useRef<HTMLInputElement>(null);

  /** Convert file → base64 and upload via /api/upload */
  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    setUploaded(false);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: base64 }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");

      setPreview(json.url);
      setUrlInput(json.url);
      setUploaded(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleUrlCommit() {
    setPreview(urlInput);
    setUploaded(!!urlInput);
    setError(null);
  }

  function reset() {
    setPreview("");
    setUrlInput("");
    setUploaded(false);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden input that the parent form reads */}
      <input type="hidden" name={name} value={urlInput} required={required} />

      {/* Mode tabs */}
      <div className="flex gap-1 mb-1">
        {(["file", "url"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-widest uppercase transition-colors ${
              mode === m
                ? "bg-[var(--color-gold-400)] text-black font-bold"
                : "border border-[var(--color-gold-800)] text-[var(--color-gold-500)] hover:border-[var(--color-gold-500)]"
            }`}
          >
            {m === "file" ? <Upload size={12} /> : <LinkIcon size={12} />}
            {m === "file" ? "Upload File" : "Paste URL"}
          </button>
        ))}
      </div>

      {/* File drop zone */}
      {mode === "file" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
            uploading
              ? "border-[var(--color-gold-600)] opacity-70"
              : "border-[var(--color-gold-800)] hover:border-[var(--color-gold-500)]"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {uploading ? (
            <Loader2 size={28} className="text-[var(--color-gold-400)] animate-spin" />
          ) : (
            <Upload size={28} className="text-[var(--color-gold-600)]" />
          )}
          <p className="text-sm text-[var(--color-gold-500)] text-center">
            {uploading
              ? "Uploading to Cloudinary…"
              : "Click or drag & drop an image here"}
          </p>
          <p className="text-[10px] text-[var(--color-gold-700)] uppercase tracking-widest">
            JPG, PNG, WEBP — max 10 MB
          </p>
        </div>
      )}

      {/* URL paste mode */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://res.cloudinary.com/…"
            className="flex-1 bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors text-sm"
          />
          <button
            type="button"
            onClick={handleUrlCommit}
            className="px-4 py-2 bg-[var(--color-gold-900)] text-[var(--color-gold-300)] text-xs rounded hover:bg-[var(--color-gold-800)] transition-colors"
          >
            Preview
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}

      {/* Success badge */}
      {uploaded && !uploading && !error && (
        <p className="text-emerald-400 text-xs flex items-center gap-1">
          <CheckCircle size={12} /> Image ready
        </p>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full aspect-[3/4] max-w-xs rounded-lg overflow-hidden border border-[var(--color-gold-800)] group">
          <Image
            src={preview}
            alt="Preview"
            fill
            sizes="320px"
            className="object-cover"
            unoptimized={preview.startsWith("data:")}
          />
          <button
            type="button"
            onClick={reset}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
