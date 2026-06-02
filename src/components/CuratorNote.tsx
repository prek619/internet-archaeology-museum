interface CuratorNoteProps {
  note: string;
  className?: string;
}

export default function CuratorNote({ note, className = "" }: CuratorNoteProps) {
  return (
    <div
      className={[
        "border-l-4 border-black pl-4 py-1",
        "bg-neo-muted/30",
        className,
      ].join(" ")}
    >
      <p className="text-xs font-black uppercase tracking-widest text-black/60 mb-1">
        Curator&apos;s Note
      </p>
      <p className="text-sm font-bold text-black italic leading-relaxed">
        &ldquo;{note}&rdquo;
      </p>
    </div>
  );
}
