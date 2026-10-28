// MONA's privacy policy, as shown on mona.fitness/privacy.
//
// The same text is in the app (move-nation-ai: src/components/PrivacyPolicy.tsx),
// which is the master copy. When one changes, change the other in the same
// way, with the same version and date, so both always say the same thing.
// "{email}" in a paragraph becomes a link to the contact address.

import { SUPPORT_EMAIL } from "./contact";

export const PRIVACY_VERSION = "1.14";
export const PRIVACY_UPDATED = "28 October 2026";
export const PRIVACY_CONTACT = SUPPORT_EMAIL;

export type PolicyBlock =
  | { t: "p"; text: string; lead?: string }
  | { t: "list"; items: string[] };

export type PolicySection = { id: string; title: string; body: PolicyBlock[] };

export const SUMMARY = [
  "Your camera is only used to count reps, live on your phone. No video or photo is ever recorded, saved or uploaded.",
  "Your run route stays on your phone. Only distance, time and pace go to your account.",
  "Friends in a challenge see your name and your totals — never your email.",
  "No ads, no selling of data, no tracking across apps.",
  "You can delete your account and all your data yourself, any time, in Profile. A copy of your data is one email away.",
];

export const SECTIONS: PolicySection[] = [
  {
    id: "who",
    title: "Who we are",
    body: [
      {
        t: "p",
        text: 'MONA (short for "Movement Nation") is a fitness app run by Rod (Rodijs Razmus), a private person based in Latvia (European Union). He is responsible for your data under the EU General Data Protection Regulation (GDPR) — the "controller" in legal terms. In this policy "we" and "us" means MONA.',
      },
      { t: "p", text: "Questions, requests or worries about your data: write to {email}." },
    ],
  },
  {
    id: "account",
    title: "Your account",
    body: [
      { t: "p", text: "To use MONA you create an account. We keep:" },
      {
        t: "list",
        items: [
          "Your email address — to sign you in and to contact you about your account.",
          "Your name — shown to friends in your challenges. If you don't give one, the part of your email before the @ is used instead, until you add a name.",
          "Your password — handled by our sign-in provider and stored only in a scrambled (hashed) form. Nobody, including us, can read it.",
          'Your phone\'s time zone (for example Europe/Riga) — so "today" in challenges and notifications follows your own day. Not your location.',
        ],
      },
      {
        t: "p",
        text: "If you sign in with Google or Apple, they confirm who you are and share your email and name (Google also shares a link to your profile photo, which the app can show as your picture). We never see your Google or Apple password.",
      },
    ],
  },
  {
    id: "camera",
    title: "Camera and AI rep counting",
    body: [
      {
        t: "p",
        text: "When you start a workout, MONA asks to use your camera. The picture is analysed live, on your phone, by a pose-detection model (Google's MediaPipe) that finds your body's position and counts each clean rep.",
      },
      {
        t: "list",
        items: [
          "Each camera frame is looked at and immediately thrown away.",
          "No video, photo or snapshot is recorded, saved or uploaded — not to us, not to anyone.",
          "The camera turns off when you pause or finish.",
          "What is saved is only the result: how many reps counted, how many didn't, and how long it took.",
        ],
      },
      {
        t: "p",
        text: "The counting model is downloaded to your phone the first time from Google's and jsDelivr's servers (like any file download, those servers see your IP address). After that it runs entirely on your device.",
      },
    ],
  },
  {
    id: "runs",
    title: "Runs and location",
    body: [
      {
        t: "p",
        text: "Run challenges use your phone's GPS — only while a run you started is in progress. In the iPhone app it keeps tracking with the screen locked until you finish (iOS shows the location indicator while it does). MONA never tracks your location at any other time.",
      },
      {
        t: "list",
        items: [
          "Your route (the map of where you ran) stays on your phone. The app keeps it for your 30 most recent runs and never uploads it.",
          "To show the street map under your route, the app loads map pictures of that area from OpenFreeMap. Like any website, they see which area was asked for and your IP address — never your route, your name or your account.",
          "Saved to your account, so it's on all your devices: distance, time, moving time, pace, splits, top speed and elevation.",
          "Shared with your challenge: distance and time only.",
        ],
      },
    ],
  },
  {
    id: "workouts",
    title: "Workouts, challenges and what friends see",
    body: [
      {
        t: "p",
        text: "Each workout saves: the challenge, the date, reps counted, reps not counted, and how long it took. This is stored on your phone and in your account, so your history follows you to other devices. Only you can see your full history.",
      },
      { t: "p", text: "When you're in a challenge, the other members can see:" },
      {
        t: "list",
        items: [
          "Your name, your total reps or distance, how many workouts you've done, and when your last one was (leaderboard).",
          "A notification when you hit your daily goal (with your reps and time) or finish your first run of the day (with distance, time and pace).",
          "That you joined. The challenge owner also sees when each member joined.",
        ],
      },
      {
        t: "p",
        text: "Other members never see your email address. If you create a challenge, its invite link shows anyone who opens it — even without an account — the challenge name and settings, your name, and how many people have joined. A picture you add to a challenge is stored at a public web address so it can be shown in the app and in link previews.",
      },
      {
        t: "p",
        text: "If someone invites you by email, MONA tells them whether that email already has a MONA account.",
      },
      {
        t: "p",
        text: "When you give the Quote of the day a thumbs-up, the like is saved to your account so MONA can show the most-liked quotes. Others only see how many likes a quote has — never who liked it. Your likes are deleted with your account.",
      },
      {
        t: "p",
        text: 'If you send a suggestion (Profile → About), it\'s saved to your account with its subject. A public suggestion is shown to other MONA users with your first name, and they can upvote it; a private one is seen only by you and MONA. If you send feedback, your star rating and comment are saved to your account. Only if you switch on "MONA may share this publicly" may we quote your comment with your first name in MONA\'s marketing — switch it off any time and we stop using it in anything new. You can delete your suggestions in the app; they, your votes and your feedback are deleted with your account.',
      },
      {
        t: "p",
        text: "If you report a person, a challenge or an idea, MONA saves the report — the reason, what you wrote, and a copy of what was reported (a name, a challenge's title and rules, or the idea's text) — so it can be reviewed. The person you report is never told who reported them. If you block someone, MONA saves that you blocked them, so they stay hidden from you; they aren't told. You can unblock people in Profile → Community & safety. When you delete your account, your blocks are deleted and reports you sent are kept without anything linking them to you; reports about you are deleted.",
      },
      {
        t: "p",
        text: "When you finish a breathing session in Mind, MONA saves which practice it was, how long it lasted and when, to your account — so your mindful streak and Mind awards follow you to other devices. How you said you felt before and after a session stays only on your phone and is never uploaded. Only you can see your sessions; they aren't shared with challenges.",
      },
    ],
  },
  {
    id: "profile",
    title: "Profile details",
    body: [
      {
        t: "p",
        text: 'Your profile photo, age, weight, height and gender are stored only on your phone and are never uploaded. Your weight is used on your phone to estimate calories burned on runs. Your name is the one profile field saved to your account (see "Your account").',
      },
    ],
  },
  {
    id: "health",
    title: "Health and wearable data (optional)",
    body: [
      {
        t: "p",
        lead: "Apple Health (iPhone app).",
        text: "If you tap “Connect Health” on Home and allow it, MONA reads your step count from Apple Health to show today's steps. It only reads steps, never writes anything to Apple Health, and the steps stay on your phone — they are not sent to MONA's servers, used for advertising or marketing, or shared with anyone. You can turn it off any time in the Health app (Profile → Apps → MONA).",
      },
      {
        t: "p",
        lead: "Runs from your watch (iPhone app).",
        text: "If you connect your watch in Profile → My devices (or on a Run challenge) and allow it, MONA reads the running workouts that your watch app (for example Garmin Connect, COROS, Polar, Suunto, Zepp or the Apple Watch) has saved in Apple Health: start time, duration, distance, average heart rate, active calories, indoor/outdoor and which app or watch recorded it. MONA also reads distance, heart rate and steps samples for this. These stay on your phone until you choose to add a run to a challenge; then that run's distance, time, date, average heart rate, calories and watch name are saved to your account like a run recorded in MONA, and its distance and time count on the challenge leaderboard. GPS routes from your watch are never read. MONA never writes to Apple Health.",
      },
      {
        t: "p",
        text: "If you connect a device in Profile — for example with the Apple Shortcut that reads Apple Health — or type values in yourself, MONA saves to your account, per day: steps, calories, active minutes, resting heart rate, hours of sleep and recovery score.",
      },
      {
        t: "list",
        items: [
          "Only you can see it. It is not shared with challenges or other users.",
          "It's used only to show your daily dashboard in the app.",
          "The Shortcut uses a private key unique to you. Keep it secret; you can stop syncing any time by removing the Shortcut.",
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Who at MONA can see your data",
    body: [
      {
        t: "p",
        text: "Rod, who runs MONA, can see account and activity data in a private admin tool that only he can sign in to: your name, email, sign-in method, when you joined and last signed in, your challenges, your workout and run totals with their dates and times, how many moves the rep counter didn't count, your breathing sessions in Mind (practice, length and time), quotes you liked, your suggestions and feedback, reports you send or that are made about you, and the answer you give if you delete your account. He uses it to run and improve the app, help you when you ask, and stop abuse.",
      },
      {
        t: "list",
        items: [
          "The admin tool never shows health or wearable data, run routes, how you felt in Mind, or anything from your camera.",
          "Changes made there to challenges (editing, removing a member, deleting) are logged.",
        ],
      },
    ],
  },
  {
    id: "device",
    title: "Data kept on your phone",
    body: [
      {
        t: "p",
        text: "To work quickly and offline, the app keeps some data in its storage on your phone: your workout and run history (including run routes), your profile details, settings (sound, reminders, units, theme, Quote of the day), streak freezes and rest days, favourites, your breathing sessions in Mind and how you said you felt before and after them (the feelings never leave the phone), quotes you've written, recipe votes, and your sign-in session.",
      },
      {
        t: "p",
        text: "If a different account signs in on the same phone, the previous account's workout, run, steps and breathing history is removed from the phone. Deleting the app (or clearing the website's data in your browser) removes everything stored on the phone.",
      },
      {
        t: "p",
        text: "Daily reminders are scheduled on your phone itself. MONA does not send push notifications from a server; notifications from friends appear in the bell inside the app.",
      },
    ],
  },
  {
    id: "dont",
    title: "What we don't do",
    body: [
      {
        t: "list",
        items: [
          "We don't sell, rent or trade your data.",
          "No ads and no advertising or tracking tools; we don't track you across other apps or websites.",
          "We don't use your data or anything from your camera to train AI models.",
          "We don't set cookies. (Your sign-in is remembered in the app's own storage on your phone.)",
        ],
      },
    ],
  },
  {
    id: "website",
    title: "The mona.fitness website",
    body: [
      {
        t: "p",
        text: "If you join the waitlist on mona.fitness, we save your email address so we can tell you when MONA is ready for you, and we get an email saying that you joined. To be taken off the waitlist, write to {email}; otherwise we keep it until we no longer need the waitlist.",
      },
      {
        t: "list",
        items: [
          "To stop spam, the website keeps your IP address for up to one hour after you use the waitlist form.",
          "The live stats on the website are anonymous totals from the app — no names or personal data.",
          "The website sets no cookies and uses no analytics or tracking tools. Like any website, its host keeps standard technical logs (such as IP address and time of a request).",
        ],
      },
    ],
  },
  {
    id: "providers",
    title: "Services that help run MONA",
    body: [
      {
        t: "p",
        text: "We use a few trusted providers. They process data only to provide their service to us:",
      },
      {
        t: "list",
        items: [
          "Supabase (through Lovable Cloud) — database, sign-in and file storage for your account, workouts, runs, challenges and notifications.",
          "Lovable and its hosting partners — host the app and website. Sign in with Apple goes through Lovable's sign-in service. Like any web host they keep standard technical logs (such as IP address and time of a request) for security and may keep basic, anonymous visit statistics.",
          "Vercel — hosts the mona.fitness website and stores the waitlist.",
          "Resend — sends us the email when someone joins the waitlist.",
          "Google — Sign in with Google (if you choose it), the app's fonts (Google Fonts) and the rep-counting model file.",
          "jsDelivr — serves the rep-counting program files.",
          "OpenFreeMap — the street map under your run route (map data © OpenStreetMap contributors).",
          "Apple — Sign in with Apple (if you choose it) and the iPhone platform.",
        ],
      },
      {
        t: "p",
        text: "Some of these providers may store or process data outside the EU/EEA. When they do, they use the safeguards the GDPR requires, such as the European Commission's Standard Contractual Clauses.",
      },
    ],
  },
  {
    id: "legal",
    title: "Why we're allowed to use your data",
    body: [
      {
        t: "list",
        items: [
          "To provide the app you signed up for (contract): your account, workouts, runs, challenges and notifications.",
          "Your consent: camera, location and health/wearable sync. You can withdraw it any time in your phone's settings or by disconnecting the device in Profile.",
          "Your consent: joining the waitlist on mona.fitness. You can withdraw it any time by emailing us.",
          "Our legitimate interests: keeping MONA secure, preventing abuse and cheating on leaderboards, and fixing problems.",
        ],
      },
    ],
  },
  {
    id: "keep",
    title: "How long we keep data",
    body: [
      {
        t: "p",
        text: "We keep your account data for as long as you have an account. You can delete your account yourself at any time in Profile → Delete account. It happens straight away: your account, workouts, runs, breathing sessions, health data, challenge memberships, uploaded challenge pictures and notifications about you are deleted, and you disappear from leaderboards. Copies in our providers' backups disappear soon after as those backups are replaced.",
      },
      {
        t: "p",
        text: "Challenges you created aren't taken away from your friends: each one is handed to the member who joined first, or deleted if nobody else is in it. If you tell us why you're leaving, that answer is kept without your name, email or any link to you, only to help us improve MONA.",
      },
      {
        t: "p",
        text: "Data on your phone stays until you delete the app or clear its data; deleting your account also clears MONA's data from the phone you do it on.",
      },
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      { t: "p", text: "Under the GDPR you can ask us to:" },
      {
        t: "list",
        items: [
          "Give you a copy of your data (access and portability).",
          "Correct anything that's wrong (you can change your name in Profile yourself).",
          "Delete your data and your account — you can also do this yourself in Profile → Delete account.",
          "Limit or stop a use of your data you object to.",
          "Withdraw consent you've given, at any time.",
        ],
      },
      {
        t: "p",
        text: "Email {email} from the address you use for MONA, so we can confirm it's you. We'll reply within one month.",
      },
      {
        t: "p",
        text: "You can also complain to the Latvian Data State Inspectorate (Datu valsts inspekcija, www.dvi.gov.lv) or the data protection authority where you live.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      {
        t: "p",
        text: "Everything between the app and our servers is encrypted (HTTPS). Database rules make sure each person can only reach their own data and the challenges they're part of, and the server checks workout and run data for impossible values. No system is 100% secure, but we work to protect your data and will tell you without delay if something ever goes wrong that affects you.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      {
        t: "p",
        text: "MONA is not meant for children under 13, and we don't knowingly collect their data. If you're a parent and think your child has signed up, contact us and we'll delete the account.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      {
        t: "p",
        text: "If we change how MONA uses data, we'll update this policy, its version number and date. For important changes we'll also let you know in the app before they take effect.",
      },
    ],
  },
];
