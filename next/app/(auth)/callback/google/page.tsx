"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/ui/loading/Loading";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
		const hash = window.location.hash;
		const query = new URLSearchParams(window.location.search);
	
		const tokenFromHash = new URLSearchParams(hash.slice(1)).get('access_token');
		const tokenFromQuery = query.get('id_token') || query.get('access_token');
	
		const token = tokenFromHash || tokenFromQuery;
	
		if (!token) {
			console.warn("❌ Токен не знайдено");
			return;
		}
	
		console.log("✅ TOKEN:", token);
		localStorage.setItem("token", token);
		router.push("/");
	}, []);
	
	

  return <Loading />;
};

export default AuthCallback;
