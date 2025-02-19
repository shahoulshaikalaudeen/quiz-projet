import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await login(data);
    if (response.success) {
      navigate("/");
    } else {
      alert("Échec de la connexion");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center">Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} className="w-full p-2 border rounded" placeholder="Email" />
        <input {...register("password")} type="password" className="w-full p-2 border rounded" placeholder="Mot de passe" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
