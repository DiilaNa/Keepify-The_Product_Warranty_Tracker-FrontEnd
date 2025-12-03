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


export default function LoginPage() {
const dispatch = useAppDispatch();
const navigate = useNavigate();
const {loading} = useAppSelector((state) => state.auth);

const [email,setEmail]= useState("");
const[password,setPassword] = useState("");

const handleLogin = async(e: FormEvent) => {
  e.preventDefault();

  const result = await dispatch(
    loginUserThunk({email,password})
  );

  if(loginUserThunk.fulfilled.match(result)){
    navigate("/user")
  }
}

  return (
    <div>
    <NavBarComponent />
      <div className={cn("flex flex-col gap-6 max-w-md mx-auto px-9 mt-28")}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <Button 
                  type="submit"
                  disabled={loading}
                  onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Link to="/user">Test</Link>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link to="/register">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
