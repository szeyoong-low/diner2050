export default function MenuItem() {
  return (
    <div className="relative w-full max-w-sm md:max-w-md">
      <div className="bg-white/4 backdrop-blur-2xl border border-white/8 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
          <div className="px-8 md:px-10 pt-9 md:pt-10 pb-9 md:pb-10 flex flex-col items-center gap-6 md:gap-7">
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.02em]">
                Next.js + Auth0
              </h1>
              <p className="text-slate-500 text-sm md:text-[15px] mt-1.5">
                Secure, simple authentication
              </p>
            </div>

            <div className="w-full h-px bg-white/6" />

            <div className="flex flex-col items-center gap-5 w-full">
              <p className="text-slate-400 text-sm md:text-[15px] text-center leading-relaxed tracking-[-0.01em]">
                  Sign in to access your account and protected content.
              </p>
            </div>
          </div>
      </div>
    </div>
    
  );
}