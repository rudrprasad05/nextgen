"use client";

import React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Palette, Upload, X, ImageIcon } from "lucide-react";

interface BrandingProps {
  favicon: File | null;
  onFaviconChange: (value: File | null) => void;
}

export function Branding({ favicon, onFaviconChange }: BrandingProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      onFaviconChange(file);
      setFaviconPreview(previewUrl);
    }
  };

  const handleRemove = () => {
    onFaviconChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Branding</h2>
          <p className="text-sm text-muted-foreground">
            Upload a favicon for your site
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Favicon</Label>

          {favicon ? (
            <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted overflow-hidden">
                <img
                  src={faviconPreview || "/placeholder.svg"}
                  alt="Favicon preview"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Favicon uploaded
                </p>
                <p className="text-xs text-muted-foreground">
                  Click remove to upload a different image
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-3">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Drop your favicon here
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                or click to browse
              </p>
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Recommended: 32x32 or 64x64 pixels. PNG, ICO, or SVG format.
          </p>
        </div>
      </div>
    </div>
  );
}
