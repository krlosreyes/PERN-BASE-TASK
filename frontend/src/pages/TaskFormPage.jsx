import { Input, Button, Card, Label, Textarea } from "../components/ui";
import { useForm } from "react-hook-form";
import { createTaskRequest } from "../api/task.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const navigate = useNavigate();
  const [postError, setPostError] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createTaskRequest(data);
      console.log(res.data);

      if (res) {
        navigate("/task");
      }
    } catch (error) {
      if (error.response) {
        setPostError([error.response.data.message]);
      }
    }
  });
  return (
    <div className="h-[calc(80vh-100px)] flex justify-center items-center">
      <Card>
        {
          postError.map((error, i) => (
            <p className="bg-red-500 text-white p-1 text-center my-4" key = {i}>
              { error }
            </p>
          ))
        }
        <h3 className="text-4xl font-bold my-2 text-center font-serif">
          Create Task
        </h3>
        <Label>Please complete all fields</Label>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Title"
            autoFocus
            {...register("title", {
              required: true,
            })}
          />
          {formErrors.title && (
            <p className="bg-red-500 text-white p-1 text-center my-4">
              Title is required
            </p>
          )}
          
          <Textarea
            placeholder="Description"
            rows={3}
            {...register("description")}
          ></Textarea>
          <Button>Create</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
