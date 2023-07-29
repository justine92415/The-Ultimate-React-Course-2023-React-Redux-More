import Options from '../components/Options';
import { Action, Dispatch, IQuestion } from '../type/type';

function Question({
  questions,
  dispatch,
  answer,
}: {
  questions: IQuestion;
  dispatch: Dispatch;
  answer: number;
}) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer}></Options>
    </div>
  );
}

export default Question;
