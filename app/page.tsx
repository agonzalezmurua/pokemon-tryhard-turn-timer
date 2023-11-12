import FullscreenLoading from "@/components/FullScreenLoading";
import dynamic from "next/dynamic";

const Timer = dynamic(() => import("@/components/Timer"), {
  ssr: false,
  loading() {
    return <FullscreenLoading />;
  },
});

export default function Home() {
  return (
    <main className="flex h-screen w-screen">
      <Timer />
    </main>
  );
}
