import { ArtifactStatus } from "@/generated/prisma/client";

interface StatusBadgeProps {
  status: ArtifactStatus;
  className?: string;
}

const config: Record<ArtifactStatus, { label: string; classes: string }> = {
  ACTIVE: {
    label: "Active",
    classes: "bg-neo-secondary text-black border-black",
  },
  DISCONTINUED: {
    label: "Discontinued",
    classes: "bg-neo-bg text-black border-black",
  },
  DESTROYED: {
    label: "Destroyed",
    classes: "bg-black text-white border-black",
  },
  ON_LOAN: {
    label: "On Loan",
    classes: "bg-neo-muted text-black border-black",
  },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const { label, classes } = config[status];
  return (
    <span
      className={[
        "inline-block px-3 py-1",
        "border-4 font-black text-xs uppercase tracking-widest",
        classes,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
