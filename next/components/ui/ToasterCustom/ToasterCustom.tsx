import { Toaster } from "react-hot-toast";

export default function ToasterCustom() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 6000,
        style: {
          fontFamily: "Arial, sans-serif",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#00c950",
          color: "#fff",
        },
      }}
    />
  );
}
