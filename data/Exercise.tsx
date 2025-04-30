export interface ISet {
  rep: number;
  weight: number;
}

export interface IExercise {
  title: string;
  sets?: ISet[];
}

