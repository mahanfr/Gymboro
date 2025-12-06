export class MusclesActivation {
  chest = 0;

  shin = 0;
  tibialis_anterior = 0;
  extensor_digitorum_longus = 0;

  traps = 0;
  upper_trapezius = 0;
  middle_trapezius = 0;
  lower_trapezius = 0;

  biceps = 0;
  biceps_short_head = 0;
  biceps_long_head = 0;
  brachialis = 0;

  triceps = 0;
  triceps_lateral_head = 0;
  triceps_long_head = 0;
  triceps_medial_head = 0;

  forearms = 0;
  brachioradialis = 0;
  wrist_extensors = 0;
  wrist_flexors = 0;

  abs = 0;
  obliques = 0;

  adductors = 0;

  abductors = 0;

  quadriceps = 0;
  vastus_lateralis = 0;
  vastus_intermedius = 0;
  vastus_medialis = 0;

  calves = 0;

  shoulders = 0;
  anterior_deltoid = 0;
  lateral_deltoid = 0;
  posterior_deltoid = 0;

  upper_back = 0;
  serratus_anterior = 0;
  teres = 0;
  infraspinatus = 0;

  lats = 0;

  glutes = 0;

  hamstrings = 0;
  biceps_femoris = 0;
  semitendinosus = 0;

  constructor(init?: Partial<MusclesActivation>) {
    Object.assign(this, init);
  }

  public getColor(activation_value: number): string {
    return getColors(activation_value);
  }
}
export function getColors(activation_value: number): string {
  switch (activation_value) {
    case 0:
      return "#d6d6d6";
    case 1:
      return "#ffb3c9";
    case 2:
      return "#e0708e";
    case 3:
      return "#c13d5f";
    case 4:
      return "#b3193d";
    case 5:
      return "#730b29";
    case 6:
      return "#40061a";
    default:
      return "#d6d6d6";
  }
}
export const categories = {
  abs: require("../assets/images/muscle_groups/core.png"),
  back: require("../assets/images/muscle_groups/back.png"),
  biceps: require("../assets/images/muscle_groups/biceps.png"),
  calves: require("../assets/images/muscle_groups/biceps.png"),
  cardio: require("../assets/images/muscle_groups/cardio.png"),
  chest: require("../assets/images/muscle_groups/chest.png"),
  forearms: require("../assets/images/muscle_groups/biceps.png"),
  front_deltoid: require("../assets/images/muscle_groups/biceps.png"),
  glutes: require("../assets/images/muscle_groups/biceps.png"),
  hamstrings: require("../assets/images/muscle_groups/biceps.png"),
  hips: require("../assets/images/muscle_groups/biceps.png"),
  latissimus_dorsi: require("../assets/images/muscle_groups/biceps.png"),
  neck: require("../assets/images/muscle_groups/biceps.png"),
  obliques: require("../assets/images/muscle_groups/biceps.png"),
  quadriceps: require("../assets/images/muscle_groups/biceps.png"),
  rear_deltoid: require("../assets/images/muscle_groups/biceps.png"),
  shoulders: require("../assets/images/muscle_groups/shoulders.png"),
  side_deltoid: require("../assets/images/muscle_groups/biceps.png"),
  spine: require("../assets/images/muscle_groups/biceps.png"),
  thighs: require("../assets/images/muscle_groups/biceps.png"),
  traps: require("../assets/images/muscle_groups/biceps.png"),
  triceps: require("../assets/images/muscle_groups/triceps.png"),
  upper_arms: require("../assets/images/muscle_groups/biceps.png"),
  waist: require("../assets/images/muscle_groups/biceps.png"),
  weightlifting: require("../assets/images/muscle_groups/biceps.png"),
  wrist: require("../assets/images/muscle_groups/biceps.png"),
  yoga: require("../assets/images/muscle_groups/biceps.png"),
  // full_body: require("../assets/images/muscle_groups/full_body.png"),
  // legs: require("../assets/images/muscle_groups/legs.png"),
  rest: require("../assets/images/muscle_groups/rest.png"),
};
export type Category =
  | "abs"
  | "back"
  | "biceps"
  | "calves"
  | "cardio"
  | "chest"
  | "forearms"
  | "front_deltoid"
  | "glutes"
  | "hamstrings"
  | "hips"
  | "latissimus_dorsi"
  | "neck"
  | "obliques"
  | "quadriceps"
  | "rear_deltoid"
  | "shoulders"
  | "side_deltoid"
  | "spine"
  | "thighs"
  | "traps"
  | "triceps"
  | "upper_arms"
  | "waist"
  | "weightlifting"
  | "wrist"
  | "yoga"
  | "rest";

export type TimeFrame = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
