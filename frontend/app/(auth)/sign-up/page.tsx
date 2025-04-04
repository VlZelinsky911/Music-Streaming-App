
export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-black text-center">
        <header>
        <img src="spoti_logo_white.svg" alt="Spotify Logo" className="mx-auto w-12 mb-7" />
        
        <h1 className="mx-auto w-[320px] text-2xl font-bold mb-20">Зареєструйтеся, щоб почати слухати</h1>
        </header>
				<main>
				<div className="text-left">
          <label className="text-sm font-semibold mb-2 block">Адреса електронної пошти</label>
          <input
            type="email"
            placeholder="name@domain.com"
            className="w-full p-3 rounded-md border border-gray-600 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full mt-4">
            Далі
          </button>
        </div>
				</main>
				<footer>
        
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-gray-400">або</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        
        <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3">
          <img src="/google_icon.svg" alt="Google" className="w-5 h-5 mr-2" /> Зареєструватися через Google
        </button>
        <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3">
          <img src="/facebook_icon.svg" alt="Facebook" className="w-5 h-5 mr-2" /> Зареєструватися через Facebook
        </button>
        <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full">
          <img src="apple_icon.svg" alt="Apple" className="w-5 h-5 mr-2" /> Вхід через Apple
        </button>
        
        <p className="text-sm text-gray-400 mt-6">
          Уже маєте акаунт? <a href="/login" className="text-white underline">Увійдіть тут.</a>
        </p>
        
        <p className="text-xs text-gray-500 mt-6">
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="underline"> Privacy Policy </a>
          and <a href="#" className="underline">Terms of Service</a> apply.
        </p>
				</footer>
      </div>
    </div>
  );
}
