export default function AuditsLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="space-y-2">
        <div className="h-[32px] w-48 animate-pulse rounded-[4px] bg-line" />
        <div className="h-[20px] w-80 animate-pulse rounded-[4px] bg-line" />
      </div>
      <div className="h-[172px] animate-pulse rounded-[12px] border border-line bg-white" />
      <div className="h-[420px] animate-pulse rounded-[12px] border border-line bg-white" />
    </div>
  );
}
