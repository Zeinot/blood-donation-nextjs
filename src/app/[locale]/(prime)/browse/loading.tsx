import LoadingSpinner from "@/components/LoadingSpinner";

export default function loading() {
  return (
    <div className="flex  justify-center">
      <div className="flex flex-col min-h-screen justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );
}
