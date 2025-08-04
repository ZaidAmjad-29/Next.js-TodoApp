import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle2 size={32} className="text-white" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stay Organized,
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">
              Get Things Done
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The todo app that helps you manage tasks efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <RegisterLink className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started
              <ArrowRight size={20} />
            </RegisterLink>

            <LoginLink className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-sm hover:shadow-md">
              Sign In
            </LoginLink>
          </div>
        </div>
      </div>
    </div>
  );
}
