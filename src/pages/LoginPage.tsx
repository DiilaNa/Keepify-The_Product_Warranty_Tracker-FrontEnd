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
import { NavBarComponent } from "@/components/custom/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useState, type FormEvent, useEffect } from "react";
import { googleAuthThunk, loginUserThunk } from "@/slices/auth/authThunk";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc"; 

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------- Normal login ----------
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(result)) {
      const user = result.payload;
      toast.success("Login successful!");
      setTimeout(() => {
        navigate(user.roles === "USER" ? "/user" : "/admin");
      }, 200);
    } else {
      toast.error("Login Failed");
    }
  };

  // ---------- Google login ----------
  const handleGoogleRegister = async (credential: string) => {
    const result = await dispatch(googleAuthThunk(credential));

    if (googleAuthThunk.fulfilled.match(result)) {
      toast.success("Logged in with Google");
      navigate("/user");
    } else {
      toast.error("Google login failed");
    }
  };

  // ---------- Initialize Google Sign-In ----------
  useEffect(() => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response: any) => handleGoogleRegister(response.credential),
      });
    }
  }, []);

  // ---------- Trigger Google Sign-In manually ----------
  const handleGoogleClick = () => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          toast.error("Google login cannot be displayed.");
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      <NavBarComponent />
      <div className="flex justify-center items-center flex-1 px-4 py-12">
        <Card
          className={cn(
            "w-full max-w-md bg-[#1f1f2e]/80 backdrop-blur-md border border-[#33334d]/50 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
          )}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#fff] font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-[#ccc] mt-2">
              Sign in to your Keepify account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin}>
              <FieldGroup className="space-y-6">
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
                    autoComplete="username"
                    className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] focus:border-[#6366F1] focus:ring-[#6366F1] transition-all"
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password" className="text-[#ccc]">
                      Password
                    </FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto text-sm text-[#4F46E5] hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="bg-[#2a2a40] border-[#4F46E5] text-[#fff] placeholder:text-[#999] focus:border-[#6366F1] focus:ring-[#6366F1] transition-all"
                  />
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                    )}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                <Field>
                  <Button
                    type="button"
                    onClick={handleGoogleClick}
                    className={cn(
                      "w-full flex items-center justify-center gap-3 bg-[#DB4437] hover:bg-[#c33d30] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                    )}
                  >
                    <FcGoogle className="w-5 h-5" />
                    Sign in with Google
                  </Button>
                </Field>

                <FieldDescription className="text-center text-[#aaa]">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#4F46E5] hover:underline"
                  >
                    Sign up
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
