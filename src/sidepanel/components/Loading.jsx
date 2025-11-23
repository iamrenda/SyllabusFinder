import { SyncLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-gray-600">
        <SyncLoader color="#155dfc" />
        <p className="text-sm font-medium mt-4">シラバス取得中．．．</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
