import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 쿠키 포함 요청
        body: JSON.stringify({ user_id, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      // 예: 토큰 저장 등
      localStorage.setItem("token", data.token);

      navigate("/home"); // 🔥 성공 시 이동
    } catch (err) {
      alert("로그인 실패");
    }
  };
  localStorage.setItem("user_id", user_id);


  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        placeholder="아이디"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 w-64"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-64"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        로그인
      </button>
    </div>
  );
}
