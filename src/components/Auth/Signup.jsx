import { useState } from "react";
import authService from "../../appwrite/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Logo } from "../index";
import { userSchema } from "../../data/zodSchema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as registerUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const createAccount = async (data) => {
    setError("");
    setLoading(true);
    try {
      const createdUserData = await authService.createAccount(data);
      if (createdUserData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(registerUser(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center">{error.message}</p>
        )}
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Enter your name"
              type="text"
              {...register("name")}
              error={errors.name?.message}
              autoComplete="name"
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              autoComplete="email"
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
