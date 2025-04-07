import "./Loading.css";
export default function Loading() {
  return (
    <span className="flex justify-center items-center py-2 gap-5">
      <div className="flex space-x-1">
        <div className="dot w-2.5 h-2.5 bg-[#404040] rounded-full animate-dot1"></div>
        <div className="dot w-2.5 h-2.5 bg-[#404040] rounded-full animate-dot2"></div>
        <div className="dot w-2.5 h-2.5 bg-[#404040] rounded-full animate-dot3"></div>
      </div>
    </span>
  );
}
