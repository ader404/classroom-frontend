import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, MAX_FILE_SIZE, ALLOWED_TYPES } from "@/constants";
import { Trash, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";

function UploadWidget({
  value = null,
  onChange,
  disabled = false,
}: UploadWidgetProps) {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  const [deleteToken, setDeleteToken] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Always keep latest onChange
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync external value → internal preview
  useEffect(() => {
    setPreview(value);
    if (!value) {
      setDeleteToken(null);
    }
  }, [value]);

  // Initialize Cloudinary widget (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: MAX_FILE_SIZE,
          clientAllowedFormats: ALLOWED_TYPES.map((type: string) => type.split("/")[1]),
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Widget Error:", error);
            import("sonner").then(({ toast }) => toast.error("Upload failed. Check your Cloudinary configuration."));
          }

          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };

            setPreview(payload);
            setDeleteToken(result.info.delete_token ?? null);
            onChangeRef.current?.(payload);
            import("sonner").then(({ toast }) => toast.success("Image uploaded successfully!"));
          }
        },
      );

      return true;
    };

    if (initializeWidget()) return;
    
    let attempts = 0;
    const maxAttempts = 10;

    const intervalId = window.setInterval(() => {
      attempts++;
      if (initializeWidget() || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, []);

  const openWidget = () => {
    if (!disabled) {
      widgetRef.current?.open();
    }
  };

  const removeFromCloudinary = async () => {
    if (!preview) return;

    setIsRemoving(true);

    try {
      if (deleteToken) {
        const params = new URLSearchParams();
        params.append("token", deleteToken);

        await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`,
          {
            method: "POST",
            body: params,
          },
        );
      }
    } catch (error) {
      console.error("Failed to remove image from Cloudinary", error);
    } finally {
      setPreview(null);
      setDeleteToken(null);
      onChangeRef.current?.(null);
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="upload-preview">
          <img src={preview.url} alt="Uploaded file" />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={removeFromCloudinary}
            disabled={isRemoving || disabled}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      ) : (
        <div
          className="upload-dropzone"
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => !disabled && openWidget()}
          onKeyDown={(event) => {
            if (disabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openWidget();
            }
          }}
        >
          <div className="upload-prompt">
            <UploadCloud className="icon" />
            <div>
              <p>Click to upload photo</p>
              <p>PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadWidget;
