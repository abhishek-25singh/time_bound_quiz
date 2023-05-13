import useQuestionStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function Success() {
  const {
    trueAnswer,
    falseAnswer,
    resetQuestion,
    setTimeStamp,
    question: allQuestion,
  } = useQuestionStore();
  const navigate = useNavigate();
  const score = (trueAnswer * 100) / 5;
  const indxColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#F59E0B" : "#dc2626";

  useEffect(() => {
    setTimeStamp(0);
  }, []);

  const handleClick = () => {
    resetQuestion();
    navigate("/");
  };

  const [isOpened, setIsOpened] = useState(false);

  const handleShowHide = () => {
    setIsOpened(!isOpened);
  }

  return (
    <AnimateProvider className="flex flex-col space-y-6 md:max-w-xl md:mx-auto bg-neutral-100 p-4 border rounded">
      <h3 className="text-lg text-center font-bold md:text-xl text-violet-700">
        Your Final score is
      </h3>

      <h1
        style={{
          background: indxColor,
        }}
        className={`text-3xl font-bold mx-auto p-3 rounded-full bg-red-500 md:text-4xl text-neutral-100`}
      >
        {score}
      </h1>

      <div className="text-xs md:text-sm text-neutral-600 font-medium flex flex-col space-y-1">
        <p className="flex justify-between">
          Correct Answer <span className="text-green-600">{trueAnswer}</span>
        </p>
        <p className="flex justify-between">
          Wrong Answer <span className="text-red-600">{falseAnswer}</span>
        </p>
        <p className="flex justify-between">
          Answer Submitted{" "}
          <span className="text-purple-600">{trueAnswer + falseAnswer}</span>
        </p>
      </div>

      <button
        onClick={handleClick}
        className="grid place-items-center text-neutral-50 bg-violet-600 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold"
      >
        Back to dashboard
      </button>
      <button
        onClick={handleShowHide}
        className="grid place-items-center text-neutral-50 bg-green-500 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold"
      >
        {isOpened ? 'Hide Answer' : 'Show Answer'}
      </button>

      {isOpened && (
        <div>
          {/* Summary */}
        <h3 className="text-center text-neutral-600 font-semibold md:text-lg py-4">
        Answers
      </h3>
      {allQuestion.map((question, i) => (
        <Question
          key={i}
          singleQuestion={question}
          id={i + 1}
          summary={true}
          trueAnswer={question.correct_answer}
        />
      ))}
        </div>
      )}
      
    </AnimateProvider>
  );
}

export default Success;
