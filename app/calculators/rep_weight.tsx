import { MusclesActivation } from "@/data/DataTypes";

type CalculateRepWeightProps = {
  sets: [{ rep: number; weight: number }];
  workoutId: number;
};

function getWorkoutMusclesFromDB(workoutId: number): {
  id: number;
  name: string;
  muscles_affected_json: string;
  category: string;
  description: string;
  name_fa: string;
  description_fa: string;
  similar_workouts_json: string;
} {
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
  // return [
  //   {
  //     date: "10.10.24",
  //     sets: [
  //       { reps: 11, weight: 11 },
  //       { reps: 12, weight: 12 },
  //     ],
  //   },
  //   {
  //     date: "11.10.24",
  //     sets: [
  //       { reps: 21, weight: 21 },
  //       { reps: 22, weight: 22 },
  //     ],
  //   },
  //   {
  //     date: "12.10.24",
  //     sets: [
  //       { reps: 31, weight: 31 },
  //       { reps: 32, weight: 32 },
  //       { reps: 33, weight: 3 },
  //     ],
  //   },
  // ];
}
function repWeightMultiplyer(set: { rep: number; weight: number }): number {
  return (set.weight * set.rep * 30) / (set.rep + 30);
}
function normolizeNumbers0To7(data: {}) {
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
export function CalculateRepWeight(prop: CalculateRepWeightProps): MusclesActivation {
  const workout = getWorkoutMusclesFromDB(prop.workoutId);
  let effectedMuscles = JSON.parse(workout.muscles_affected_json);
  let newEffectedMuscles = Object.fromEntries(
    //remove all small defualts just so that if rep or weight is 0 so is the activation
    Object.keys(JSON.parse(workout.muscles_affected_json)).map((key) => [key, 0])
  );

  for (const setIndex in prop.sets) {
    const set = prop.sets[setIndex];
    for (const key in effectedMuscles) {
      newEffectedMuscles[key] += repWeightMultiplyer(set) * effectedMuscles[key];
    }
  }
  console.log(newEffectedMuscles);
  console.log(normolizeNumbers0To7(newEffectedMuscles));
  return new MusclesActivation(normolizeNumbers0To7(newEffectedMuscles));
}
//TODO do this CalculateRepWeight but for routine
