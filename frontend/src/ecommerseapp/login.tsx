import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../api";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [message, setMessage]=useState("")
  const navigate = useNavigate();
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e: any) => {
  e.preventDefault();

    setApiError("");

    if (!validate()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        user_email: email,
        user_password: password
      }, {
        withCredentials:true
      });

      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);

      console.log("Login success", res.data);
      setMessage(res.data.message)
      navigate("/heropage")

    } catch (err: any) {
      const message = err.response?.data?.message;
      setApiError(message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
    <div className="h-screen flex justify-center items-center bg-gray-100">
      
      <div className="w-96 bg-white rounded-lg shadow p-6">
        
        <div className="flex flex-col items-center">
          <img src="login.png" alt="" width={120} />
          <h1 className="text-2xl mt-3">USER LOGIN</h1>
        </div>

        <div className="mt-6 flex flex-col gap-5">

          <div className="flex flex-col">
            <div className="flex items-center gap-3 border p-2 rounded">
              <img src="email.png" alt="" width={20} />
              <input type="email" value={email} autoComplete="email" onChange={(e) => { setEmail(e.target.value); setApiError("");}}
                placeholder="Type your Email..." className="outline-none w-full" />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 border p-2 rounded">
              <img src="password.png" alt="" width={20} />
              <input type="password" value={password} autoComplete="password" onChange={(e) => { setPassword(e.target.value); setApiError(""); }}
                placeholder="Type your password..." className="outline-none w-full" />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

        </div>
        {message && (<p className="text-center m-2 text-green-700">{message}</p>)}

        {apiError && ( <p className="text-red-500 text-sm mt-3 text-center">{apiError}</p> )}

        <button type="submit" className="mt-6 w-full bg-blue-500 text-white p-2 rounded" > Login </button>

      </div>
    </div>
    </form>
  );
}



