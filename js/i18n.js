/* ==========================================================
   IRON HOUSE FITNESS — English / Arabic (RTL) switcher
   How it works: the pages are written in English. When Arabic is
   selected, every visible text piece (and placeholder / alt / aria-label)
   is looked up in the DICT below by its English text. Anything not found
   simply stays in English. A MutationObserver translates content that
   JavaScript adds later (cards, modals, toasts), so no other file changes.
   To add or fix a translation, edit DICT or PATTERNS.
   ========================================================== */
(function () {
  "use strict";
  const KEY = "ironhouse.lang";

  /* ---------- Exact-text dictionary (English -> Arabic) ---------- */
  const DICT = {
    /* meta / shared */
    "IRON HOUSE FITNESS | Premium Gym Website Demo": "IRON HOUSE FITNESS | نموذج موقع نادي رياضي متميز",
    "Premium Gym Website Demo": "نموذج موقع نادي رياضي متميز",
    "Dashboard Demo | IRON HOUSE FITNESS": "لوحة التحكم التجريبية | IRON HOUSE FITNESS",
    "IRON HOUSE FITNESS is a premium gym website demo: workout programs, trainers, membership plans, class schedule and a membership management dashboard. All content is fictional demo data.": "IRON HOUSE FITNESS نموذج موقع نادي رياضي متميز: برامج تدريب، مدربون، خطط اشتراك، جدول حصص ولوحة لإدارة الاشتراكات. كل المحتوى بيانات تجريبية خيالية.",
    "Skip to main content": "تخطَّ إلى المحتوى الرئيسي",
    "Demo": "تجريبي",
    "Portfolio demo website. All names, prices, trainers and statistics are fictional placeholders.": "موقع تجريبي لمعرض الأعمال. جميع الأسماء والأسعار والمدربين والإحصائيات خيالية.",
    "IRON HOUSE FITNESS home": "الصفحة الرئيسية لـ IRON HOUSE FITNESS",
    "Main navigation": "التنقل الرئيسي",
    "Open menu": "فتح القائمة",
    "Close menu": "إغلاق القائمة",
    "Close dialog": "إغلاق النافذة",
    "Close": "إغلاق",
    "Back to top": "العودة للأعلى",
    "Footer navigation": "التنقل في أسفل الصفحة",

    /* nav */
    "Programs": "البرامج", "Trainers": "المدربون", "Membership": "الاشتراكات", "Schedule": "الجدول", "Contact": "تواصل معنا",
    "Dashboard Demo": "لوحة التحكم التجريبية", "Join Now": "انضم الآن",

    /* hero */
    "Premium training · Cairo, Egypt (demo)": "تدريب متميز · القاهرة، مصر (تجريبي)",
    "Forge a": "اصنع", "stronger": "نسخة أقوى", "you.": "منك.",
    "IRON HOUSE FITNESS is where serious equipment meets coaching that actually cares. Train with structured programs, expert-led classes and a community that pushes you further.": "في IRON HOUSE FITNESS تلتقي المعدات الاحترافية بتدريب يهتم بك فعلًا. تمرّن ببرامج منظمة وحصص بقيادة خبراء ومجتمع يدفعك للأمام.",
    "Start Your Journey": "ابدأ رحلتك", "Explore Programs": "استكشف البرامج",
    "Pro-grade equipment": "معدات احترافية", "Certified coaches": "مدربون معتمدون", "Flexible plans": "خطط مرنة", "Highlights": "أبرز المميزات",
    "Athlete gripping a loaded barbell, preparing for a deadlift on a dark gym floor": "رياضي يمسك بار حديد محمّلًا استعدادًا لتمرين الديدلفت في صالة مظلمة",

    /* stats */
    "Gym statistics (demo data)": "إحصائيات النادي (بيانات تجريبية)",
    "Expert trainers": "مدربان خبيران", "Workout programs": "برنامج تدريبي", "Active members": "عضو نشط", "Weekly classes": "حصة أسبوعيًا",
    "Statistics shown are demo data for presentation purposes.": "الإحصائيات المعروضة بيانات تجريبية لأغراض العرض فقط.",

    /* why */
    "Why IRON HOUSE": "لماذا IRON HOUSE", "Built for people who": "صُمم لمن", "show up": "يلتزمون بالحضور",
    "Everything a serious training space needs, without the noise.": "كل ما تحتاجه مساحة تدريب جادة، بدون ضوضاء.",
    "Pro-grade equipment ": "معدات احترافية",
    "Calibrated plates, racks and machines in a clean, spacious training hall.": "أوزان وحوامل وأجهزة مضبوطة في صالة تدريب نظيفة وواسعة.",
    "Expert coaching": "تدريب بإشراف خبراء",
    "Certified trainers who teach technique first and chase progress second.": "مدربون معتمدون يعلّمون الأسلوب الصحيح أولًا ثم يسعون للتقدم.",
    "Classes all week": "حصص طوال الأسبوع",
    "Strength, HIIT, boxing, yoga and functional training with flexible times.": "قوة وهيت وملاكمة ويوغا وتدريب وظيفي بمواعيد مرنة.",
    "Structured programs": "برامج منظمة",
    "Clear multi-week plans so you always know what to do next.": "خطط واضحة لعدة أسابيع لتعرف دائمًا ما التمرين التالي.",
    "Recovery space": "مساحة للاستشفاء",
    "Stretch zone, showers and lockers so you leave feeling better than you arrived.": "منطقة إطالة ودشات وخزائن لتغادر وأنت في حال أفضل مما دخلت.",
    "Respectful community": "مجتمع محترم",
    "A welcoming floor for first-timers and seasoned lifters alike.": "أجواء ترحيبية للمبتدئين والمحترفين على حد سواء.",

    /* programs section */
    "Workout programs ": "برامج التدريب",
    "Pick a program,": "اختر برنامجًا،", "own the plan": "وامتلك خطتك",
    "Sample programs for demonstration. They are general fitness content, not individualized medical or professional advice. Consult a doctor before starting any new exercise routine.": "برامج نموذجية للعرض فقط. هي محتوى لياقة عام وليست نصيحة طبية أو مهنية مخصصة. استشر طبيبك قبل بدء أي روتين تمرين جديد.",
    "Filter programs by category": "تصفية البرامج حسب الفئة", "Filter by difficulty": "تصفية حسب المستوى",
    "All": "الكل", "Strength": "تمارين القوة", "Muscle Building": "بناء العضلات", "Fat Loss": "حرق الدهون", "Functional": "التدريب الوظيفي",
    "All levels": "كل المستويات", "Beginner": "مبتدئ", "Intermediate": "متوسط", "Advanced": "متقدم",
    "View details": "عرض التفاصيل", "Clear filters": "مسح الفلاتر",
    "No programs match": "لا توجد برامج مطابقة", "Try a different category or difficulty level.": "جرّب فئة أو مستوى مختلفًا.",
    "Beginner Strength": "القوة للمبتدئين", "Power Builder": "بناء القدرة", "Mass Starter": "بداية الكتلة العضلية",
    "Metabolic Burn": "الحرق الأيضي", "Functional Fitness": "اللياقة الوظيفية", "Athletic Conditioning": "التكييف الرياضي",
    "Learn the big lifts with safe technique and steady progress.": "تعلّم التمارين الأساسية بأسلوب آمن وتقدم ثابت.",
    "Heavy compound lifting blocks for experienced lifters chasing PRs.": "كتل تمارين مركّبة ثقيلة لذوي الخبرة الساعين لأرقام شخصية جديدة.",
    "A classic body-part split with higher volume for size and shape.": "تقسيم كلاسيكي للعضلات بحجم تمرين أعلى للضخامة والشكل.",
    "An upper/lower split that introduces gym-style muscle training.": "تقسيم علوي/سفلي يقدّم لك تدريب العضلات في النادي.",
    "Resistance training plus conditioning intervals for an active routine.": "تدريب مقاومة مع فترات تكييف لروتين نشيط.",
    "A short, intense block of high-tempo sessions.": "فترة قصيرة مكثفة من الجلسات سريعة الإيقاع.",
    "Move well in daily life: balance, mobility, and everyday strength.": "تحرّك بشكل أفضل في حياتك اليومية: توازن ومرونة وقوة.",
    "Speed, agility and work capacity for sport and mixed training.": "سرعة ورشاقة وقدرة على العمل للرياضة والتدريب المتنوع.",
    "An introduction to barbell and dumbbell basics. You'll practise squat, hinge, push, pull and carry patterns while building a base of strength.": "مقدمة في أساسيات البار والدمبل. ستتدرب على أنماط السكوات والمفصلة والدفع والسحب والحمل وأنت تبني قاعدة من القوة.",
    "Periodised blocks of heavy singles, doubles and triples, with accessory work to keep joints and weak points in shape.": "كتل مقسّمة من تكرارات ثقيلة (1 و2 و3) مع تمارين مساعدة للحفاظ على المفاصل ونقاط الضعف.",
    "Five focused sessions per week, each targeting one or two muscle groups with moderate reps and controlled tempo.": "خمس جلسات مركّزة أسبوعيًا، كل منها يستهدف مجموعة أو اثنتين من العضلات بتكرارات متوسطة وإيقاع مضبوط.",
    "Alternating upper- and lower-body days with simple exercise choices, so you can focus on form and consistency.": "أيام متبادلة للجزء العلوي والسفلي بتمارين بسيطة لتركّز على الأداء الصحيح والانتظام.",
    "Combines full-body strength circuits with cardio intervals. Pair it with a sensible eating routine of your choice.": "يجمع بين دوائر قوة للجسم كاملًا وفترات كارديو. اجمعه مع نظام غذائي معقول من اختيارك.",
    "Six weeks of fast-paced intervals and loaded carries. Demanding by design, so it suits people who already train regularly.": "ستة أسابيع من الفترات السريعة وحمل الأوزان. شاق بطبيعته، لذلك يناسب من يتدربون بانتظام.",
    "Bodyweight, kettlebell and band exercises that train movement patterns you use outside the gym.": "تمارين بوزن الجسم والكيتل بيل والأحزمة المطاطية تدرّب حركات تستخدمها خارج النادي.",
    "Plyometrics, sprints, rope work and loaded movement to build an athletic engine.": "تمارين بليومترية وركض سريع وحبال وحركات محمّلة لبناء محرك رياضي.",
    "Barbells, dumbbells, bench, cable machine": "بارات، دمبل، بنش، جهاز كابل",
    "Power rack, barbells, plates, accessory machines": "حامل قوة، بارات، أوزان، أجهزة مساعدة",
    "Dumbbells, cables, barbells, machines": "دمبل، كابلات، بارات، أجهزة",
    "Dumbbells, machines, cables": "دمبل، أجهزة، كابلات",
    "Dumbbells, kettlebells, treadmill, rower": "دمبل، كيتل بيل، تريدميل، جهاز تجديف",
    "Kettlebells, sleds, battle ropes, assault bike": "كيتل بيل، مزلقة، حبال، دراجة هجومية",
    "Kettlebells, bands, mats, TRX": "كيتل بيل، أحزمة مطاطية، مراتب، TRX",
    "Plyo boxes, battle ropes, sleds, kettlebells": "صناديق بليو، حبال، مزلقة، كيتل بيل",
    "Squat pattern + upper push": "نمط السكوات + دفع علوي", "Rest or light walk": "راحة أو مشي خفيف", "Hinge pattern + upper pull": "نمط المفصلة + سحب علوي",
    "Rest": "راحة", "Full-body strength + core": "قوة الجسم كاملًا + الجذع", "Rest and recovery": "راحة واستشفاء",
    "Heavy squat + accessories": "سكوات ثقيل + تمارين مساعدة", "Heavy bench + upper back": "بنش ثقيل + الظهر العلوي",
    "Deadlift + posterior chain": "ديدلفت + السلسلة الخلفية", "Overhead press + arms": "ضغط علوي + الذراعين", "Rest and mobility": "راحة ومرونة",
    "Chest + triceps": "صدر + تراي", "Back + biceps": "ظهر + باي", "Legs": "الأرجل", "Shoulders + abs": "أكتاف + بطن", "Arms + weak-point work": "ذراعان + نقاط الضعف",
    "Upper body": "الجزء العلوي", "Lower body": "الجزء السفلي",
    "Full-body circuit": "دائرة للجسم كاملًا", "Interval cardio": "كارديو متقطع", "Rest or walk": "راحة أو مشي", "Lower-body circuit + core": "دائرة سفلية + الجذع",
    "Upper-body circuit + intervals": "دائرة علوية + فترات", "Active recovery": "استشفاء نشط",
    "Sled + kettlebell intervals": "فترات مزلقة + كيتل بيل", "Upper-body supersets": "سوبر ست علوي", "Bike intervals + core": "فترات دراجة + الجذع",
    "Lower-body supersets": "سوبر ست سفلي", "Mixed-modal finisher": "ختام متنوع",
    "Movement basics + core": "أساسيات الحركة + الجذع", "Carries, lunges and pulls": "حمل واندفاعات وسحب", "Balance, mobility + conditioning": "توازن ومرونة وتكييف",
    "Optional walk or yoga": "مشي أو يوغا (اختياري)",
    "Plyometrics + sprints": "بليومترك + ركض سريع", "Strength + carries": "قوة + حمل", "Agility + rope work": "رشاقة + حبال", "Conditioning circuit": "دائرة تكييف",
    "Weekend": "عطلة نهاية الأسبوع",
    "Exercises by muscle": "التمارين حسب العضلة", "All muscles": "كل العضلات", "Filter exercises by muscle": "تصفية التمارين حسب العضلة",
    "Chest": "الصدر", "Back": "الظهر", "Shoulders": "الأكتاف", "Arms": "الذراعان", "Core": "البطن والجذع",
    "Simple demo illustrations to show the movement. They are not exact technique instructions.": "رسوم توضيحية بسيطة لشكل الحركة، وليست تعليمات دقيقة لأسلوب الأداء.",
    "5 exercises for every muscle. Press Start exercise to see how it is done, the joint angles, and the timer with rep counter.": "5 تمارين لكل عضلة. اضغط «ابدأ التمرين» لترى طريقة الأداء وزوايا المفاصل والمؤقت مع عدّاد التكرارات.",
    "Listen to this step": "استمع إلى هذه الخطوة",
    "Your browser cannot read text aloud.": "المتصفح لا يدعم القراءة الصوتية.",
    "5 exercises for every muscle. Press Start exercise and Coach Karim explains it to you in the gym, with the joint angles and a timer with rep counter.": "5 تمارين لكل عضلة. اضغط «ابدأ التمرين» ويشرحه لك الكابتن كريم في الجيم، مع زوايا المفاصل ومؤقت بعدّاد تكرارات.",
    "Demo content: general information, not exact technique instructions.": "محتوى تجريبي: معلومات عامة وليست تعليمات دقيقة لأسلوب الأداء.",
    "In the gym": "في الجيم",
    "AI-generated video for demonstration. It does not show a real person.": "فيديو مولَّد بالذكاء الاصطناعي للعرض التجريبي. لا يظهر شخصًا حقيقيًا.",
    "Watch the AI video": "شاهد الفيديو بالذكاء الاصطناعي", "Choose how to learn": "اختر طريقة التعلم",
    "Coach Karim Hassan in the gym": "الكابتن كريم حسن في الجيم",
    "Press play and Coach Karim will explain this exercise in the gym.": "اضغط تشغيل ليشرح لك الكابتن كريم هذا التمرين في الجيم.",
    "Now it's your turn. Press Start to begin your first set.": "دورك الآن. اضغط «ابدأ» لتبدأ أول مجموعة.",
    "Play Coach Karim's explanation": "تشغيل شرح الكابتن كريم", "Stop the explanation": "إيقاف الشرح",
    "Warm up first and stop if anything hurts. Timer and explanations are for demonstration only.": "سخّن جسمك أولًا وتوقف إذا شعرت بألم. المؤقت والشرح للعرض التجريبي فقط.",
    /* calorie calculator */
    "Calorie calculator": "حاسبة السعرات", "Calorie Calculator": "حاسبة السعرات", "Know your": "اعرف", "numbers": "أرقامك",
    "Estimate how many calories you need each day and how to split them into protein, carbs and fat. A general estimate, not medical or nutrition advice.": "قدّر عدد السعرات التي تحتاجها يوميًا وكيف توزعها بين البروتين والكربوهيدرات والدهون. تقدير عام وليس نصيحة طبية أو غذائية.",
    "Sex": "الجنس", "Male": "ذكر", "Female": "أنثى", "Age (years)": "العمر (بالسنوات)", "Height (cm)": "الطول (سم)", "Weight (kg)": "الوزن (كجم)", "Activity level": "مستوى النشاط",
    "e.g. 28": "مثال: 28", "e.g. 175": "مثال: 175", "e.g. 78": "مثال: 78",
    "Sedentary: little or no exercise": "قليل الحركة: تمرين قليل أو معدوم", "Light: exercise 1–3 days a week": "خفيف: تمرين 1–3 أيام أسبوعيًا",
    "Moderate: exercise 3–5 days a week": "متوسط: تمرين 3–5 أيام أسبوعيًا", "Active: hard exercise 6–7 days a week": "نشيط: تمرين شاق 6–7 أيام أسبوعيًا", "Very active: hard training twice a day": "نشيط جدًا: تدريب شاق مرتين يوميًا",
    "Your goal": "هدفك", "Lose fat": "خسارة الدهون", "Maintain weight": "الحفاظ على الوزن", "Build muscle": "بناء العضلات", "Calculate": "احسب",
    "Fill in the form and press Calculate to see your daily targets.": "املأ النموذج واضغط «احسب» لترى أهدافك اليومية.",
    "Uses the Mifflin-St Jeor equation. Results are estimates and vary from person to person. Talk to a doctor or dietitian before changing your diet, especially if you are under 18, pregnant, or have a health condition.": "تعتمد على معادلة ميفلين-سانت جور. النتائج تقديرية وتختلف من شخص لآخر. استشر طبيبًا أو أخصائي تغذية قبل تغيير نظامك الغذائي، خاصة إذا كنت دون 18 عامًا أو حاملًا أو لديك حالة صحية.",
    "Enter an age between 15 and 80.": "أدخل عمرًا بين 15 و80 سنة.", "Enter a height between 120 and 230 cm.": "أدخل طولًا بين 120 و230 سم.", "Enter a weight between 30 and 250 kg.": "أدخل وزنًا بين 30 و250 كجم.",
    "Your daily calorie target": "هدفك اليومي من السعرات", "kcal": "سعرة",
    "About 20% below your maintenance calories for gradual fat loss.": "أقل بحوالي 20% من سعرات الحفاظ على الوزن لخسارة تدريجية للدهون.",
    "Equal to your maintenance calories to keep your weight.": "تساوي سعرات الحفاظ على الوزن لتثبيت وزنك.",
    "About 10% above your maintenance calories for gradual muscle gain.": "أعلى بحوالي 10% من سعرات الحفاظ على الوزن لبناء تدريجي للعضلات.",
    "You are under 18: please check your calorie needs with a doctor or dietitian.": "عمرك أقل من 18 عامًا: من فضلك استشر طبيبًا أو أخصائي تغذية بشأن احتياجك من السعرات.",
    "Basal metabolic rate (BMR)": "معدل الأيض الأساسي (BMR)", "Maintenance calories": "سعرات الحفاظ على الوزن", "Body mass index (BMI)": "مؤشر كتلة الجسم (BMI)",
    "Underweight": "نقص في الوزن", "Healthy weight": "وزن صحي", "Overweight": "زيادة في الوزن", "Obesity range": "نطاق السمنة",
    "Daily macros": "العناصر الغذائية اليومية", "Protein": "بروتين", "Carbs": "كربوهيدرات", "Fat": "دهون",
    "Want a plan built around these numbers?": "تريد خطة مبنية على هذه الأرقام؟",
    /* FAQ, WhatsApp, map, notice, privacy */
    "FAQ": "الأسئلة الشائعة", "Frequently asked questions": "الأسئلة الشائعة", "Got questions?": "عندك أسئلة؟", "We have answers": "عندنا إجابات",
    "Sample answers for demonstration. Replace them with your gym's real policies.": "إجابات نموذجية للعرض. استبدلها بسياسات ناديك الحقيقية.",
    "How do I join IRON HOUSE FITNESS?": "كيف أشترك في IRON HOUSE FITNESS؟",
    "Pick a membership plan in the Membership section and fill in the short form. The gym team then contacts you to complete your registration.": "اختر خطة اشتراك من قسم الاشتراكات واملأ النموذج القصير. بعدها يتواصل معك فريق النادي لإتمام التسجيل.",
    "Can I try the gym before I commit?": "هل أستطيع تجربة النادي قبل الاشتراك؟",
    "Yes. Book a free intro consultation with a trainer and ask about a trial visit.": "نعم. احجز استشارة تعريفية مجانية مع أحد المدربين واسأل عن زيارة تجريبية.",
    "Are the programs suitable for beginners?": "هل البرامج مناسبة للمبتدئين؟",
    "Yes. Every program shows its difficulty level. Start with Beginner Strength or Functional Fitness, and ask a coach if you are unsure.": "نعم. كل برنامج يوضح مستوى صعوبته. ابدأ بالقوة للمبتدئين أو اللياقة الوظيفية، واسأل أحد المدربين إذا لم تكن متأكدًا.",
    "Do I need to book classes in advance?": "هل أحتاج إلى حجز الحصص مسبقًا؟",
    "Booking is recommended for busy evening classes. You can also book a one-to-one session with a trainer using the Book trainer buttons.": "يُفضَّل الحجز لحصص المساء المزدحمة. ويمكنك أيضًا حجز جلسة فردية مع مدرب بأزرار «احجز المدرب».",
    "What are the opening hours?": "ما مواعيد العمل؟",
    "Saturday to Thursday 06:00 to 23:00, and Friday 10:00 to 20:00.": "من السبت إلى الخميس من 06:00 إلى 23:00، والجمعة من 10:00 إلى 20:00.",
    "Can I freeze or cancel my membership?": "هل يمكنني تجميد الاشتراك أو إلغاؤه؟",
    "Annual members can freeze their membership for up to 14 days. Ask the gym team about other options.": "يمكن لأعضاء الاشتراك السنوي تجميد اشتراكهم حتى 14 يومًا. اسأل فريق النادي عن الخيارات الأخرى.",
    "Is the exercise guidance medical advice?": "هل إرشادات التمارين نصيحة طبية؟",
    "No. Programs and exercise guides are general fitness information. Please consult a doctor before starting a new routine, and stop if anything hurts.": "لا. البرامج وإرشادات التمارين معلومات لياقة عامة. استشر طبيبك قبل بدء روتين جديد، وتوقف إذا شعرت بأي ألم.",
    "What should I bring?": "ماذا أحضر معي؟",
    "Comfortable training clothes, indoor shoes, a towel and a water bottle. Lockers and showers are available.": "ملابس تدريب مريحة وحذاء رياضي للصالات وفوطة وزجاجة مياه. تتوفر خزائن ودشات.",
    "Chat on WhatsApp": "تحدث عبر واتساب",
    "Hello IRON HOUSE FITNESS! I would like to know more about memberships.": "مرحبًا IRON HOUSE FITNESS! أود معرفة المزيد عن الاشتراكات.",
    "Find us": "موقعنا",
    "The map loads only when you press the button, so no outside service sees your visit before that. The location shown is an example in Cairo. Replace it with your gym's address.": "تُحمَّل الخريطة فقط عند الضغط على الزر، فلا تطّلع أي جهة خارجية على زيارتك قبل ذلك. الموقع المعروض مثال في القاهرة. استبدله بعنوان ناديك.",
    "Show map": "عرض الخريطة", "Open in Google Maps": "افتح في خرائط جوجل", "Map showing an example location in Cairo": "خريطة تعرض موقعًا نموذجيًا في القاهرة",
    "Storage notice": "إشعار التخزين", "Got it": "فهمت", "Privacy Policy": "سياسة الخصوصية",
    "This site stores your language choice and demo data only in your browser. It uses no tracking or advertising cookies.": "يحفظ هذا الموقع اختيار اللغة والبيانات التجريبية في متصفحك فقط. ولا يستخدم أي ملفات تعريف ارتباط للتتبع أو الإعلانات.",
    "Privacy Policy | IRON HOUSE FITNESS": "سياسة الخصوصية | IRON HOUSE FITNESS",
    "Privacy policy of the IRON HOUSE FITNESS demo website: what data the forms handle, browser storage, third-party services and your choices.": "سياسة الخصوصية لموقع IRON HOUSE FITNESS التجريبي: البيانات التي تعالجها النماذج، والتخزين في المتصفح، والخدمات الخارجية، وخياراتك.",
    "Back to the website": "العودة إلى الموقع", "Home": "الرئيسية",
    "This page explains what happens to your information when you use the IRON HOUSE FITNESS website.": "توضح هذه الصفحة ما يحدث لمعلوماتك عند استخدام موقع IRON HOUSE FITNESS.",
    "This is a template for a demo website and not legal advice. Before launching a real gym website, replace it with a policy reviewed by a lawyer.": "هذا نموذج لموقع تجريبي وليس استشارة قانونية. قبل إطلاق موقع نادٍ حقيقي، استبدله بسياسة يراجعها محامٍ.",
    "Who we are": "من نحن",
    "IRON HOUSE FITNESS is a fictional demo gym created for a web development portfolio. No real business, members or payments exist behind this site.": "IRON HOUSE FITNESS نادٍ رياضي خيالي أُنشئ لمعرض أعمال في تطوير المواقع. لا يوجد خلف هذا الموقع أي نشاط تجاري أو أعضاء أو مدفوعات حقيقية.",
    "Information the forms handle": "المعلومات التي تعالجها النماذج",
    "The registration, booking and contact forms ask for your name, email address and phone number. In this demo, the details you type are stored only in your own browser and are never sent to a server or to anyone else.": "تطلب نماذج التسجيل والحجز والتواصل اسمك وبريدك الإلكتروني ورقم هاتفك. في هذا العرض التجريبي تُحفظ البيانات التي تكتبها في متصفحك فقط، ولا تُرسل إلى أي خادم أو أي شخص آخر.",
    "Browser storage and cookies": "التخزين في المتصفح وملفات تعريف الارتباط",
    "The site stores your language choice, whether you closed the storage notice, and the demo data you create (memberships, bookings and plan prices) in your browser's local storage. It uses no tracking or advertising cookies.": "يحفظ الموقع في التخزين المحلي لمتصفحك اختيار اللغة، وهل أغلقت إشعار التخزين، والبيانات التجريبية التي تنشئها (الاشتراكات والحجوزات وأسعار الخطط). ولا يستخدم أي ملفات تعريف ارتباط للتتبع أو الإعلانات.",
    "Third-party services": "الخدمات الخارجية",
    "To display the site, your browser loads fonts from Google Fonts and photos from Unsplash. If you press Show map, the map is loaded from OpenStreetMap. If you press the WhatsApp button, you leave this site and WhatsApp's own privacy policy applies. These services may receive your IP address when they load.": "لعرض الموقع، يحمّل متصفحك الخطوط من Google Fonts والصور من Unsplash. وإذا ضغطت «عرض الخريطة» تُحمَّل الخريطة من OpenStreetMap. وإذا ضغطت زر واتساب فإنك تغادر هذا الموقع وتنطبق سياسة خصوصية واتساب. قد تستلم هذه الخدمات عنوان IP الخاص بك عند التحميل.",
    "Voice features": "ميزات الصوت",
    "The Listen buttons use your browser's built-in text-to-speech. The text is read aloud on your own device.": "تستخدم أزرار الاستماع خاصية القراءة الصوتية المدمجة في متصفحك. ويُقرأ النص بصوت عالٍ على جهازك أنت.",
    "Health information": "المعلومات الصحية",
    "Programs and exercise guides are general fitness information, not medical advice. The site does not collect health data.": "البرامج وإرشادات التمارين معلومات لياقة عامة وليست نصيحة طبية. ولا يجمع الموقع أي بيانات صحية.",
    "Your choices": "خياراتك",
    "You can delete all demo data at any time with Reset demo data in the dashboard, or by clearing this site's data in your browser settings.": "يمكنك حذف كل البيانات التجريبية في أي وقت عبر «إعادة ضبط البيانات التجريبية» في لوحة التحكم، أو بمسح بيانات هذا الموقع من إعدادات المتصفح.",
    "If this were a real gym": "لو كان هذا ناديًا حقيقيًا",
    "A real gym website must say who is responsible for the data, why each piece of data is collected, how long it is kept, who receives it, and how members can ask to see, correct or delete it. Complete these points with a lawyer before launch.": "يجب أن يوضح موقع النادي الحقيقي من المسؤول عن البيانات، ولماذا تُجمع كل بيانة، ومدة الاحتفاظ بها، ومن يستلمها، وكيف يطلب الأعضاء الاطلاع عليها أو تصحيحها أو حذفها. أكمل هذه النقاط مع محامٍ قبل الإطلاق.",
    "Questions about this policy: privacy@your-gym.example (placeholder).": "للاستفسار عن هذه السياسة: privacy@your-gym.example (نص مؤقت).",
    "Book trainer": "احجز المدرب",
    "Book with a trainer": "احجز مع مدرب", "Request Booking": "طلب الحجز", "Trainer": "المدرب", "Session type": "نوع الجلسة", "Date": "التاريخ", "Available times": "الأوقات المتاحة",
    "Choose a trainer, a day and a time. This is a demo: no payment is taken and nothing is sent to the gym.": "اختر مدربًا ويومًا وموعدًا. هذا عرض تجريبي: لن يتم سحب أي مبلغ ولن يُرسل شيء إلى النادي.",
    "Personal training session (60 min)": "جلسة تدريب شخصي (60 دقيقة)", "Form & technique check (30 min)": "مراجعة الأداء والأسلوب (30 دقيقة)", "Free intro consultation (30 min)": "استشارة تعريفية مجانية (30 دقيقة)",
    "Pick a date to see available times.": "اختر تاريخًا لترى الأوقات المتاحة.", "No free times on this day. Try another date.": "لا توجد أوقات متاحة في هذا اليوم. جرّب تاريخًا آخر.",
    "Choose a time.": "اختر موعدًا.", "Choose a date within the next 30 days.": "اختر تاريخًا خلال الـ 30 يومًا القادمة.",
    "Booking requested!": "تم طلب الحجز!",
    "Your browser blocked local storage, so the demo booking could not be saved. Please allow site data and try again.": "المتصفح منع التخزين المحلي، لذلك لم يمكن حفظ الحجز التجريبي. اسمح ببيانات الموقع وحاول مرة أخرى.",
    "Bookings": "الحجوزات", "Trainer sessions booked on the website": "جلسات المدربين المحجوزة من الموقع", "Client": "العميل", "Session": "الجلسة", "Date & time": "التاريخ والوقت",
    "No bookings yet": "لا توجد حجوزات بعد", "Bookings made on the website appear here.": "الحجوزات التي تتم من الموقع تظهر هنا.", "Booking deleted.": "تم حذف الحجز.",
    "Target muscle": "العضلة المستهدفة", "Also works": "تعمل أيضًا", "How to do it": "طريقة الأداء", "Tip": "نصيحة",
    "Camera view:": "زاوية العرض:", "Side view": "منظر جانبي",
    "Elbow angle": "زاوية المرفق", "Knee angle": "زاوية الركبة", "Hip angle": "زاوية الورك", "Shoulder angle": "زاوية الكتف", "Ankle angle": "زاوية الكاحل",
    "The area highlighted in red is the targeted muscle.": "المنطقة المظللة بالأحمر هي العضلة المستهدفة.",
    "Incline Push-Up": "ضغط مائل", "Cable Fly": "فلاي الكابل", "Lat Pulldown": "سحب الظهر (لات بول داون)", "Superman": "تمرين السوبرمان",
    "Calf Raise": "رفع السمانة", "Good Morning": "تمرين جود مورنينج", "Shrug": "هز الكتفين (شراغ)", "Reverse Fly": "فلاي عكسي",
    "Bench Dips": "الغطس على البنش", "Triceps Pushdown": "دفع التراي بالكابل", "Mountain Climber": "تسلق الجبل", "Hanging Knee Raise": "رفع الركبتين من التعلق",
    "Start exercise": "ابدأ التمرين", "Start": "ابدأ", "Pause": "إيقاف مؤقت", "Resume": "استئناف", "Finish set": "إنهاء المجموعة", "Skip rest": "تخطي الراحة",
    "Workout time": "وقت التمرين", "reps": "تكرار", "Rest": "راحة", "seconds left": "ثانية متبقية",
    "Aim for 10–12 reps with slow, controlled movement.": "استهدف 10–12 تكرارًا بحركة بطيئة ومتحكَّم بها.",
    "Go! Complete your reps.": "انطلق! أكمل تكراراتك.",
    "Rest and breathe. Next set starts automatically.": "استرح وتنفّس. المجموعة التالية تبدأ تلقائيًا.",
    "Warm up first and stop if anything hurts. Timer and illustrations are for demonstration only.": "سخّن جسمك أولًا وتوقف إذا شعرت بألم. المؤقت والرسومات للعرض التجريبي فقط.",
    "Warm up first and stop if anything hurts. Timer for demonstration only.": "سخّن جسمك أولًا وتوقف إذا شعرت بألم. المؤقت للعرض التجريبي فقط.",
    "Exercise complete!": "اكتمل التمرين!", "Remember to cool down and listen to your body.": "لا تنسَ تمارين التهدئة، وأنصت لجسمك.",
    "Dumbbell Pullover": "بولوفر بالدمبل", "Upright Row": "السحب العمودي", "Triceps Kickback": "كيك باك للتراي", "Leg Raise": "رفع الأرجل", "Crunch": "كرنش البطن",
    "Squat": "سكوات", "Walking Lunge": "الاندفاع الأمامي (لانج)", "Glute Bridge": "جسر الأرداف", "Bench Press": "ضغط البنش", "Push-Up": "تمرين الضغط",
    "Deadlift": "الديدلفت", "Bent-Over Row": "التجديف بالانحناء", "Pull-Up": "العقلة", "Overhead Press": "ضغط الأكتاف", "Front Raise": "رفع أمامي",
    "Biceps Curl": "تمرين الباي (كيرل)", "Overhead Triceps Extension": "تمديد التراي فوق الرأس", "Plank": "البلانك", "Sit-Up": "تمرين البطن (سيت أب)", "Kettlebell Swing": "أرجحة الكيتل بيل",
    "Demo content": "محتوى تجريبي", "weeks": "أسابيع", "per week": "أسبوعيًا", "per session": "للجلسة", "Sample week": "أسبوع نموذجي", "Equipment:": "المعدات:",
    "General fitness information for demonstration only. It is not individualized medical or professional advice. Check with a qualified professional before starting a new exercise program.": "معلومات لياقة عامة للعرض فقط وليست نصيحة طبية أو مهنية مخصصة. استشر مختصًا مؤهلًا قبل بدء برنامج تمرين جديد.",
    "Join to start this program": "انضم لتبدأ هذا البرنامج",

    /* trainers */
    "Meet the team": "تعرّف على الفريق", "Coaches who": "مدربون", "raise the bar": "يرفعون المستوى",
    "Fictional demo trainers. Replace with your real team and photos.": "مدربون تجريبيون خياليون. استبدلهم بفريقك وصورك الحقيقية.",
    "Karim Hassan": "كريم حسن", "Nour Adel": "نور عادل",
    "Strength & Powerlifting": "القوة ورفع الأثقال", "HIIT, Boxing & Yoga": "هيت وملاكمة ويوغا",
    "Former competitive lifter who loves teaching clean technique and smart progression.": "رباع سابق في المنافسات يحب تعليم الأسلوب السليم والتدرج الذكي.",
    "High-energy coach who builds fun, sweat-soaked sessions for every fitness level.": "مدربة مليئة بالطاقة تصمم جلسات ممتعة ومليئة بالعرق لكل مستويات اللياقة.",

    /* plans */
    "Membership plans": "خطط الاشتراك", "Simple plans,": "خطط بسيطة،", "no surprises": "بدون مفاجآت",
    "Prices are demo placeholders in Egyptian pounds (EGP) that gym owners can customise. No real payment is taken on this site.": "الأسعار تجريبية بالجنيه المصري (EGP) ويمكن لأصحاب الأندية تعديلها. لا يتم سحب أي مبلغ حقيقي في هذا الموقع.",
    "Monthly": "شهري", "Quarterly": "ربع سنوي", "Annual": "سنوي", "Most popular": "الأكثر طلبًا", "Best value": "أفضل قيمة",
    "1 month": "شهر واحد", "3 months": "3 أشهر", "12 months": "12 شهرًا", "EGP": "ج.م", "Demo price": "سعر تجريبي", "Choose Plan": "اختر الخطة",
    "Full gym floor access": "دخول كامل لصالة التمرين", "2 group classes per week": "حصتان جماعيتان أسبوعيًا", "Locker room & showers": "خزائن ودشات", "Free fitness assessment": "تقييم لياقة مجاني",
    "Everything in Monthly": "كل ما في الاشتراك الشهري", "Unlimited group classes": "حصص جماعية غير محدودة", "1 guest pass per month": "دعوة ضيف واحدة شهريًا",
    "Quarterly body-composition check": "فحص ربع سنوي لتركيبة الجسم", "Priority class booking": "أولوية في حجز الحصص",
    "Everything in Quarterly": "كل ما في الاشتراك الربع سنوي", "2 personal-training sessions": "جلستان تدريب شخصي", "Free IRON HOUSE gym bag": "حقيبة IRON HOUSE مجانية",
    "Membership freeze (up to 14 days)": "تجميد الاشتراك (حتى 14 يومًا)", "Members-only events": "فعاليات للأعضاء فقط",
    "Join IRON HOUSE": "انضم إلى IRON HOUSE",
    "Register your interest in a plan. This is a demo: no payment is taken and no real membership is created.": "سجّل اهتمامك بإحدى الخطط. هذا عرض تجريبي: لن يتم سحب أي مبلغ ولن يُنشأ اشتراك حقيقي.",
    "Full name": "الاسم بالكامل", "Email": "البريد الإلكتروني", "Phone number": "رقم الهاتف", "Selected membership plan": "خطة الاشتراك المختارة",
    "e.g. Sara Ali": "مثال: سارة علي", "Submit Registration": "إرسال التسجيل",
    "Details are stored only in this browser (localStorage) so you can see them in the dashboard demo.": "تُحفظ البيانات في هذا المتصفح فقط (localStorage) لتراها في لوحة التحكم التجريبية.",
    "Your": "تم تسجيل طلب اشتراكك (الخطة:", "registration request was recorded as a": ") بصفة", "demo entry": "إدخال تجريبي",
    "in this browser. No payment was taken and no membership has been purchased.": "في هذا المتصفح. لم يتم سحب أي مبلغ ولم يتم شراء أي اشتراك.",
    "See it in the dashboard demo": "شاهده في لوحة التحكم التجريبية",
    "Your browser blocked local storage, so the demo entry could not be saved. Please allow site data and try again.": "المتصفح منع التخزين المحلي، لذلك لم يمكن حفظ الإدخال التجريبي. اسمح ببيانات الموقع وحاول مرة أخرى.",

    /* schedule */
    "Class schedule": "جدول الحصص", "Your week,": "أسبوعك،", "planned": "منظّم",
    "A sample weekly timetable. Filter by day or training type.": "جدول أسبوعي نموذجي. صفّه حسب اليوم أو نوع التمرين.",
    "Filter classes by day": "تصفية الحصص حسب اليوم", "Filter classes by training type": "تصفية الحصص حسب نوع التمرين",
    "All days": "كل الأيام", "All types": "كل الأنواع",
    "Saturday": "السبت", "Sunday": "الأحد", "Monday": "الإثنين", "Tuesday": "الثلاثاء", "Wednesday": "الأربعاء", "Thursday": "الخميس", "Friday": "الجمعة",
    "Sat": "سبت", "Sun": "أحد", "Mon": "اثنين", "Tue": "ثلاثاء", "Wed": "أربعاء", "Thu": "خميس", "Fri": "جمعة",
    "HIIT": "هيت (HIIT)", "Yoga": "يوغا", "Boxing": "ملاكمة", "Join": "انضم",
    "No classes found": "لا توجد حصص", "There are no classes for that day and type. Try another combination.": "لا توجد حصص لهذا اليوم والنوع. جرّب مزيجًا آخر.",
    "Foundation Lifts": "أساسيات الرفع", "Sweat Circuit": "دائرة العرق", "Evening Flow": "يوغا المساء", "Move Better": "تحرّك أفضل",
    "Boxing Fitness 101": "لياقة الملاكمة 101", "Upper Body Power": "قوة الجزء العلوي", "Morning Burn": "حرق الصباح", "Squat Club": "نادي السكوات",
    "Mobility Reset": "إعادة ضبط المرونة", "Kettlebell Basics": "أساسيات الكيتل بيل", "Bag Work Rounds": "جولات كيس الملاكمة", "Tabata Night": "ليلة التاباتا",
    "Sunrise Stretch": "إطالة الشروق", "Deadlift Lab": "معمل الديدلفت", "Athletic Engine": "المحرك الرياضي", "Express 30": "إكسبريس 30",
    "Boxing Conditioning": "تكييف الملاكمة", "Full-Body Strength": "قوة الجسم كاملًا", "Weekend Restore": "استشفاء نهاية الأسبوع", "Family Fitness Fun": "لياقة عائلية ممتعة",

    /* testimonials */
    "Member stories": "قصص الأعضاء", "Real routines,": "روتين حقيقي،", "demo voices": "أصوات تجريبية",
    "Testimonials below are fictional demo profiles written for this portfolio.": "الآراء التالية لشخصيات تجريبية خيالية كُتبت لمعرض الأعمال هذا.",
    "Mariam S.": "مريم س.", "Youssef K.": "يوسف ك.", "Hana R.": "هنا ر.",
    "Demo member": "عضو تجريبي",
    "The coaches explain everything clearly, and the classes keep me coming back. It is the first gym routine I have actually stuck with.": "المدربون يشرحون كل شيء بوضوح، والحصص تجعلني أعود دائمًا. هذا أول روتين رياضي أستمر عليه فعلًا.",
    "Great equipment, a motivating atmosphere and trainers who notice when your form slips. Easy choice for me.": "معدات ممتازة وأجواء محفزة ومدربون ينتبهون عندما يختل أداؤك. كان الاختيار سهلًا بالنسبة لي.",
    "I started with the Beginner Strength program and felt welcome from day one. The schedule fits around my work hours.": "بدأت ببرنامج القوة للمبتدئين وشعرت بالترحيب من اليوم الأول. والجدول يناسب ساعات عملي.",
    "5 out of 5 stars": "5 من 5 نجوم",

    /* CTA */
    "Your first session": "أول جلسة لك", "starts today": "تبدأ اليوم",
    "Choose a plan, pick your first class and let our coaches handle the rest.": "اختر خطة، واختر أول حصة، ودع مدربينا يتولون الباقي.",
    "Choose a Plan": "اختر خطة", "Talk to Us": "تحدث معنا",
    "Rows of dumbbells on racks in a bright modern gym": "صفوف من الدمبل على الحوامل في صالة حديثة مضيئة",

    /* contact */
    "Questions?": "عندك أسئلة؟", "Let's talk": "لنتحدث",
    "Contact details below are placeholders. Swap in the real gym details before launch.": "بيانات التواصل التالية للتجربة فقط. استبدلها ببيانات النادي الحقيقية قبل الإطلاق.",
    "Phone": "الهاتف", "Address": "العنوان", "Opening hours": "مواعيد العمل", "(placeholder)": "(نص مؤقت)",
    "123 Example Street, Your City, Egypt": "123 شارع المثال، مدينتك، مصر",
    "Saturday – Thursday": "السبت – الخميس",
    "Social media": "وسائل التواصل الاجتماعي",
    "Instagram (placeholder link)": "إنستغرام (رابط مؤقت)", "Facebook (placeholder link)": "فيسبوك (رابط مؤقت)", "YouTube (placeholder link)": "يوتيوب (رابط مؤقت)",
    "Send a message": "أرسل رسالة", "Message": "الرسالة", "Your name": "اسمك", "How can we help?": "كيف نساعدك؟", "Send Message": "إرسال الرسالة",
    "Demo form: messages are not sent anywhere because this site has no backend.": "نموذج تجريبي: لا تُرسل الرسائل إلى أي جهة لأن الموقع بلا خادم.",

    /* footer */
    "Strength is built one honest rep at a time. Train hard, recover well, and keep showing up.": "القوة تُبنى تكرارًا صادقًا بعد تكرار. تمرّن بجد، واستشفِ جيدًا، وواصل الحضور.",
    "Explore": "استكشف", "Follow": "تابعنا",
    "IRON HOUSE FITNESS. Fictional brand created for portfolio demonstration.": "IRON HOUSE FITNESS. علامة تجارية خيالية أُنشئت لعرض الأعمال.",
    "Program content is general information, not medical advice. Photos via Unsplash.": "محتوى البرامج معلومات عامة وليس نصيحة طبية. الصور من Unsplash.",

    /* validation */
    "Please enter your full name.": "من فضلك أدخل اسمك بالكامل.",
    "Please enter a valid email address.": "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
    "Please enter a valid phone number (8–15 digits).": "من فضلك أدخل رقم هاتف صحيحًا (من 8 إلى 15 رقمًا).",
    "This field is required.": "هذا الحقل مطلوب.",
    "Please write at least 10 characters.": "من فضلك اكتب 10 أحرف على الأقل.",

    /* ===== dashboard ===== */
    "Overview": "نظرة عامة", "Members": "الأعضاء", "ADMIN DEMO": "لوحة تجريبية",
    "Dashboard navigation": "التنقل في لوحة التحكم", "Open navigation": "فتح القائمة الجانبية",
    "Back to website": "العودة للموقع", "Reset demo data": "إعادة ضبط البيانات التجريبية",
    "A snapshot of memberships and revenue": "لمحة عن الاشتراكات والإيرادات",
    "Search, filter and manage demo members": "ابحث وصفِّ وأدِر الأعضاء التجريبيين",
    "Prices and how many members are on each plan": "الأسعار وعدد الأعضاء في كل خطة",
    "Demonstration dashboard. All members, revenue and plans are fictional sample data stored only in your browser. No real customers or financial transactions.": "لوحة تجريبية. كل الأعضاء والإيرادات والخطط بيانات نموذجية خيالية محفوظة في متصفحك فقط. لا عملاء حقيقيون ولا معاملات مالية فعلية.",
    "Total demo members": "إجمالي الأعضاء التجريبيين", "All registered demo profiles": "كل الملفات التجريبية المسجلة",
    "Active memberships": "الاشتراكات النشطة", "Expiring in 14 days": "تنتهي خلال 14 يومًا", "Follow up to renew": "تابعهم للتجديد", "Nothing urgent": "لا شيء عاجل",
    "Revenue this month": "إيرادات هذا الشهر",
    "Monthly revenue": "الإيرادات الشهرية", "Fictional data": "بيانات خيالية", "Expiring soon": "تنتهي قريبًا", "Next 14 days": "الـ 14 يومًا القادمة",
    "Recent registrations": "أحدث التسجيلات", "View all members": "عرض كل الأعضاء",
    "Bar chart of fictional monthly revenue for the last 12 months": "رسم بياني للإيرادات الشهرية الخيالية لآخر 12 شهرًا",
    "Member": "العضو", "Plan": "الخطة", "Joined": "تاريخ الانضمام", "Status": "الحالة", "Expires": "ينتهي", "Actions": "إجراءات",
    "No registrations yet.": "لا توجد تسجيلات بعد.", "No memberships are expiring in the next 14 days.": "لا توجد اشتراكات تنتهي خلال الـ 14 يومًا القادمة.",
    "Renew": "تجديد", "Search members": "بحث في الأعضاء", "Search by name, email or ID": "ابحث بالاسم أو البريد أو الرقم",
    "Filter by status": "تصفية حسب الحالة", "Filter by plan": "تصفية حسب الخطة", "All statuses": "كل الحالات", "All plans": "كل الخطط",
    "Active": "نشط", "Expiring": "ينتهي قريبًا", "Expired": "منتهٍ", "Pending": "قيد الانتظار", "Frozen": "مجمّد", "Cancelled": "ملغى",
    "Export CSV": "تصدير CSV", "Add member": "إضافة عضو",
    "No members found": "لا يوجد أعضاء", "No one matches your search or filters.": "لا أحد يطابق البحث أو الفلاتر.",
    "There are no members yet. Add one to get started.": "لا يوجد أعضاء بعد. أضف عضوًا للبدء.",
    "Previous page": "الصفحة السابقة", "Next page": "الصفحة التالية",
    "Share": "النسبة", "Duration": "المدة", "Edit price": "تعديل السعر",
    "Changing a price here also updates the public website's plan cards in this browser, a simple preview of what a connected admin panel would do.": "تغيير السعر هنا يحدّث أيضًا بطاقات الخطط في الموقع العام داخل هذا المتصفح، كمعاينة بسيطة لما تفعله لوحة إدارة متصلة بخادم.",
    "Delete member?": "حذف العضو؟", "Delete": "حذف", "Cancel": "إلغاء",
    "Add demo member": "إضافة عضو تجريبي", "Save price": "حفظ السعر", "Price in EGP (demo)": "السعر بالجنيه (تجريبي)",
    "Enter a price between 100 and 100,000 EGP.": "أدخل سعرًا بين 100 و100,000 ج.م.",
    "Reset demo data?": "إعادة ضبط البيانات التجريبية؟", "Reset": "إعادة ضبط",
    "This restores the original sample members and plan prices in this browser, including any demo registrations made on the website.": "سيعيد هذا الأعضاء النموذجيين الأصليين وأسعار الخطط في هذا المتصفح، بما في ذلك أي تسجيلات تجريبية من الموقع.",
    "Demo data was reset.": "تمت إعادة ضبط البيانات التجريبية.",
    "Something went wrong.": "حدث خطأ ما.", "Saved demo data looks damaged.": "البيانات التجريبية المحفوظة تبدو تالفة.",
    "The demo data could not be loaded.": "تعذّر تحميل البيانات التجريبية.",
    "Jan": "يناير", "Feb": "فبراير", "Mar": "مارس", "Apr": "أبريل", "May": "مايو", "Jun": "يونيو", "Jul": "يوليو", "Aug": "أغسطس", "Sep": "سبتمبر", "Oct": "أكتوبر", "Nov": "نوفمبر", "Dec": "ديسمبر",
  };
  const MONTHS = { January: "يناير", February: "فبراير", March: "مارس", April: "أبريل", May: "مايو", June: "يونيو", July: "يوليو", August: "أغسطس", September: "سبتمبر", October: "أكتوبر", November: "نوفمبر", December: "ديسمبر" };
  const PLAN_F = { Monthly: "شهرية", Quarterly: "ربع سنوية", Annual: "سنوية" };

  const T = (s) => { const r = translate(s); return r === null ? s : r; };
  const wk = (n) => (n >= 3 && n <= 10 ? `${n} أسابيع` : `${n} أسبوعًا`);

  /* ---------- Pattern rules for text that contains numbers or names ---------- */
  const PATTERNS = [
    [/^Showing (\d+) of (\d+) demo programs$/, (a, b) => `عرض ${a} من ${b} برنامج تجريبي`],
    [/^(\d+) (?:class|classes) found$/, (a) => `تم العثور على ${a} حصة`],
    [/^(\d+) years experience$/, (a) => `${a} سنة خبرة`],
    [/^(\d+) weeks?$/, (a) => wk(Number(a))],
    [/^(\d+)× \/ week$/, (a) => `${a}× / أسبوع`],
    [/^(\d+)[–-](\d+) min$/, (a, b) => `${a}–${b} دقيقة`],
    [/^(\d+) min$/, (a) => `${a} دقيقة`],
    [/^(\d+) days?$/, (a) => `${a} يومًا`],
    [/^Day (\d)$/, (a) => `اليوم ${a}`],
    [/^Coach (.+)$/, (a) => `الكابتن ${T(a)}`],
    [/^([\d,]+) kcal$/, (a) => `${a} سعرة`],
    [/^(\d+) g$/, (a) => `${a} جم`],
    [/^Your target was raised to a safe minimum of ([\d,]+) kcal\.$/, (a) => `تم رفع هدفك إلى حد أدنى آمن قدره ${a} سعرة.`],
    [/^Protein (\d+)%, carbs (\d+)%, fat (\d+)%$/, (p, c, f) => `بروتين ${p}%، كربوهيدرات ${c}%، دهون ${f}%`],
    [/^Your session with (.+) on (.+) at (.+) was saved as a demo request\. No payment was taken and no confirmation was sent\.$/, (n, d, t) => `تم حفظ جلستك مع ${T(n)} يوم ${T(d)} الساعة ${T(t)} كطلب تجريبي. لم يتم سحب أي مبلغ ولم يُرسل أي تأكيد.`],
    [/^Delete booking for (.+)$/, (n) => `حذف حجز ${n}`],
    [/^Book a session with (.+)$/, (n) => `احجز جلسة مع ${T(n)}`],
    [/^(\d+) bookings?$/, (a) => `${a} حجز`],
    [/^Step (\d+)$/, (a) => `الخطوة ${a}`],
    [/^(Chest|Back|Legs|Shoulders|Arms|Core)\. (.+)$/, (m, t) => `${T(m)}. ${T(t)}`],
    [/^Start (\d+)° · End (\d+)°$/, (a, b) => `البداية ${a}° · النهاية ${b}°`],
    [/^(\d+) sets × (\d+)[–-](\d+) reps$/, (a, b, c) => `${a} مجموعات × ${b}–${c} تكرارًا`],
    [/^Set (\d+) of (\d+)$/, (a, b) => `المجموعة ${a} من ${b}`],
    [/^You finished (\d+) sets in ([\d:]+)\.$/, (a, t) => `أنهيت ${a} مجموعات في ${t}.`],
    [/^Animated illustration of (.+)$/, (a) => `رسم متحرك لتمرين ${T(a)}`],
    [/^“(.+)”$/, (a) => `“${T(a)}”`],
    [/^(.+) training session$/, (a) => `جلسة تدريب ${T(a)}`],
    [/^Portrait-style photo of demo trainer (.+)$/, (a) => `صورة المدرب التجريبي ${T(a)}`],
    [/^(\d+) months? · about ([\d,]+) EGP \/ month$/, (m, p) => `${T(m + (m === "1" ? " month" : " months"))} · حوالي ${p} ج.م / شهر`],
    [/^\/ (.+)$/, (a) => `/ ${T(a)}`],
    [/^(\w+) plan$/, (a) => `خطة ${PLAN_F[a] || T(a)}`],
    [/^([\d,]+ EGP) \((.+)\)$/, (a, b) => `${a} (${T(b)})`],
    [/^Thank you, (.+)!$/, (a) => `شكرًا لك يا ${a}!`],
    [/^Thanks, (.+)! This is a demo form, so your message was not actually sent\. In a real deployment it would go to the gym's inbox\.$/, (a) => `شكرًا يا ${a}! هذا نموذج تجريبي، لذلك لم تُرسل رسالتك فعليًا. في الاستخدام الحقيقي كانت ستصل إلى بريد النادي.`],
    [/^Join (.+) on (\w+): see membership plans$/, (a, d) => `انضم إلى ${T(a)} يوم ${T(d)}: شاهد خطط الاشتراك`],
    [/^(\d+) of (\d+) members$/, (a, b) => `${a} من ${b} عضوًا`],
    [/^Page (\d+) of (\d+)$/, (a, b) => `صفحة ${a} من ${b}`],
    [/^(\d+)% of all members$/, (a) => `${a}% من كل الأعضاء`],
    [/^([+-]?\d+)% vs last month \(fictional\)$/, (a) => `${a}% مقارنة بالشهر الماضي (خيالي)`],
    [/^(\d+) days? left$/, (a) => `باقي ${a} يومًا`],
    [/^expires today$/, () => "ينتهي اليوم"],
    [/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/, (d, m, y) => `${d} ${DICT[m]} ${y}`],
    [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/, (m, y) => `${MONTHS[m]} ${y}`],
    [/^(.+)'s (.+) membership was renewed \(demo\)\.$/, (n, p) => `تم تجديد اشتراك ${n} (${T(p)}) (تجريبي).`],
    [/^(.+) was removed\.$/, (n) => `تمت إزالة ${n}.`],
    [/^(.+) was added \(demo\)\.$/, (n) => `تمت إضافة ${n} (تجريبي).`],
    [/^(.+) price updated to (.+)\.$/, (p, v) => `تم تحديث سعر ${T(p)} إلى ${v}.`],
    [/^Exported (\d+) demo members\.$/, (a) => `تم تصدير ${a} عضوًا تجريبيًا.`],
    [/^Demo only: no reminder was sent to (.+)\.$/, (n) => `تجريبي فقط: لم يتم إرسال أي تذكير إلى ${n}.`],
    [/^(.+) set to (\w+)\.$/, (n, s) => `تم تغيير حالة ${n} إلى ${T(s)}.`],
    [/^Edit (\w+) price$/, (p) => `تعديل سعر ${T(p)}`],
    [/^Set status for (.+)$/, (n) => `تغيير حالة ${n}`],
    [/^Delete (.+)$/, (n) => `حذف ${n}`],
    [/^Send reminder to (.+)$/, (n) => `إرسال تذكير إلى ${n}`],
    [/^(\d+)% of members$/, (a) => `${a}% من الأعضاء`],
    [/^Remove$/, () => "إزالة"],
    [/^from this demo list\? This only affects data in your browser\.$/, () => "من هذه القائمة التجريبية؟ هذا يؤثر فقط على البيانات داخل متصفحك."],
  ];

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  /** Returns the Arabic text for an English string, or null if nothing matched. */
  function translate(str) {
    const key = norm(str);
    if (!key || /^[\d\s,.+%×:–-]*$/.test(key)) return null;
    let out = DICT[key];
    if (out === undefined) {
      for (const [re, fn] of PATTERNS) {
        const m = key.match(re);
        if (m) { out = fn(...m.slice(1)); break; }
      }
    }
    if (out === undefined && key.includes(" · ")) {
      const parts = key.split(" · ").map((p) => T(p));
      if (parts.join(" · ") !== key) out = parts.join(" · ");
    }
    if (out === undefined) out = key;
    const final = out.replace(/\bEGP\b/g, "ج.م").replace(/\bAM\b/g, "ص").replace(/\bPM\b/g, "م");
    return final === key ? null : final;
  }

  /* ---------- Applying translations to the page ---------- */
  const ATTRS = ["placeholder", "alt", "aria-label", "title"];
  const ORIG_TEXT = new WeakMap();
  const ORIG_ATTR = new WeakMap();
  let lang = "en";
  let observer = null;

  function ws(orig) { return [(orig.match(/^\s*/) || [""])[0], (orig.match(/\s*$/) || [""])[0]]; }

  function applyText(node) {
    const orig = ORIG_TEXT.has(node) ? ORIG_TEXT.get(node) : node.nodeValue;
    if (lang === "ar") {
      const t = translate(orig);
      if (t !== null) { ORIG_TEXT.set(node, orig); const [a, b] = ws(orig); node.nodeValue = a + t + b; }
    } else if (ORIG_TEXT.has(node)) { node.nodeValue = orig; }
  }
  function applyAttrs(el) {
    const saved = ORIG_ATTR.get(el) || {};
    ATTRS.forEach((name) => {
      if (!el.hasAttribute(name)) return;
      const orig = name in saved ? saved[name] : el.getAttribute(name);
      if (lang === "ar") {
        const t = translate(orig);
        if (t !== null) { saved[name] = orig; el.setAttribute(name, t); }
      } else if (name in saved) { el.setAttribute(name, saved[name]); }
    });
    if (Object.keys(saved).length) ORIG_ATTR.set(el, saved);
  }
  function walk(root) {
    if (root.nodeType === 3) { applyText(root); return; }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(root.tagName)) return;
    applyAttrs(root);
    root.querySelectorAll("[placeholder],[alt],[aria-label],[title]").forEach(applyAttrs);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (/^(SCRIPT|STYLE)$/.test(n.parentNode.tagName) || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(applyText);
  }

  let titleOrig = document.title;
  let titleSet = "";
  function applyTitle() {
    const whole = translate(titleOrig);
    const next = lang === "ar"
      ? (whole !== null ? whole : titleOrig.split(" | ").map((p) => (/^IRON HOUSE FITNESS$/.test(p) ? p : T(p))).join(" | "))
      : titleOrig;
    if (document.title !== next) { titleSet = next; document.title = next; }
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  const metaOrig = metaDesc ? metaDesc.content : "";

  function setLang(next) {
    lang = next === "ar" ? "ar" : "en";
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
    const root = document.documentElement;
    root.lang = lang; root.dir = lang === "ar" ? "rtl" : "ltr";
    if (lang === "ar" && !document.getElementById("ar-font")) {
      const l = document.createElement("link");
      l.id = "ar-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    walk(document.body);
    applyTitle();
    if (metaDesc) metaDesc.content = lang === "ar" ? T(metaOrig) : metaOrig;
    const btn = document.getElementById("lang-toggle");
    if (btn) { btn.textContent = lang === "ar" ? "English" : "العربية"; btn.lang = lang === "ar" ? "en" : "ar"; btn.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية"); }
    if (observer) observer.takeRecords();
  }

  function init() {
    const btn = document.createElement("button");
    btn.type = "button"; btn.id = "lang-toggle"; btn.className = "lang-toggle";
    btn.addEventListener("click", () => setLang(lang === "ar" ? "en" : "ar"));
    const header = document.querySelector(".header-inner");
    if (header) header.insertBefore(btn, document.getElementById("menu-toggle"));
    else { const bar = document.querySelector(".topbar"); if (bar) bar.insertBefore(btn, bar.querySelector(".badge-demo")); }

    observer = new MutationObserver((records) => {
      if (lang !== "ar") return;
      records.forEach((r) => {
        if (r.type === "childList") r.addedNodes.forEach((n) => { if (n.nodeType === 1 || n.nodeType === 3) walk(n); });
        else if (r.type === "attributes") { const saved = ORIG_ATTR.get(r.target); if (saved) delete saved[r.attributeName]; applyAttrs(r.target); }
      });
      observer.takeRecords();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ATTRS });
    // dashboard changes document.title for each view: remember the new English title
    new MutationObserver(() => {
      if (document.title === titleSet) return;
      titleOrig = document.title;
      if (lang === "ar") applyTitle();
    }).observe(document.querySelector("title"), { childList: true });

    let saved = "en";
    try { saved = localStorage.getItem(KEY) || "en"; } catch (e) { /* ignore */ }
    setLang(saved);
  }

  window.I18N = { setLang, getLang: () => lang, translate, add: (map) => Object.assign(DICT, map) };
  init();
})();
