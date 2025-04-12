export default function TermsOfService() {
	return (
		<p className="text-xs text-gray-500 mt-6 text-center">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="underline" target="_blank">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="http://policies.google.com/terms" className="underline" target="_blank">
            Terms of Service
          </a>{" "}
          apply.
        </p>
	);
}