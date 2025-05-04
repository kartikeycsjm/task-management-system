"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await
                axios.post('/api/forgot-password',
                    { email },
                );

            const data = await response.data;
            setError(data.msg)
            
            setIsSubmitted(true); // show success UI
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-green-400 text-lg">✓</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Reset link sent</h3>
                                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                    <p>
                                        We've sent a password reset link to <strong>{email}</strong>. Please check your email inbox and
                                        follow the instructions to reset your password.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-green-800 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                        Return to login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {error && (
                                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>
                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Remember your password?{" "}
                                <Link href="login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
