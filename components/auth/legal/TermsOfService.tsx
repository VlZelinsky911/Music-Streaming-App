export default function TermsOfService() {
  return (
      <p className="text-xs text-gray-500 text-center relative mt-6">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="/legal/policy" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/legal/terms" className="underline">
          Terms of Service
        </a>{" "}
        apply.
      </p>
  );
}
