import { Link } from "react-router-dom";
import { Card, Button } from "../components/ui";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <div className="flex flex-col items-center space-y-4">
          <h3>Page not Found</h3>
          <h1 className="font-bold text-4xl my-2 text-center">404</h1>
          <Button>
            <Link to="/">Go back to home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default NotFound;
