export type Status = 'loading' | 'error' | 'ready' | 'active' | 'finished';
export type Action =
  | 'dataReceived'
  | 'dataFailed'
  | 'start'
  | 'newAnswer'
  | 'nextQuestion'
  | 'finish'
  | 'restart'
  | 'tick';

export type Dispatch = React.Dispatch<{
  type: Action;
  payload?: any;
}>;

export interface IState {
  questions: IQuestion[];
  status: Status;
  index: number;
  answer: null;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
}

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
