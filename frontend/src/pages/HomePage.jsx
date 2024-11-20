import { useAuth } from "../context/AuthProvider";

function HomePage() {
  const data = useAuth();
  console.log(data);
  return (
    <div>
      <h3 className="text-3xl font-bold text-green-600">Home Page</h3>
    </div>
  );
}

export default HomePage;
