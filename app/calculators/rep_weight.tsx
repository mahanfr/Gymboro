import { MusclesActivation } from "@/data/DataTypes";
import * as SQLite from "expo-sqlite";

type CalculateRepWeightProps = {
  sets: [{ rep: number; weight: number }];
  workoutId: number;
};

async function injectSQL(command: string) {
  const db = SQLite.useSQLiteContext();
  const wks = await db.getAllAsync(command);
  console.log(wks);
}

async function getWorkoutFromDB(workoutId: number, db: any) {
  const workouts = await db.getAllAsync(`SELECT * FROM workout WHERE id = ${workoutId}`);
  console.log(JSON.parse(workouts[0].muscles_affected_json));
  return workouts;
  return {
    id: 1,
    name: "Barbell Bench Press",
    muscles_affected_json:
      '{"chest": 0.5, "anterior_deltoid": 0.15, "triceps_lateral_head": 0.1, "triceps_long_head": 0.1, "triceps_medial_head": 0.05, "serratus_anterior": 0.1}',
    category: "chest",
    description:
      "Lie on a flat bench with your feet flat on the floor. Grip the barbell slightly wider than shoulder-width apart.",
    name_fa: "پرس سینه با هالتر",
    description_fa:
      "روی یک نیمکت صاف دراز بکشید و پاهایتان را روی زمین قرار دهید. هالتر را کمی پهن‌تر از عرض شانه بگیرید.",
    similar_workouts_json:
      "['Dumbbell Bench Press', 'Incline Barbell Press', 'Decline Barbell Press']",
  };
}
function getRoutineFromDB(id: number) {
  return { id: 1, name: "chesterday" };
}
function getWorkoutRoutineFromDB(id: number) {
  return { id: 1, routine: 1, workout: 1 };
}
function getRoutineTreeFromDB(id: number) {
  const routine = getRoutineFromDB(id);
}

function repWeightMultiplyer(set: { rep: number; weight: number }): number {
  return (set.weight * set.rep * 30) / (set.rep + 30);
}
export function normolizeNumbers0To6(data: {}) {
  const nonZeroValues = Object.values(data).filter((val) => typeof val === "number" && val > 0);
  if (nonZeroValues.length === 0) {
    return Object.fromEntries(Object.keys(data).map((key) => [key, 0]));
  }
  const minVal = Math.min(...(nonZeroValues as number[]));
  const maxVal = Math.max(...(nonZeroValues as number[]));
  if (minVal === maxVal) {
    return Object.fromEntries(Object.entries(data).map(([key, val]) => [key, val === 0 ? 0 : 1]));
  }
  const range = maxVal - minVal;
  const result: Record<string, number> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === 0) {
      result[key] = 0;
    } else {
      const ratio = ((value as number) - minVal) / range;
      // Scale to 0-5 range, then clamp to 0-5 before adding 1
      const category = Math.min(5, Math.floor(ratio * 6)) + 1;
      result[key] = category;
    }
  }
  return result;
}

export async function calculateRepWeight(prop: CalculateRepWeightProps, db: any) {
  const workout = await getWorkoutFromDB(prop.workoutId, db);
  let effectedMuscles = JSON.parse(workout[0].muscles_affected_json);
  let musclesAffected = JSON.parse(workout[0].muscles_affected_json || "{}");
  let newEffectedMuscles = Object.fromEntries(Object.keys(musclesAffected).map((key) => [key, 0]));

  for (const setIndex in prop.sets) {
    const set = prop.sets[setIndex];
    for (const key in effectedMuscles) {
      newEffectedMuscles[key] += repWeightMultiplyer(set) * effectedMuscles[key];
    }
  }
  return newEffectedMuscles;
  // console.log(normolizeNumbers0To6(newEffectedMuscles));
  // console.log(newEffectedMuscles);
  // return new MusclesActivation(normolizeNumbers0To6(newEffectedMuscles));
}

function activatorsAverage(activator: any) {
  const sumMap: Record<string, number> = {};
  const countMap: Record<string, number> = {};

  // Calculate sums and counts for each key
  for (const obj of activator) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sumMap[key] = (sumMap[key] || 0) + obj[key];
        countMap[key] = (countMap[key] || 0) + 1;
      }
    }
  }

  // Calculate averages
  const result: Record<string, number> = {};
  for (const key in sumMap) {
    if (Object.prototype.hasOwnProperty.call(sumMap, key)) {
      result[key] = sumMap[key] / countMap[key];
    }
  }

  return result;
}
export async function calculateByRoutine(id: number, db: any) {
  const workouts =
    await db.getAllAsync(`SELECT w.id FROM workout w JOIN routine_workout rw ON w.id = rw.workout
     WHERE rw.routine = ${id}`);
  let all_activations = [{}];
  for (const w of workouts) {
    //TODO get the rep weight from db
    all_activations.push(
      await calculateRepWeight({ sets: [{ weight: 1, rep: 1 }], workoutId: w.id }, db)
    );
  }

  return activatorsAverage(all_activations);
}
export async function workoutsOfRoutine(id: number, db: any) {
  const workouts =
    await db.getAllAsync(`SELECT w.* FROM workout w JOIN routine_workout rw ON w.id = rw.workout
     WHERE rw.routine = ${id}`);

  return workouts;
}

export function saveRoutineToDB() {
  // save new or edited routine to db
}

export function saveRoutineAsFinished(id: number) {
  //calculateByRoutine(id)
  //Add to gitty chart
  //
}
