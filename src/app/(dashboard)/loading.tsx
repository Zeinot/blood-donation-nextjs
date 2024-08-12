import LoadingSpinner from "@/components/LoadingSpinner";

export default function loading() {
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <LoadingSpinner />
    </div>
  );
}
