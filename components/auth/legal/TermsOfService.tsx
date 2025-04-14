export default function TermsOfService() {
	return (
		<p className="text-xs text-gray-500 mt-6 text-center">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="/legal/policy" className="underline" target="_blank">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/legal/terms" className="underline" target="_blank">
            Terms of Service
          </a>{" "}
          apply.
        </p>
	);
}