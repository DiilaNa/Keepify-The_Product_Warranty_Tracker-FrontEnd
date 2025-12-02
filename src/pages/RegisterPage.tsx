import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../slices/auth/authThunk";
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


export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

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
      <NavBarComponent />
      <div className={cn("flex flex-col gap-8 max-w-md mx-auto px-4 mt-8")}>
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Kasun"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Fernando"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Field>
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
                  <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        placeholder="********"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Processing..." : "Create Account"}
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account ? <Link to="/login">Sign in</Link>
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
