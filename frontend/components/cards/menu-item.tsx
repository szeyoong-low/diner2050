import Image from "next/image";
import { StrapiImage } from "../images/strapi-image";

export default function MenuItem() {
  return (
    <div className="px-8 md:px-10 pt-9 md:pt-10 pb-9 md:pb-10 flex flex-col items-center gap-6 md:gap-7">

        {/* <Image src="https://img.freepik.com/premium-vector/cute-cartoon-cube-icon-with-gradient-color-scheme-transparent-background_1211851-50.jpg?semt=ais_hybrid&w=740&q=80" alt="" width="20" height="20"/> */}

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
    );
}