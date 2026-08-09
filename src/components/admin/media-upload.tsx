"use client";

import { useRef, useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";

/**
 * Direct to bucket uploader.
 *
 * Asks the server for a presigned PUT, sends the file straight to storage,
 * then hands the resulting public URL back so the surrounding form can save
 * it. XMLHttpRequest rather than fetch, because upload progress events are
 * the one thing fetch still cannot report.
 */

type Status = "idle" | "preparing" | "uploading" | "done" | "error";

export interface MediaUploadProps {
  /** Receives the public URL once the object is in the bucket. */
  onUploaded: (result: { url: string; contentType: string; fileName: string }) => void;
  disabled?: boolean;
}

export function MediaUpload({ onUploaded, disabled }: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string>("");

  async function handleFile(file: File) {
    setStatus("preparing");
    setProgress(0);
    setMessage(file.name);

    try {
      const response = await fetch("/api/admin/media/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type, size: file.size }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not prepare the upload.");
      }

      const { uploadUrl, publicUrl } = (await response.json()) as {
        uploadUrl: string;
        publicUrl: string;
      };

      setStatus("uploading");
      await putToStorage(uploadUrl, file, setProgress);

      setStatus("done");
      setMessage(file.name);
      onUploaded({ url: publicUrl, contentType: file.type, fileName: file.name });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  const busy = status === "preparing" || status === "uploading";

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml,video/mp4,video/webm,application/pdf"
        disabled={disabled || busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
          // Allow re-selecting the same file after a failure.
          event.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || busy}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-dashed border-border-strong px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
        {busy ? "Uploading…" : "Choose a file to upload"}
      </button>

      {busy ? (
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Upload progress"
          className="h-1 w-full overflow-hidden rounded-full bg-card-raised"
        >
          <div
            className="h-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      {status === "done" ? (
        <p className="flex items-center gap-2 text-xs text-success">
          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Uploaded {message}. URL filled in below.</span>
        </p>
      ) : null}

      {status === "error" ? (
        <p className="flex items-center gap-2 text-xs text-destructive" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </p>
      ) : null}
    </div>
  );
}

function putToStorage(
  url: string,
  file: File,
  onProgress: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    // Must match the type that was signed, or the bucket rejects it.
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Storage rejected the upload (${xhr.status}).`));
    });
    xhr.addEventListener("error", () =>
      reject(new Error("Network error while uploading. Check the bucket CORS rules.")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled.")));

    xhr.send(file);
  });
}
