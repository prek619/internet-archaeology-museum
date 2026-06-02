"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import CuratorNote from "@/components/CuratorNote";
import ArchivalNotice from "@/components/ArchivalNotice";
import { ArtifactStatus } from "@/generated/prisma/client";

export interface ArtifactCardData {
  id: string;
  exhibitNumber: string;
  name: string;
  releaseYear: number | null;
  inventor: string | null;
  purpose: string;
  failureReason: string;
  historicalImpact: string | null;
  curatorNote: string | null;
  imageUrl: string | null;
  imageNote: string | null;
  status: ArtifactStatus;
}

interface ArtifactCardProps {
  artifact: ArtifactCardData;
}

const statusAccent: Record<ArtifactStatus, string> = {
  ACTIVE:       "border-l-[6px] border-l-neo-secondary",
  DISCONTINUED: "border-l-[6px] border-l-black",
  DESTROYED:    "border-l-[6px] border-l-neo-accent",
  ON_LOAN:      "border-l-[6px] border-l-neo-muted",
};

export default function ArtifactCard({ artifact }: ArtifactCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={[
        "bg-white border-4 border-black",
        statusAccent[artifact.status],
        "shadow-neo-md transition-all duration-200",
        expanded ? "shadow-neo-lg -translate-y-1" : "hover:shadow-neo-lg hover:-translate-y-1",
      ].join(" ")}
    >
      {/* Visual area — real image or archival notice */}
      <div className="relative border-b-4 border-black h-48 overflow-hidden">
        {artifact.imageUrl ? (
          <Image
            src={artifact.imageUrl}
            alt={artifact.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <ArchivalNotice
            artifactId={artifact.id}
            artifactName={artifact.name}
            imageNote={artifact.imageNote}
            className="h-full"
          />
        )}

        {/* Exhibit number — bottom-left to avoid notice headline overlap */}
        <div className="absolute bottom-3 left-3 bg-neo-secondary border-4 border-black px-2 py-1 shadow-neo-sm">
          <span className="font-black text-xs uppercase tracking-widest">
            {artifact.exhibitNumber}
          </span>
        </div>

        {/* Status badge — top-right */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={artifact.status} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-black text-xl leading-tight uppercase tracking-tight">
            {artifact.name}
          </h3>
          {artifact.releaseYear && (
            <p className="text-xs font-black uppercase tracking-widest text-black/50 mt-1">
              Released {artifact.releaseYear}
            </p>
          )}
        </div>

        <div className="space-y-3 text-sm font-bold leading-relaxed">
          <div>
            <span className="font-black text-xs uppercase tracking-widest text-black/50">
              Purpose —{" "}
            </span>
            <span className={expanded ? "" : "line-clamp-2"}>
              {artifact.purpose}
            </span>
          </div>
          <div>
            <span className="font-black text-xs uppercase tracking-widest text-black/50">
              Why It Failed —{" "}
            </span>
            <span className={expanded ? "" : "line-clamp-2"}>
              {artifact.failureReason}
            </span>
          </div>
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-5 pt-5 border-t-4 border-black space-y-4">
            {artifact.inventor && (
              <div>
                <span className="font-black text-xs uppercase tracking-widest text-black/50 block mb-0.5">
                  Inventor
                </span>
                <p className="text-sm font-bold">{artifact.inventor}</p>
              </div>
            )}
            {artifact.historicalImpact && (
              <div>
                <span className="font-black text-xs uppercase tracking-widest text-black/50 block mb-0.5">
                  Historical Impact
                </span>
                <p className="text-sm font-bold">{artifact.historicalImpact}</p>
              </div>
            )}
            {artifact.curatorNote && (
              <CuratorNote note={artifact.curatorNote} />
            )}
          </div>
        )}

        {/* Expand / collapse */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className={[
            "mt-4 w-full flex items-center justify-center gap-2",
            "h-10 border-4 border-black bg-neo-bg",
            "font-black text-xs uppercase tracking-widest",
            "hover:bg-neo-secondary transition-colors duration-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          ].join(" ")}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse exhibit details" : "Expand exhibit details"}
        >
          {expanded ? (
            <>
              Close <ChevronUp className="h-4 w-4 stroke-[3px]" />
            </>
          ) : (
            <>
              View Exhibit <ChevronDown className="h-4 w-4 stroke-[3px]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
