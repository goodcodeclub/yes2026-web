"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [gbcId, setGbcId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);

    const apiBase = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);

        try {
            const res = await fetch(`${apiBase}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gbc_id: gbcId, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? "Login failed. Please try again.");
                return;
            }

            localStorage.setItem("session", JSON.stringify(data));
            router.push("/dashboard/profile");
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSendPassword() {
        if (!gbcId) {
            setError("Please enter your Student ID first.");
            return;
        }

        setError("");
        setInfo("");
        setSendingCode(true);

        try {
            const res = await fetch(`${apiBase}/api/users/code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gbc_id: gbcId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? "Failed to send password. Please try again.");
                return;
            }

            setInfo(data.message ?? "Password sent to your George Brown email.");
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setSendingCode(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="ff-pack-hard text-4xl text-[#FF4EAC] mb-2">YES!26</h1>
                <p className="text-white/60 text-sm mb-8">Dashboard Login</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="gbc_id" className="text-sm text-white/70">
                            Student ID
                        </label>
                        <input
                            id="gbc_id"
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g. 101338472"
                            value={gbcId}
                            onChange={(e) => setGbcId(e.target.value)}
                            required
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF4EAC] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm text-white/70">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF4EAC] transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                    {info && (
                        <p className="text-green-400 text-sm">{info}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#FF4EAC] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#ff6dbc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in…" : "Log In"}
                    </button>

                    <button
                        type="button"
                        onClick={handleSendPassword}
                        disabled={sendingCode}
                        className="text-white/50 text-sm hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed underline underline-offset-2"
                    >
                        {sendingCode ? "Sending…" : "Send me the password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
