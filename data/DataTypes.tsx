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
    switch (activation_value) {
      case 0:
        return "#696969";
      case 1:
        return "#ff91ab";
      case 2:
        return "#ef6c6e";
      case 3:
        return "#ff2357";
      case 4:
        return "#80122c";
      case 5:
        return "#400916";
      case 6:
        return "#f00916";
      default:
        return "#bebebe";
    }
  }
}
export const categories = {
  shoulders: require("../assets/images/muscle_groups/shoulders.png"),
  chest: require("../assets/images/muscle_groups/chest.png"),
  back: require("../assets/images/muscle_groups/back.png"),
  full_body: require("../assets/images/muscle_groups/full_body.png"),
  biceps: require("../assets/images/muscle_groups/biceps.png"),
  triceps: require("../assets/images/muscle_groups/triceps.png"),
  legs: require("../assets/images/muscle_groups/legs.png"),
  core: require("../assets/images/muscle_groups/core.png"),
  cardio: require("../assets/images/muscle_groups/cardio.png"),
  rest: require("../assets/images/muscle_groups/rest.png"),
};
