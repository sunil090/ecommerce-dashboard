// app/signup/page.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signup, setAuthToken } from "@/lib/api";

type FormData = { name: string; email: string; password: string; confirm: string };

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState } = useForm<FormData>({
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });
  const password = watch("password");

  async function onSubmit(data: FormData) {
    if (data.password !== data.confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await signup({ name: data.name, email: data.email, password: data.password });
      if (response?.token) {
        setAuthToken(response.token);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        router.push("/dashboard");
      } else if (response?.success === false) {
        alert(response?.error || "Signup failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      alert(err?.message || "Signup failed");
    }
  }

  function handleGoogleSignup() {
    // Redirect to server-side Google OAuth entrypoint
    window.location.href = "/api/auth/google";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-1">Create account</h1>
        <p className="text-sm text-gray-500 mb-6">Create an admin account</p>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 py-2 rounded-lg hover:shadow-sm focus:outline-none"
            type="button"
            aria-label="Sign up with Google"
          >
            {/* small google svg as above */}
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden>
              <path fill="#EA4335" d="M24 12.5v8.5h10.9c-.5 2.6-2.3 4.9-4.9 6.4l8 6.2C39.6 33 43 28.9 43 24c0-1.6-.2-3.2-.6-4.7H24z"/>
              <path fill="#34A853" d="M10.9 20.9A13.9 13.9 0 0 0 9.7 24c0 2.2.5 4.2 1.4 6.1l.1.3 8-6.2c-.2-.7-.3-1.4-.3-2.2 0-.8.1-1.5.3-2.2l-8.3-1.1z"/>
              <path fill="#4A90E2" d="M24 43c5.7 0 10.5-1.9 14-5.1l-8-6.2c-2.2 1.5-5 2.4-8 2.4-6.2 0-11.4-4.2-13.3-9.9l-8.3 1.1C5.5 36.8 14.1 43 24 43z"/>
              <path fill="#FBBC05" d="M5 12.3l8.3 1.1C15.8 8.6 19.8 6 24 6c3.2 0 6.2 1 8.9 2.8L24 16.9c-3.1 0-5.8 1-8 2.4l-8-6.2z"/>
            </svg>
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex-1 border-t" />
            <span>or</span>
            <span className="flex-1 border-t" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Full name</label>
              <input
                type="text"
                {...register("name", { required: "Name required" })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Asha Verma"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email required" })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password required", minLength: 6 })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Confirm password</label>
              <input
                type="password"
                {...register("confirm", { required: "Confirm required", minLength: 6 })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Repeat password"
              />
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState.isSubmitting ? "Creating..." : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account? <a className="text-blue-600 underline" href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
