import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await registerUser(data);
    if (response.userId) {
      alert("Inscription réussie !");
      navigate("/login");
    } else {
      alert(response.error || "Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("username", { required: "Nom requis" })} className="w-full p-2 border rounded" placeholder="Nom d'utilisateur" />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <input {...register("email", { required: "Email requis" })} className="w-full p-2 border rounded" placeholder="Email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input {...register("password", { required: "Mot de passe requis" })} type="password" className="w-full p-2 border rounded" placeholder="Mot de passe" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm;
