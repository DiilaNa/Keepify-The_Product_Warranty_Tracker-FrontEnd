import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "@/slices/auth/authThunk";
import { NavBarComponent } from "@/components/custom/NavBar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");

    const result = await dispatch(
      registerUserThunk({ firstname, lastname, email, password, role: "USER" })
    );

    if (registerUserThunk.fulfilled.match(result)) {
      toast.success("Registration Successful");
      navigate("/login");
    } else {
      toast.error("Registration failed");
    }
  };
  
  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      <div className="space-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <NavBarComponent />
      <div className="flex justify-center items-center flex-1 px-4 py-8">
        <Card
          className={cn(
            "w-full max-w-md bg-[#1f1f2e]/90 backdrop-blur-md border border-[#33334d]/50 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
          )}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#fff] font-bold tracking-tight">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-[#ccc] mt-1 text-base">
              Enter your details below to register
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-4">
                {/* First & Last Name */}
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="firstname" className="text-[#ccc]">
                      First Name
                    </FieldLabel>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Kasun"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] h-11 rounded-lg focus:border-[#6366F1] focus:ring-[#6366F1] focus:ring-1 transition-all"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastname" className="text-[#ccc]">
                      Last Name
                    </FieldLabel>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Fernando"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] h-11 rounded-lg focus:border-[#6366F1] focus:ring-[#6366F1] focus:ring-1 transition-all"
                    />
                  </Field>
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="text-[#ccc]">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] h-11 rounded-lg focus:border-[#6366F1] focus:ring-[#6366F1] focus:ring-1 transition-all"
                  />
                </Field>

                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-[#ccc]">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] h-11 rounded-lg focus:border-[#6366F1] focus:ring-[#6366F1] focus:ring-1 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#999] hover:text-[#fff]"
                      >
                        {showPassword ? (
                          <IconEyeOff className="h-5 w-5" />
                        ) : (
                          <IconEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="confirm-password"
                      className="text-[#ccc]"
                    >
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="********"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] h-11 rounded-lg focus:border-[#6366F1] focus:ring-[#6366F1] focus:ring-1 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#999] hover:text-[#fff]"
                      >
                        {showConfirmPassword ? (
                          <IconEyeOff className="h-5 w-5" />
                        ) : (
                          <IconEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </Field>
                </Field>
                <FieldDescription className="text-[#888] text-sm">
                  Must be at least 8 characters long.
                </FieldDescription>

                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all hover:scale-105"
                    )}
                  >
                    {loading ? "Processing..." : "Create Account"}
                  </Button>
                </Field>

                {/* Sign in */}
                <FieldDescription className="text-center text-[#aaa] mt-1">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#4F46E5] hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
