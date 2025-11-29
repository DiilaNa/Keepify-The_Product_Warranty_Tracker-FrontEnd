import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useNavigate } from "react-router-dom";
import { registerUserThunk } from "../slices/auth/authThunk";

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export default function RegisterPage() {
    const { setTheme } = useTheme()
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

            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

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
