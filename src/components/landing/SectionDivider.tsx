type Variant = 1 | 2 | 3;

const PATHS: Record<Variant, string> = {
  1: "M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z",
  2: "M0,10 C360,35 720,5 1080,25 C1260,35 1380,15 1440,10 L1440,40 L0,40 Z",
  3: "M0,30 C180,5 360,38 540,20 C720,2 900,38 1080,25 C1260,12 1380,32 1440,30 L1440,40 L0,40 Z",
};

export default function SectionDivider({ variant = 1 }: { variant?: Variant }) {
  return (
    <div className="w-full overflow-hidden leading-[0] pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="w-full h-10 block"
      >
        <path d={PATHS[variant]} fill="hsla(215, 14%, 21%, 0.3)" />
      </svg>
    </div>
  );
}
