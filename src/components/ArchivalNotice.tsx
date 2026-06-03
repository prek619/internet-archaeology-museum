interface ArchivalNoticeProps {
  artifactId: string;
  artifactName?: string;
  imageNote?: string | null;
  className?: string;
}

interface NoticeTemplate {
  category: string;
  notice: string;
}

const NOTICES: NoticeTemplate[] = [
  { category: 'VISUAL RECORD',   notice: 'Filed under "Weather" by mistake.' },
  { category: 'PHOTOGRAPH',      notice: 'Camera declined involvement.' },
  { category: 'ARCHIVE',         notice: 'Record currently unaccounted for.' },
  { category: 'IMAGE',           notice: 'Archived as a learning experience.' },
  { category: 'VISUAL RECORD',   notice: 'The image resigned.' },
  { category: 'PHOTOGRAPH',      notice: 'Visual record remains theoretical.' },
  { category: 'ARCHIVE',         notice: 'Filed successfully. Retrieval unsuccessful.' },
  { category: 'IMAGE',           notice: 'Photograph entered administration.' },
  { category: 'VISUAL RECORD',   notice: 'Misplaced during routine certainty.' },
  { category: 'PHOTOGRAPH',      notice: 'Photograph remains in evidence.' },
  { category: 'ARCHIVE',         notice: 'Image withheld pending further withholding.' },
  { category: 'IMAGE',           notice: 'Transferred to secure storage. Storage unlocated.' },
  { category: 'VISUAL RECORD',   notice: 'The photograph is aware of the situation.' },
  { category: 'PHOTOGRAPH',      notice: 'Documentation declined on professional grounds.' },
  { category: 'ARCHIVE',         notice: 'Retrieval requested. Request acknowledged. No action taken.' },
  { category: 'IMAGE',           notice: 'Image on loan to an institution that denies receiving it.' },
  { category: 'VISUAL RECORD',   notice: 'The photograph and the exhibit were separated during transit.' },
  { category: 'PHOTOGRAPH',      notice: 'Digitization was completed. The digital file was not.' },
  { category: 'ARCHIVE',         notice: 'Currently under review by a committee that was disbanded.' },
  { category: 'IMAGE',           notice: 'Record sealed at the request of no one in particular.' },
];

function deterministicIndex(id: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

export default function ArchivalNotice({
  artifactId,
  imageNote,
  className = '',
}: ArchivalNoticeProps) {
  const template = NOTICES[deterministicIndex(artifactId, NOTICES.length)];
  const displayText = imageNote || template.notice;

  return (
    <div
      className={[
        'relative w-full h-full',
        'bg-neo-bg',
        'flex flex-col justify-between',
        className,
      ].join(' ')}
      aria-label="Archival notice: image unavailable"
    >
      {/* Halftone texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          opacity: 0.035,
        }}
      />

      {/* Corner stamp */}
      <div className="absolute bottom-3 right-3 opacity-15 pointer-events-none">
        <div className="border-[1.5px] border-black px-1.5 py-0.5 rotate-12">
          <span className="font-black text-[7px] uppercase tracking-widest text-black">
            FILE
          </span>
        </div>
      </div>

      {/* Content — pushed down to clear the exhibit/status badges above */}
      <div className="relative z-10 flex flex-col h-full px-4 pb-4 pt-12">
        {/* Category label */}
        <p className="font-black text-[9px] uppercase tracking-[0.18em] text-black/35 mb-1.5">
          {template.category}
        </p>

        {/* The notice — single sentence, allowed to wrap but won't overflow */}
        <p className="font-black text-[11px] uppercase tracking-wide text-black leading-snug flex-1">
          {displayText}
        </p>

      </div>
    </div>
  );
}
