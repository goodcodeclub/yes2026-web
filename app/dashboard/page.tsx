"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function LoginPage() {

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/yes2026-web" : "");

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
                <img src={`${basePath}/logos/logo2alt.svg`} className="w-full mb-4" />

                <h1 className="text-lg font-bold mb-3 text-center">Log in</h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="gbc_id" className=" text-white/70">
                            Student ID
                        </label>

                        <InputGroup>
                            <InputGroupInput id="gbc_id"
                                type="text"
                                autoComplete="one-time-code"
                                inputMode="numeric"
                                placeholder="e.g. 101234567"
                                value={gbcId}
                                onChange={(e) => setGbcId(e.target.value)}
                                required />
                        </InputGroup>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className=" text-white/70">
                            Access Code
                        </label>
                        <Input
                            id="access_code"
                            type="text"
                            placeholder="Your access code"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value.toUpperCase())}
                        />
                    </div>



                    {error && (
                        <p className="text-red-400 text-center">{error}</p>
                    )}
                    {info && (
                        <p className="text-green-400 text-center">{info}</p>
                    )}

                    {/* <div className="flex items-start gap-2">

                        <Field orientation="horizontal" className="items-start gap-2">
                            <Checkbox id="terms-checkbox" name="terms-checkbox" required />
                            <Label htmlFor="terms-checkbox" className="leading-sm">
                                I certify that I am a GBP School of Design student and understand that this dashboard is for showcasing my work in the year-end show.
                            </Label>
                        </Field>
                    </div> */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#FF4EAC] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#ff6dbc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in…" : "Log In"}
                    </button>

                    <div className="flex flex-col gap-2">
                        <p className="text-white/70 text-sm text-center">
                            Don't have an account?{" "}
                            <a href={`${basePath}/dashboard/register`} className="text-[#FF4EAC] hover:text-[#ff6dbc] transition-colors underline">
                                Register here
                            </a>
                        </p>

                        <p className="text-white/70 text-sm text-center">
                           Need help? Contact us via MS Teams {" "}
                            <a href={"https://teams.cloud.microsoft/l/channel/19%3A3a840f0e378445a9bc10164594efd8db%40thread.tacv2/Website%20Support%20(YES!26)?groupId=f7c0dae2-a46b-44ff-a31d-cba1b25798d5&tenantId=b5dc206c-17fd-4b06-8bc8-24f0bb650229"} className="text-[#FF4EAC] hover:text-[#ff6dbc] transition-colors underline" target="_blank">
                                here
                            </a>
                        </p>                            
                    </div>


                    {/* <button
                        type="button"
                        onClick={handleSendPassword}
                        disabled={sendingCode}
                        className="text-white/50  hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed underline underline-offset-2"
                    >
                        {sendingCode ? "Sending…" : "Send me the password"}
                    </button> */}
                </form>
            </div>
        </div>
    );
}
