import { useAuth } from "../context/AuthProvider";

function ProfilePage() {
  const { user } = useAuth();
  if (!user) {
    return <h1>Loading User...</h1>; // Manejo de usuario no cargado.
  }
  return (
    <div>
      <h1>Usuario: {JSON.stringify(user.name)}</h1>
      <h1>Email: {JSON.stringify(user.email)}</h1>
      <h1>Creado el: {JSON.stringify(user.created_at)}</h1>
    </div>
  );
}

export default ProfilePage;
