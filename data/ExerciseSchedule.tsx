import { IExercise } from "./Exercise";

export interface IExerciseSchedule {
    days: IExerciseScheduleDay[]
}

export enum DayOfWeek {
  saturday,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
}

export interface IExerciseScheduleDay {
  day: DayOfWeek,
  /// eg: push, pull, leg-day
  title: string,
  exercises: IExercise[],
  skipped: boolean,
  forgotToTrack: boolean,
  minetsSpent?: number,
  totalWeightMoved?: number,
  estematedCaloriesBurnt?: number,
}
