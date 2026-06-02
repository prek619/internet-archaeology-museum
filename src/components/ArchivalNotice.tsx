interface ArchivalNoticeProps {
  artifactId: string;
  artifactName: string;
  imageNote?: string | null;
  className?: string;
}

interface NoticeTemplate {
  headline: string;
  body: string;
}

const NOTICES: NoticeTemplate[] = [
  {
    headline: 'ARCHIVAL IMAGE UNAVAILABLE',
    body: 'The original photograph was filed under "Electrical Concepts" and has not been located since 2017. Three requests for its return have gone unanswered. The fourth was not sent.',
  },
  {
    headline: 'PHOTOGRAPH DEGRADED',
    body: 'Most of the image was lost during digitization. The remaining pixels were inconclusive. The technician noted they were also inconclusive about the technician.',
  },
  {
    headline: 'IMAGE WITHHELD',
    body: 'The exhibit remains under routine review by parties that have not identified themselves. The review is described as ongoing. No timeline has been provided. No questions have been accepted.',
  },
  {
    headline: 'VISUAL RECORD SEALED',
    body: 'Access requires written authorization from a department that was restructured in 2019. The successor department does not recognize this authorization. The original department has not been informed.',
  },
  {
    headline: 'IMAGE TEMPORARILY UNAVAILABLE',
    body: 'The visual record accompanied the exhibit during its current loan period. The institution it was loaned to has not confirmed receipt. This is considered normal.',
  },
  {
    headline: 'PHOTOGRAPH MISFILED',
    body: 'The image was catalogued correctly. It was then moved for safekeeping. The location chosen for safekeeping was not recorded, as this was considered implied.',
  },
  {
    headline: 'DOCUMENTATION PENDING',
    body: 'Photographic documentation of this exhibit was scheduled for completion in Q3 of the relevant year. The year has not been specified. The scheduling process remains open.',
  },
  {
    headline: 'IMAGE IN TRANSIT',
    body: 'The photograph is currently being transferred between archive systems. This process began in 2021. Progress updates are not available, as the previous system has been decommissioned.',
  },
  {
    headline: 'RECORD MISSING',
    body: 'No photographic record exists for this exhibit. A record of the missing record does exist. The record of the missing record cannot currently be accessed, as it is also missing.',
  },
  {
    headline: 'FORMAT INCOMPATIBLE',
    body: 'The original image exists but cannot be displayed. It was saved in a proprietary format developed by a company that dissolved before releasing the viewer software. The password for the file is believed to be "password."',
  },
  {
    headline: 'PHOTOGRAPH DISPUTED',
    body: 'Two departments claim ownership of this image. Neither has agreed to display it until the dispute is resolved. The dispute resolution process has not been initiated. Both departments agree this is the other department\'s responsibility.',
  },
  {
    headline: 'CLASSIFICATION PENDING',
    body: 'The photograph exists but has not been assigned a classification level. Until a classification is assigned, it cannot be displayed. The classification committee meets annually. The next meeting has been postponed.',
  },
  {
    headline: 'IMAGE UNDER REVIEW',
    body: 'The photograph was submitted for quality assessment in 2020. The assessment identified concerns. The nature of the concerns was not documented. The assessor is no longer with the institution.',
  },
  {
    headline: 'ARCHIVE ACCESS RESTRICTED',
    body: 'This record requires in-person access at the primary archive facility. The facility is open by appointment. Appointments are available six to eight weeks in advance. The booking system is currently offline.',
  },
  {
    headline: 'PHOTOGRAPH RETURNED TO ESTATE',
    body: 'Upon the inventor\'s passing, all materials were returned to the estate as requested. The estate subsequently donated them back to the museum. The museum cannot locate the donation. The estate considers the matter closed.',
  },
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

  return (
    <div
      className={[
        'relative w-full h-full min-h-[160px]',
        'bg-neo-bg border-b-4 border-black',
        'flex flex-col justify-between p-4',
        className,
      ].join(' ')}
      aria-label="Archival notice: image unavailable"
    >
      {/* Halftone texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Corner stamp */}
      <div className="absolute top-2 right-2 opacity-20">
        <div className="border-2 border-black px-1.5 py-0.5 rotate-12">
          <span className="font-black text-[8px] uppercase tracking-widest text-black">
            FILE
          </span>
        </div>
      </div>

      {/* Notice content */}
      <div className="relative z-10 space-y-2">
        <p className="font-black text-[10px] uppercase tracking-[0.15em] text-black/40">
          Visual Record
        </p>
        <p className="font-black text-xs uppercase tracking-widest text-black leading-tight">
          {template.headline}
        </p>
        <p className="font-bold text-[11px] leading-relaxed text-black/70">
          {imageNote ? imageNote : template.body}
        </p>
      </div>

      {/* Bottom rule */}
      <div className="relative z-10 mt-3 pt-2 border-t-2 border-black/20 flex items-center justify-between">
        <span className="font-black text-[9px] uppercase tracking-widest text-black/30">
          Museum Archives
        </span>
        <span className="font-black text-[9px] uppercase tracking-widest text-black/30">
          Ref. {artifactId.slice(-6).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
