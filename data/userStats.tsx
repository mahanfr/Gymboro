/**
 *
 * @summary it's only temprory and with be changed
 */

import { MusclesActivation, categories } from "../data/DataTypes";
const userStats = () => {
  return {
    gittyChart: {
      2025: [0, 2, 3, 5, 6, 10, 20, 50, 12, 22],
      2024: [0, 2, 11, 12, 15, 43, 46, 55, 56, 79],
    },
    hexygon: {
      _1day: [0, 10, 0, 5, 0, 2],
      _1week: [0, 2, 2, 0, 6, 0],
      _1month: [0, 1, 2, 0, 0, 0],
      _3months: [0, 6, 2, 8, 5, 1],
      _1year: [0, 3, 0, 4, 1, 0],
      all: [8, 5, 8, 4, 5, 7],
    },
    muscleGroup: {
      _1day: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 0,
        extensor_digitorum_longus: 0,

        traps: 0,
        upper_trapezius: 0,
        middle_trapezius: 0,
        lower_trapezius: 0,

        biceps: 0,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 0,
        wrist_extensors: 0,
        wrist_flexors: 0,

        abs: 0,
        obliques: 4,

        adductors: 3,

        abductors: 0,

        quadriceps: 0,
        vastus_lateralis: 0,
        vastus_intermedius: 0,
        vastus_medialis: 0,

        calves: 3,

        shoulders: 3,
        anterior_deltoid: 3,
        lateral_deltoid: 3,
        posterior_deltoid: 3,

        upper_back: 3,
        serratus_anterior: 3,
        teres: 3,
        infraspinatus: 3,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
      _1week: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 0,
        extensor_digitorum_longus: 0,

        traps: 0,
        upper_trapezius: 0,
        middle_trapezius: 0,
        lower_trapezius: 0,

        biceps: 0,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 0,
        wrist_extensors: 0,
        wrist_flexors: 0,

        abs: 0,
        obliques: 4,

        adductors: 3,

        abductors: 0,

        quadriceps: 0,
        vastus_lateralis: 0,
        vastus_intermedius: 0,
        vastus_medialis: 0,

        calves: 0,

        shoulders: 0,
        anterior_deltoid: 0,
        lateral_deltoid: 0,
        posterior_deltoid: 0,

        upper_back: 0,
        serratus_anterior: 0,
        teres: 0,
        infraspinatus: 0,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
      _1month: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 4,
        extensor_digitorum_longus: 4,

        traps: 4,
        upper_trapezius: 4,
        middle_trapezius: 4,
        lower_trapezius: 4,

        biceps: 4,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 0,
        wrist_extensors: 0,
        wrist_flexors: 0,

        abs: 0,
        obliques: 4,

        adductors: 3,

        abductors: 0,

        quadriceps: 0,
        vastus_lateralis: 0,
        vastus_intermedius: 0,
        vastus_medialis: 0,

        calves: 0,

        shoulders: 0,
        anterior_deltoid: 0,
        lateral_deltoid: 0,
        posterior_deltoid: 0,

        upper_back: 0,
        serratus_anterior: 0,
        teres: 0,
        infraspinatus: 0,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
      _3months: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 0,
        extensor_digitorum_longus: 0,

        traps: 0,
        upper_trapezius: 0,
        middle_trapezius: 0,
        lower_trapezius: 0,

        biceps: 0,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 0,
        wrist_extensors: 0,
        wrist_flexors: 0,

        abs: 0,
        obliques: 4,

        adductors: 3,

        abductors: 0,

        quadriceps: 0,
        vastus_lateralis: 0,
        vastus_intermedius: 0,
        vastus_medialis: 0,

        calves: 0,

        shoulders: 0,
        anterior_deltoid: 0,
        lateral_deltoid: 0,
        posterior_deltoid: 0,

        upper_back: 0,
        serratus_anterior: 0,
        teres: 0,
        infraspinatus: 0,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
      _1year: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 0,
        extensor_digitorum_longus: 0,

        traps: 0,
        upper_trapezius: 0,
        middle_trapezius: 0,
        lower_trapezius: 0,

        biceps: 0,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 0,
        wrist_extensors: 0,
        wrist_flexors: 0,

        abs: 0,
        obliques: 4,

        adductors: 3,

        abductors: 0,

        quadriceps: 0,
        vastus_lateralis: 0,
        vastus_intermedius: 0,
        vastus_medialis: 0,

        calves: 0,

        shoulders: 0,
        anterior_deltoid: 0,
        lateral_deltoid: 0,
        posterior_deltoid: 0,

        upper_back: 0,
        serratus_anterior: 0,
        teres: 0,
        infraspinatus: 0,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
      all: new MusclesActivation({
        chest: 3,

        shin: 0,
        tibialis_anterior: 0,
        extensor_digitorum_longus: 0,

        traps: 0,
        upper_trapezius: 0,
        middle_trapezius: 0,
        lower_trapezius: 0,

        biceps: 0,
        biceps_short_head: 0,
        biceps_long_head: 0,
        brachialis: 0,

        triceps: 0,
        triceps_lateral_head: 0,
        triceps_long_head: 0,
        triceps_medial_head: 0,

        forearms: 0,
        brachioradialis: 5,
        wrist_extensors: 5,
        wrist_flexors: 5,

        abs: 5,
        obliques: 4,

        adductors: 3,

        abductors: 5,

        quadriceps: 5,
        vastus_lateralis: 5,
        vastus_intermedius: 5,
        vastus_medialis: 5,

        calves: 0,

        shoulders: 0,
        anterior_deltoid: 0,
        lateral_deltoid: 0,
        posterior_deltoid: 0,

        upper_back: 0,
        serratus_anterior: 0,
        teres: 0,
        infraspinatus: 0,

        lats: 0,

        glutes: 3,

        hamstrings: 0,
        biceps_femoris: 0,
        semitendinosus: 0,
      }),
    },
    workoutRoutine: {
      day1: {
        title: "rest day",
        isRestday: true,
        involvedMuscleGroups: [categories.rest], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: [],
      },
      day2: {
        title: "Chesterday",
        isRestday: false,
        involvedMuscleGroups: [categories.chest], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: ["incline_benchpress", "benchpress", "fly"],
      },
      day3: {
        title: "legday",
        isRestday: false,
        involvedMuscleGroups: [categories.legs], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: ["leg_extention", "leg_press", "squat"],
      },
      day4: {
        title: "rest day",
        isRestday: true,
        involvedMuscleGroups: [categories.rest], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: [],
      },
      day5: {
        title: "bicep & core",
        isRestday: false,
        involvedMuscleGroups: [categories.biceps, categories.core], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: ["preacher", "jeffy", "situps"],
      },
      day6: {
        title: "Back",
        isRestday: false,
        involvedMuscleGroups: [categories.back], // show primary involved muslce groups
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: ["t_bar", "row"],
      },
      day7: {
        title: "rest day",
        isRestday: true,
        involvedMuscleGroups: [categories.rest], //
        involvedMuscles: new MusclesActivation(), //should be calculated on edit
        involvedMoves: [],
      },
    },
    exerciseHistory: {
      /**
       * we have 4 different types of excercises
       * a. reps x weight
       * b. duration x speed
       * c. reps only
       * d. duration only
       */
      benchPress: [
        {
          date: "10.10.24",
          sets: [
            { reps: 10, weight: 20 },
            { reps: 10, weight: 30 },
          ],
        },
      ],
      jog: [
        {
          date: "10.10.24",
          sets: [
            { duration: 20, speed: 15 },
            { duration: 20, speed: 15 },
          ],
        },
      ],
      kick: [
        {
          date: "10.10.24",
          sets: [{ reps: 20 }, { reps: 20 }],
        },
      ],
      plank: [
        {
          date: "10.10.24",
          sets: [{ duration: 20 }],
        },
      ],
    },
  };
};

export default userStats;
