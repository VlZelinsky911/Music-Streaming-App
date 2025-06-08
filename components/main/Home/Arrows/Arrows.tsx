import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Arrows() {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
    }
  }, []);
	
  return (
    <>
      <button
        onClick={() => canGoBack && router.back()}
        disabled={!canGoBack}
        className="cursor-pointer active:scale-95"
      >
        <Image src="/arrowBack.svg" width={25} height={25} alt="Back" />
      </button>
      <button
        className="cursor-pointer active:scale-95"
        onClick={() =>
          typeof window !== "undefined" && window.history.forward()
        }
      >
        <Image src="/arrowForward.svg" width={25} height={25} alt="Forward" />
      </button>
    </>
  );
}
