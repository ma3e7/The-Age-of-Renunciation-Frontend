import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/users";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("access");
            if (!token) {
                setError("User not logged in");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API}/me/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch user data");

                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex-center h-screen text-white text-xl font-bold">
            Loading user data...
        </div>
    );
    if (error) return (
        <div className="flex-center h-screen text-red-500 text-xl font-bold">
            {error}
        </div>
    );

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-linear-to-br from-storm-black via-black to-[#111] 
                        border border-fog-grey/50 rounded-3xl shadow-2xl text-white 
                        flex flex-col items-center gap-6 animate-fadeIn">
            <h2 className="text-3xl font-skranji-bold text-arcane-cyan mb-4">
                User Profile
            </h2>

            <div className="w-full flex flex-col gap-4">
                <div className="profile-item px-5 py-3 bg-void-purple/10 border border-arcane-cyan/30 rounded-xl hover:bg-void-purple/20 transition-all">
                    <span className="font-bold text-arcane-cyan">Username:</span> {user.name}
                </div>
                <div className="profile-item px-5 py-3 bg-void-purple/10 border border-arcane-cyan/30 rounded-xl hover:bg-void-purple/20 transition-all">
                    <span className="font-bold text-arcane-cyan">Hours Played:</span> {user.hours_played}
                </div>
                <div className="profile-item px-5 py-3 bg-void-purple/10 border border-arcane-cyan/30 rounded-xl hover:bg-void-purple/20 transition-all">
                    <span className="font-bold text-arcane-cyan">Achievements:</span> {user.achievements || "None"}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
