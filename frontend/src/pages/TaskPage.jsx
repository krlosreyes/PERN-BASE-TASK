import { useEffect, useState } from "react";
import { getAllTaskRequest } from "../api/task.api";
import { Card, Label } from "../components/ui";

function TaskPage() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    getAllTaskRequest().then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="bg-gradient-to-b from-gray-800 to-gray-900 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
        >
          {/* Contenedor del título */}
          <div className="mb-4 -mt-2 border-b border-gray-700 pb-2">
            <Label className="text-green-400 text-xl font-bold font-serif">
              {task.title}
            </Label>
          </div>

          {/* Contenedor de la descripción */}
          <div className="mt-4">
            <p className="text-white text-sm overflow-hidden whitespace-normal break-words max-h-40">
              {task.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default TaskPage;
