import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Erreur chargement du quiz", error));
  }, [id]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{quiz.titre}</h1>
      <img
        src={quiz.image || "/default-quiz.jpg"}
        alt={quiz.titre}
        className="w-full h-64 object-cover mt-4 rounded-lg"
      />
      <p className="text-gray-700 mt-2">{quiz.description}</p>

      <h3 className="text-xl font-semibold mt-4">Questions :</h3>
      <ul className="mt-2 space-y-4">
        {quiz.questions.map((q, index) => (
          <li key={index} className="border p-3 rounded-lg shadow-md">
            <p className="font-medium">{q.question}</p>
            <ul className="mt-2">
              {q.options.map((option, i) => (
                <li
                  key={i}
                  className="p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizDetail;
