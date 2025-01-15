import axios from "../api/axios";

export const createTaskRequest = (task) => axios.post("/tasks", task);

export const getAllTaskRequest = () => axios.get("/tasks");
