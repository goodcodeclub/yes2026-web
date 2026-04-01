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
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);

    const apiBase = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);

        try {
            const res = await fetch(`${apiBase}/api/users/register`, {
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



    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <img src={`${basePath}/logos/logo.svg`} className="w-full mb-4" />

                <h1 className="text-lg font-bold mb-3 text-center">Create a new account</h1>

                <form onSubmit={handleRegister} className="flex flex-col gap-4" autoComplete="off">

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="gbc_id" className=" text-white/70">
                            Student ID
                        </label>
                        <InputGroup>
                            <InputGroupInput id="gbc_id"
                                type="text"
                                autoComplete="new-password"
                                inputMode="numeric"
                                placeholder="e.g. 101234567"
                                value={gbcId}
                                onChange={(e) => setGbcId(e.target.value)}
                                onLoad={(e) => setGbcId("")}
                                required />
                        </InputGroup>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className=" text-white/70">
                            Your Access Code (6 characters minimum)
                        </label>
                        <Input
                            id="access_code"
                            type="text"
                            placeholder="Choose your access code"
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value.toUpperCase())}
                        />
                    </div>

                                        
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className=" text-white/70">
                            Confirm Access Code
                        </label>
                        <Input
                            id="confirm_access_code"
                            type="text"
                            placeholder="Confirm your access code"
                            minLength={6}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value.toUpperCase())}
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 ">{error}</p>
                    )}
                    {info && (
                        <p className="text-green-400 ">{info}</p>
                    )}

                    <div className="flex items-start gap-2">

                        <Field orientation="horizontal" className="items-start gap-2">
                            <Checkbox id="terms-checkbox" name="terms-checkbox" required />
                            <Label htmlFor="terms-checkbox" className="leading-sm">
                                I certify that I am a GBP School of Design student and understand that this dashboard is for showcasing my work in the year-end show.
                            </Label>
                        </Field>
                    </div>

                  <div className="flex items-start gap-2">

                        <Field orientation="horizontal" className="items-start gap-2">
                            <Checkbox id="access-code-checkbox" name="access-code-checkbox" required />
                            <Label htmlFor="access-code-checkbox" className="leading-sm">
                                I wrote the access code myself and have not shared it with anyone else.
                            </Label>
                        </Field>
                    </div>


                    <button
                        type="submit"
                        disabled={loading || password.length === 0 || password !== confirmPassword}
                        className="bg-[#FF4EAC] text-black font-semibold rounded-lg py-2 px-4 hover:bg-[#ff6dbc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering…" : "Register"}
                    </button>

                    <div className="flex flex-col gap-2">
                        <p className="text-white/70 text-sm text-center">
                            Already have an account?{" "}
                            <a href={`${basePath}/dashboard`} className="text-[#FF4EAC] hover:text-[#ff6dbc] transition-colors underline">
                                Log in here
                            </a>
                        </p>
                        <p className="text-white/70 text-sm text-center">
                           Need help? Contact us via MS Teams {" "}
                            <a href={"https://teams.cloud.microsoft/l/channel/19%3A3a840f0e378445a9bc10164594efd8db%40thread.tacv2/Website%20Support%20(YES!26)?groupId=f7c0dae2-a46b-44ff-a31d-cba1b25798d5&tenantId=b5dc206c-17fd-4b06-8bc8-24f0bb650229"} className="text-[#FF4EAC] hover:text-[#ff6dbc] transition-colors underline" target="_blank">
                                here
                            </a>
                        </p>                        
                    </div>


                </form>
            </div>
        </div>
    );
}
