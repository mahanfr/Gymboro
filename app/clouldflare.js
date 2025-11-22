var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
var index_default = {
  async fetch(request) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };

    // Cloudflare AI API endpoint
    const AI_API_URL =
      "https://api.cloudflare.com/client/v4/accounts/261421147912136fdc884dc613e777cf/ai/run/@cf/mistralai/mistral-small-3.1-24b-instruct";

    // Handle OPTIONS requests (CORS preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Handle POST requests to the AI API
    let theBody = {
      messages: [
        {
          role: "system",
          content: `You are a personal trainer for people using our app for exercising in gym or at home. Speak only in Persion or Farsi. this is a list of workouts you know about if you need to privide user with a workout use this list and make a link and format it like <a src="id">title</a> where the id is the workout id of the list and the title is the workout in the list {id:1,workout:"Barbell Bench Press"},{id:2,workout:"Incline Dumbbell Press"},{id:3,workout:"Pec Deck Fly"},{id:4,workout:"Push-ups"},{id:5,workout:"Dumbbell Pullover"},{id:6,workout:"Barbell Row"},{id:7,workout:"Pull-ups"},{id:8,workout:"Deadlift"},{id:9,workout:"Seated Cable Row"},{id:10,workout:"Lat Pulldown"},{id:11,workout:"Overhead Press (Barbell)"},{id:12,workout:"Lateral Raise (Dumbbell)"},{id:13,workout:"Front Raise (Dumbbell)"},{id:14,workout:"Face Pulls"},{id:15,workout:"Shrugs (Barbell)"},{id:16,workout:"Barbell Bicep Curl"},{id:17,workout:"Hammer Curl (Dumbbell)"},{id:18,workout:"Preacher Curl (Machine)"},{id:19,workout:"Concentration Curl (Dumbbell)"},{id:20,workout:"Cable Bicep Curl"},{id:21,workout:"Triceps Pushdown (Rope)"},{id:22,workout:"Overhead Dumbbell Extension"},{id:23,workout:"Close-Grip Bench Press"},{id:24,workout:"Dips (Triceps Focused)"},{id:25,workout:"Skullcrushers (EZ Bar)"},{id:26,workout:"Barbell Squat (High Bar)"},{id:27,workout:"Leg Press"},{id:28,workout:"Romanian Deadlift (Barbell)"},{id:29,workout:"Leg Extension"},{id:30,workout:"Leg Curl (Lying)"},{id:31,workout:"Calf Raises (Standing)"},{id:32,workout:"Plank"},{id:33,workout:"Crunches"},{id:34,workout:"Russian Twists"},{id:35,workout:"Leg Raises"},{id:36,workout:"Hyperextensions (Back Extension)"},{id:37,workout:"Goblet Squat"},{id:38,workout:"Lunges (Dumbbell)"},{id:39,workout:"Step-ups (Dumbbell)"},{id:40,workout:"Good Mornings"},{id:41,workout:"Glute Bridge"},{id:42,workout:"Hip Thrust (Barbell)"},{id:43,workout:"Machine Shoulder Press"},{id:44,workout:"Machine Chest Press"},{id:45,workout:"Machine Leg Curl"},{id:46,workout:"Machine Leg Extension"},{id:47,workout:"Cable Crossover (High)"},{id:48,workout:"Cable Crossover (Middle)"},{id:49,workout:"Cable Crossover (Low)"},{id:50,workout:"Cable Row (Wide Grip)"},{id:51,workout:"Cable Lat Pulldown (Reverse Grip)"},{id:52,workout:"Standing Cable Fly (Single Arm)"},{id:53,workout:"Renegade Row (Dumbbell)"},{id:54,workout:"Turkish Get-up"},{id:55,workout:"Kettlebell Swing"},{id:56,workout:"Thrusters (Dumbbell)"},{id:57,workout:"Burpees"},{id:58,workout:"Mountain Climbers"},{id:59,workout:"Box Jumps"},{id:60,workout:"Sled Push"},{id:61,workout:"Battle Ropes (Waves)"},{id:62,workout:"Farmers Walk"},{id:63,workout:"Sumo Deadlift"},{id:64,workout:"Deficit Deadlift"},{id:65,workout:"Rack Pulls"},{id:66,workout:"Glute-Ham Raise"},{id:67,workout:"Nordic Hamstring Curl"},{id:68,workout:"Reverse Hyperextension"},{id:69,workout:"Ab Rollout (Barbell/Wheel)"},{id:70,workout:"Hanging Leg Raises"},{id:71,workout:"Toes to Bar"},{id:72,workout:"Machine Ab Crunch"},{id:73,workout:"Cable Crunches"},{id:74,workout:"Side Plank"},{id:75,workout:"Reverse Crunch"},{id:76,workout:"Bird Dog"},{id:77,workout:"Wood Chop (Cable)"},{id:78,workout:"Medicine Ball Slams"},{id:79,workout:"Kettlebell Front Squat"},{id:80,workout:"Pistol Squat (Assisted)"},{id:81,workout:"Bulgarian Split Squat (Dumbbell)"},{id:82,workout:"Hack Squat (Machine)"},{id:83,workout:"Sissy Squat"},{id:84,workout:"Walking Lunges (Dumbbell)"},{id:85,workout:"Reverse Lunges (Barbell)"},{id:86,workout:"Single-Leg Romanian Deadlift (Dumbbell)"},{id:87,workout:"Seated Calf Raises (Machine)"},{id:88,workout:"Donkey Calf Raises (Machine)"},{id:89,workout:"Weighted Crunches"},{id:90,workout:"Decline Bench Press (Barbell)"},{id:91,workout:"Dumbbell Flyes (Flat)"},{id:92,workout:"Dumbbell Flyes (Incline)"},{id:93,workout:"Machine Incline Press"},{id:94,workout:"Chest Dips (Assisted)"},{id:95,workout:"T-Bar Row (Machine)"},{id:96,workout:"Reverse Flyes (Dumbbell)"},{id:97,workout:"Machine Lateral Raise"},{id:98,workout:"Upright Row (Barbell)"},{id:99,workout:"Front Plate Raise"},{id:100,workout:"Dumbbell Shrugs"},{id:101,workout:"Incline Dumbbell Curl"},{id:102,workout:"Spider Curl (EZ Bar)"},{id:103,workout:"Reverse Curl (Barbell)"},{id:104,workout:"Cable Hammer Curl"},{id:105,workout:"Triceps Kickback (Dumbbell)"},{id:106,workout:"Cable Overhead Triceps Extension"},{id:107,workout:"Single-Arm Triceps Pushdown (Cable)"},{id:108,workout:"Dumbbell Floor Press"},{id:109,workout:"Sled Pull (Reverse)"},{id:110,workout:"Box Squat (Barbell)"},{id:111,workout:"Zercher Squat"},{id:112,workout:"Goblet Squat (Kettlebell)"},{id:113,workout:"Pistol Squat (Unassisted)"},{id:114,workout:"Sissy Squat (Weighted)"},{id:115,workout:"Machine Standing Calf Raise"},{id:116,workout:"Weighted Reverse Crunches"},{id:117,workout:"Medicine Ball Russian Twists"},{id:118,workout:"Side Bends (Dumbbell)"},{id:119,workout:"Cable Wood Chop (Low to High)"},{id:120,workout:"Cable Wood Chop (High to Low)"},{id:121,workout:"Ab Rollout (Standing)"},{id:122,workout:"Machine Reverse Fly"},{id:123,workout:"Hammer Strength Row (Plate Loaded)"},{id:124,workout:"Hammer Strength Chest Press (Plate Loaded)"},{id:125,workout:"Hammer Strength Incline Press (Plate Loaded)"},{id:126,workout:"Hammer Strength Shoulder Press (Plate Loaded)"},{id:127,workout:"Landmine Press"},{id:128,workout:"Landmine Row"},{id:129,workout:"Plate Loaded T-Bar Row (Freestanding)"},{id:130,workout:"Trap Bar Deadlift"},{id:131,workout:"Belt Squat (Machine)"},{id:132,workout:"Glute Drive Machine"},{id:133,workout:"Reverse Hyperextension (Glute Focused)"},{id:134,workout:"Cable Glute Kickback"},{id:135,workout:"Frog Pumps"},{id:136,workout:"Cable Pull-Through"},{id:137,workout:"Hip Abduction (Machine)"},{id:138,workout:"Hip Adduction (Machine)"},{id:139,workout:"Good Mornings (Plate)"},{id:140,workout:"Dumbbell Shrugs (Single Arm)"},{id:141,workout:"Cable Upright Row"},{id:142,workout:"Face Pulls (High Cable)"},{id:143,workout:"Arnold Press"},{id:144,workout:"Dumbbell Clean and Press"},{id:145,workout:"Single-Arm Dumbbell Row"},{id:146,workout:"Machine Row (Chest Supported)"},{id:147,workout:"Seal Row (Barbell)"},{id:148,workout:"Bent-Over Dumbbell Lateral Raise"},{id:149,workout:"Band Pull-Aparts"},{id:150,workout:"Cable Incline Bicep Curl"},{id:151,workout:"Cable Concentration Curl"},{id:152,workout:"Cable Reverse Curl"},{id:153,workout:"Single-Arm Cable Triceps Extension"},{id:154,workout:"Weighted Dips (Triceps Focused)"},{id:155,workout:"Dumbbell Skullcrushers (Lying)"},{id:156,workout:"Spider Curl (Dumbbell)"},{id:157,workout:"Zottman Curl"},{id:158,workout:"Standing Cable Fly (Low to High)"},{id:159,workout:"Standing Cable Fly (High to Low)"}`,
        },
        {
          role: "user",
          content: request.body,
        },
      ],
    };
    if (request.method === "POST") {
      try {
        // Forward the request to the Cloudflare AI API
        const aiRequest = new Request(AI_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer yOl3UeWymN5bSKclLUowfwg2KEV9LNbGXbEBK3j_",
            // Add your Cloudflare API token here if needed
            // "Authorization": "Bearer YOUR_API_TOKEN"
          },
          body: JSON.stringify(theBody),
        });

        const response = await fetch(aiRequest);

        // Create a new response with CORS headers
        const corsResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...Object.fromEntries(response.headers),
            ...corsHeaders,
          },
        });

        return corsResponse;
      } catch (error) {
        // Return error response with CORS headers
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }
    }

    // Return a simple response for other methods
    return new Response(
      JSON.stringify({
        message: "Send a POST request with your prompt to use the AI model",
        usage: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: "Your prompt here",
              },
            ],
          },
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  },
};
export { index_default as default };
