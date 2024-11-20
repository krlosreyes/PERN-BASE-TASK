import { Input, Button, Card, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const { signUp, errors } = useAuth();
  const Navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user  = await signUp(data);
    if (user) {
      // Solo navegamos si el registro fue exitoso
      Navigate("/profile");
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-4xl my-2 text-center font-bold font-serif">
          Register
        </h3>
        <div className="h-4"></div>
        <Label>Please complete all fields</Label>
        {errors && errors.length > 0 && (
            <p className="bg-red-500 text-white p-2 text-center my-4">
              {errors.map((error, index) => (
                <span key={index}>{error.message}</span>
              ))}
            </p>
          )}
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Enter your fullname"
            {...register("name", { required: true })}
          />
          {formErrors.name && <p className="text-red-500">Name is required</p>}
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {formErrors.email && <p className="text-red-500">Email is required</p>}
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {formErrors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <Button>Register</Button>
          <div className="flex justify-between my-4">
            <p className="font-serif">Do you have an account? </p>
            <p>
              <Link to="/login" className="font-bold font-serif text-green-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
