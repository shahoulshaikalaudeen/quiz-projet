import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/quizzes")
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Erreur chargement des quizzes", error));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Liste des Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border rounded-lg shadow-lg p-4">
            <img
              src={quiz.image || "/default-quiz.jpg"}
              alt={quiz.titre}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{quiz.titre}</h2>
            <p className="text-gray-600">{quiz.description}</p>
            <Link
              to={`/quiz/${quiz._id}`}
              className="mt-2 inline-block text-blue-500"
            >
              Voir le quiz →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
