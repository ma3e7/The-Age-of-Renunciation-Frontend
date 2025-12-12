import { useState } from "react";

const API = "http://127.0.0.1:8000/api/users";

const Register = ({ onAuthChange }) => {
    const [openModal, setOpenModal] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const reset = () => {
        setName("");
        setPassword("");
        setErrorMessage("");
    };

    const handleSignup = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const res = await fetch(`${API}/signup/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Signup failed");

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            onAuthChange(true);
            reset();
            setOpenModal(null);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };

    const handleSignin = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const res = await fetch(`${API}/signin/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid credentials");

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            onAuthChange(true);
            reset();
            setOpenModal(null);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <button
                id="open-signin"
                style={{ display: "none" }}
                onClick={() => setOpenModal("signin")}
            />
            <button
                id="open-signup"
                style={{ display: "none" }}
                onClick={() => setOpenModal("signup")}
            />

            {openModal && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
                    onClick={() => { setOpenModal(null); reset(); }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-storm-black border border-fog-grey/40 rounded-2xl p-10 w-[90%] max-w-md shadow-xl scale-100 animate-fadeIn"
                    >
                        <h2 className="text-fog-grey font-skranji-bold text-3xl mb-6 text-center">
                            {openModal === "signin" ? "Sign In" : "Sign Up"}
                        </h2>

                        {errorMessage && (
                            <p className="text-red-400 text-center mb-3">{errorMessage}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-4 px-4 py-3 bg-black/40 border border-fog-grey/40 text-white rounded-lg focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-6 px-4 py-3 bg-black/40 border border-fog-grey/40 text-white rounded-lg focus:outline-none"
                        />

                        <button
                            onClick={openModal === "signin" ? handleSignin : handleSignup}
                            disabled={loading}
                            className="w-full py-3 bg-void-purple hover:bg-arcane-cyan hover:text-void-purple transition-all rounded-lg text-white font-bold"
                        >
                            {loading ? "Loading..." : openModal === "signin" ? "Sign In" : "Sign Up"}
                        </button>

                        <p className="mt-4 text-fog-grey/80 text-center">
                            {openModal === "signin" ? (
                                <>
                                    No account?{" "}
                                    <span
                                        className="text-arcane-cyan cursor-pointer"
                                        onClick={() => { reset(); setOpenModal("signup"); }}
                                    >
                                        Sign Up
                                    </span>
                                </>
                            ) : (
                                <>
                                    Already registered?{" "}
                                    <span
                                        className="text-arcane-cyan cursor-pointer"
                                        onClick={() => { reset(); setOpenModal("signin"); }}
                                    >
                                        Sign In
                                    </span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;
