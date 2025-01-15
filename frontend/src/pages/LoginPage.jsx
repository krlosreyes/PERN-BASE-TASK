import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const { signIn, errors } = useAuth();
  const Navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signIn(data);

    if (user) {
      Navigate("/profile");
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <h3 className="text-4xl font-bold my-2 text-center font-serif">
          Sign In
        </h3>
        <div className="h-4"></div>
        <form onSubmit={onSubmit}>
          <Label>Please complete all fields</Label>
          {errors && errors.length > 0 && (
            <p className="bg-red-500 text-white p-2 text-center my-4">
              {errors.map((error, index) => (
                <span key={index}>{error.message}</span>
              ))}
            </p>
          )}
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {formErrors.email && (
            <p className="text-red-500">Email is required</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {formErrors.password && (
            <p className="text-red-500">password is required</p>
          )}
          <Button>Sign in</Button>
          <div className="flex justify-between my-4">
            <p className="font-serif">Dont have an account? </p>
            <p>
              <Link
                to="/register"
                className="font-bold font-serif text-green-700"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
