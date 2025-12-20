// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { NavBarComponent } from "@/components/custom/NavBar";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "@/hooks/hook";
// import { useState, type FormEvent } from "react";
// import { loginUserThunk } from "@/slices/auth/authThunk";
// import { toast } from "sonner";


// export default function LoginPage() {
// const dispatch = useAppDispatch();
// const navigate = useNavigate();
// const {loading} = useAppSelector((state) => state.auth);

// const [email,setEmail]= useState("");
// const[password,setPassword] = useState("");

// const handleLogin = async(e: FormEvent) => {
//   e.preventDefault();

//   const result = await dispatch(
//     loginUserThunk({email,password})
//   );

//   if (loginUserThunk.fulfilled.match(result)) {
//     const user = result.payload
  
//     if(user.roles === "USER"){
//       toast.success("Login success!");
//       setTimeout(() => {
//         navigate("/user");
//       }, 200); 
//     }else{
//       toast.success("Login success as an admin!!");
//       setTimeout(() => {
//         navigate("/admin");
//       }, 200); 
//     }
    
//   } else if (loginUserThunk.rejected.match(result)) {
//     toast.error("Login  Failed");
//   }
// }

//   return (
//     <div>
//       <NavBarComponent />
//       <div className={cn("flex flex-col gap-6 max-w-md mx-auto px-9 mt-28")}>
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle>Login to your account</CardTitle>
//             <CardDescription>
//               Enter your email below to login to your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6">
//             <form onSubmit={handleLogin}>
//               <FieldGroup>
//                 <Field>
//                   <FieldLabel htmlFor="email">Email</FieldLabel>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="m@example.com"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     autoComplete="username"
//                   />
//                 </Field>
//                 <Field>
//                   <div className="flex items-center">
//                     <FieldLabel htmlFor="password">Password</FieldLabel>
//                     <a
//                       href="#"
//                       className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                     >
//                       Forgot your password?
//                     </a>
//                   </div>
//                   <Input
//                     id="password"
//                     type="password"
//                     required
//                     placeholder="*****"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                   />
//                 </Field>
//                 <Field>
//                   <Button type="submit" disabled={loading}>
//                     {loading ? "Logging in..." : "Login"}
//                   </Button>
//                   <FieldDescription className="text-center">
//                     Don&apos;t have an account?{" "}
//                     <Link to="/register">Sign up</Link>
//                   </FieldDescription>
//                 </Field>
//               </FieldGroup>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

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
import { useState, type FormEvent } from "react";
import { loginUserThunk } from "@/slices/auth/authThunk";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(result)) {
      const user = result.payload;
      toast.success("Login successful!");
      setTimeout(() => {
        navigate(user.roles === "USER" ? "/user" : "/admin");
      }, 200);
    } else if (loginUserThunk.rejected.match(result)) {
      toast.error("Login Failed");
    }
  };

  // ---------- Google Login Handler ----------
  const handleGoogleLogin = async () => {
    try {
      // Open Google OAuth popup (example using Google Identity Services)
      // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${window.location.origin}/google-callback&response_type=token&scope=email profile`;

      // window.location.href = googleAuthUrl; // redirect to Google login
      toast.info(
        "hi"
      )
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
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
                {/* Email */}
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

                {/* Password */}
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

                {/* Login Button */}
                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold  rounded-lg transition-colors shadow-md hover:shadow-lg"
                    )}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                {/* Google Login Button */}
                <Field>
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className={cn(
                      "w-full flex items-center justify-center gap-1 bg-[#fff] hover:bg-[#f0f0f0] text-[#000] font-semibold  rounded-lg transition-colors shadow-md hover:shadow-lg"
                    )}
                  >
                    <FcGoogle size={24} /> Continue with Google
                  </Button>
                </Field>

                {/* Sign up */}
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




