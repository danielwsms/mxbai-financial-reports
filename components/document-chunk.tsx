"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScoredVectorStoreChunk } from "@mixedbread/sdk/resources/index.mjs";

interface DocumentChunkProps {
  chunk: ScoredVectorStoreChunk;
}

export function DocumentChunk({ chunk }: DocumentChunkProps) {
  const formatScore = (score: number) => {
    return (score * 100).toFixed(1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative h-full hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-0 rounded-t-lg min-h-[200px] flex items-center justify-center">
            <img
              src={chunk.value as string}
              alt="Document content"
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute bottom-2 left-2 text-xs flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              {formatScore(chunk.score)}%
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] max-h-[95vh] p-2">
        <div className="flex items-center justify-center max-h-[90vh] overflow-auto">
          <img
            src={chunk.value as string}
            alt="Document content - Full resolution"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
