"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PageSchema } from "@/lib/page-builder/types";
import { Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ImportSchemaDialogProps {
  onImport: (schema: PageSchema) => void;
}

export function ImportSchemaDialog({ onImport }: ImportSchemaDialogProps) {
  const [open, setOpen] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsedSchema, setParsedSchema] = useState<PageSchema | null>(null);

  // 🔹 Real-time JSON validation
  useEffect(() => {
    if (!rawJson.trim()) {
      setError(null);
      setParsedSchema(null);
      return;
    }

    try {
      const parsed = JSON.parse(rawJson);

      // Optional: structural validation hook
      if (!parsed?.root || !parsed?.meta) {
        throw new Error("Invalid schema: missing root or meta");
      }

      setParsedSchema(parsed as PageSchema);
      setError(null);
    } catch (err) {
      setParsedSchema(null);
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  }, [rawJson]);

  const canImport = useMemo(() => {
    return parsedSchema !== null && error === null;
  }, [parsedSchema, error]);

  const handleImport = () => {
    if (!parsedSchema) return;

    onImport(parsedSchema);
    setRawJson("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Import JSON
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Page Schema</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Paste your PageSchema JSON here…"
            className="min-h-[300px] font-mono text-sm"
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {canImport && (
            <Alert>
              <AlertDescription>
                JSON is valid and ready to import.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!canImport}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
