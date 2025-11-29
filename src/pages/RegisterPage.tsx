import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useNavigate } from "react-router-dom";
import { registerUserThunk } from "../slices/auth/authThunk";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirm) return alert("Passwords do not match");

    const result = await dispatch(
      registerUserThunk({ firstname, lastname, email, password, role: "USER" })
    );

    if (registerUserThunk.fulfilled.match(result)) {
      alert("Registration successful");
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First name" />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm" />

      <button disabled={loading} onClick={handleSubmit}>
        {loading ? "Processing..." : "Register"}
      </button>
    </div>
  );
}
