/* ==========================================================
   IRON HOUSE FITNESS — how-to text for every exercise (demo)
   Each entry: [target muscle, also works, steps[], tip]. Every text is
   written as [English, Arabic]; the Arabic is registered with the
   language switcher automatically. General fitness information only.
   ========================================================== */
(function () {
  "use strict";
  const X = (works, also, steps, tip) => ({ works, also, steps, tip });

  const INFO = {
    bench: X(["Chest (pectorals)", "الصدر (العضلات الصدرية)"], ["Front shoulders and triceps", "الأكتاف الأمامية والتراي"], [
      ["Lie on the bench with your feet flat on the floor and grip the bar slightly wider than your shoulders.", "استلقِ على البنش وقدماك ثابتتان على الأرض وأمسك البار بعرض أوسع قليلًا من كتفيك."],
      ["Lower the bar slowly to the middle of your chest.", "أنزل البار ببطء إلى منتصف صدرك."],
      ["Press the bar up until your arms are almost straight, then repeat.", "ادفع البار لأعلى حتى تكاد ذراعاك تستقيمان ثم كرر."]],
      ["Keep your shoulder blades pinched together and never bounce the bar off your chest.", "ثبّت لوحي الكتف معًا ولا ترتدّ بالبار على صدرك."]),
    pushup: X(["Chest (pectorals)", "الصدر (العضلات الصدرية)"], ["Front shoulders, triceps and core", "الأكتاف الأمامية والتراي والبطن"], [
      ["Place your hands slightly wider than your shoulders and keep your body in a straight line.", "ضع يديك أوسع قليلًا من كتفيك وأبقِ جسمك في خط مستقيم."],
      ["Lower your chest toward the floor by bending your elbows.", "اخفض صدرك نحو الأرض بثني مرفقيك."],
      ["Push the floor away until your arms are straight.", "ادفع الأرض بعيدًا حتى تستقيم ذراعاك."]],
      ["Do not let your hips sag or rise.", "لا تدع وركيك يهبطان أو يرتفعان."]),
    pullover: X(["Chest (pectorals)", "الصدر (العضلات الصدرية)"], ["Lats and triceps", "عضلات الظهر العريضة والتراي"], [
      ["Lie on a bench holding one dumbbell above your chest with straight arms.", "استلقِ على البنش وأمسك دمبل واحدًا فوق صدرك بذراعين مستقيمتين."],
      ["Lower it slowly behind your head with a slight bend in your elbows.", "أنزله ببطء خلف رأسك مع ثني بسيط في المرفقين."],
      ["Pull it back over your chest using your chest muscles.", "اسحبه للأمام فوق صدرك بقوة عضلات الصدر."]],
      ["Move in a controlled arc and stop if your shoulders feel pinched.", "تحرك بقوس متحكَّم فيه وتوقف إذا شعرت بضغط في الكتف."]),
    incline: X(["Lower chest", "أسفل الصدر"], ["Shoulders and triceps", "الأكتاف والتراي"], [
      ["Place your hands on a bench or sturdy box and step your feet back.", "ضع يديك على بنش أو صندوق ثابت وأرجع قدميك للخلف."],
      ["Lower your chest toward the edge, keeping your body straight.", "اخفض صدرك نحو الحافة مع إبقاء جسمك مستقيمًا."],
      ["Push back up to the start.", "ادفع للأعلى إلى وضع البداية."]],
      ["The higher the surface, the easier the move. Lower it to make it harder.", "كلما ارتفع السطح كان التمرين أسهل، وكلما انخفض زادت صعوبته."]),
    cablefly: X(["Chest (pectorals)", "الصدر (العضلات الصدرية)"], ["Front shoulders", "الأكتاف الأمامية"], [
      ["Stand with a cable handle in each hand and arms open with a slight bend in the elbows.", "قف وفي كل يد مقبض كابل وذراعاك مفتوحتان مع ثني بسيط في المرفقين."],
      ["Bring your hands together in front of your chest in a hugging motion.", "قرّب يديك أمام صدرك بحركة العناق."],
      ["Pause, then return slowly.", "توقف لحظة ثم عد ببطء."]],
      ["Keep your elbows soft and do not let the weight pull your arms back quickly.", "أبقِ مرفقيك مرنين ولا تدع الوزن يسحب ذراعيك للخلف بسرعة."]),
    deadlift: X(["Lower back and glutes", "أسفل الظهر والأرداف"], ["Hamstrings and lats", "الفخذ الخلفي وعضلات الظهر العريضة"], [
      ["Stand with feet hip-width apart and the bar over your mid-foot.", "قف بقدمين بعرض الحوض والبار فوق منتصف القدم."],
      ["Hinge at the hips, grip the bar and keep your back flat.", "انحنِ من الوركين وأمسك البار وأبقِ ظهرك مسطحًا."],
      ["Drive through your feet and stand tall, then lower the bar with control.", "ادفع بقدميك وقف منتصبًا ثم أنزل البار بتحكم."]],
      ["Keep the bar close to your legs and never round your lower back.", "أبقِ البار قريبًا من ساقيك ولا تقوّس أسفل ظهرك."]),
    row: X(["Back (lats and mid-back)", "الظهر (العضلات العريضة ومنتصف الظهر)"], ["Biceps and rear shoulders", "الباي والأكتاف الخلفية"], [
      ["Hinge forward with a flat back and knees slightly bent.", "انحنِ للأمام بظهر مسطح وركبتين مثنيتين قليلًا."],
      ["Pull the bar toward your lower ribs, squeezing your shoulder blades.", "اسحب البار نحو أسفل أضلاعك مع ضم لوحي الكتف."],
      ["Lower slowly until your arms are straight.", "أنزله ببطء حتى تستقيم ذراعاك."]],
      ["Do not use momentum or lift your torso as you pull.", "لا تستخدم الاندفاع ولا ترفع جذعك أثناء السحب."]),
    pullup: X(["Back (lats)", "الظهر (العضلات العريضة)"], ["Biceps and forearms", "الباي والساعدان"], [
      ["Hang from the bar with hands slightly wider than your shoulders.", "تدلَّ من العقلة ويداك أوسع قليلًا من كتفيك."],
      ["Pull your chest toward the bar by driving your elbows down.", "اسحب صدرك نحو العقلة بدفع مرفقيك للأسفل."],
      ["Lower yourself slowly until your arms are straight.", "انزل ببطء حتى تستقيم ذراعاك."]],
      ["Avoid swinging. If it is too hard, use a band or an assisted machine.", "تجنب التأرجح. وإذا كان صعبًا استخدم حزامًا مطاطيًا أو جهازًا مساعدًا."]),
    pulldown: X(["Back (lats)", "الظهر (العضلات العريضة)"], ["Biceps", "الباي"], [
      ["Sit with your thighs under the pad and grip the bar wide.", "اجلس وفخذاك تحت الوسادة وأمسك البار بقبضة واسعة."],
      ["Pull the bar down to your upper chest while leaning back slightly.", "اسحب البار لأعلى صدرك مع الميل قليلًا للخلف."],
      ["Let the bar rise slowly until your arms are straight.", "دع البار يرتفع ببطء حتى تستقيم ذراعاك."]],
      ["Pull with your elbows, not your hands, and keep your chest up.", "اسحب بمرفقيك لا بيديك وأبقِ صدرك مرفوعًا."]),
    superman: X(["Lower back", "أسفل الظهر"], ["Glutes and rear shoulders", "الأرداف والأكتاف الخلفية"], [
      ["Lie face down with your arms stretched forward.", "استلقِ على بطنك وذراعاك ممدودتان للأمام."],
      ["Lift your arms, chest and legs off the floor at the same time.", "ارفع ذراعيك وصدرك وساقيك عن الأرض في وقت واحد."],
      ["Hold for a second, then lower slowly.", "ثبّت لثانية ثم انزل ببطء."]],
      ["Look at the floor to keep your neck relaxed.", "انظر للأرض لإبقاء رقبتك مسترخية."]),
    squat: X(["Quadriceps (front thighs) and glutes", "الفخذ الأمامي والأرداف"], ["Hamstrings and core", "الفخذ الخلفي والبطن"], [
      ["Stand with feet shoulder-width apart and the bar resting on your upper back.", "قف بقدمين بعرض الكتفين والبار على أعلى ظهرك."],
      ["Sit back and down until your thighs are about parallel to the floor.", "اجلس للخلف وللأسفل حتى يصبح فخذاك موازيين للأرض تقريبًا."],
      ["Push through your whole foot to stand up.", "ادفع بكامل قدمك للوقوف."]],
      ["Keep your knees in line with your toes and your chest up.", "أبقِ ركبتيك في اتجاه أصابع قدميك وصدرك مرفوعًا."]),
    lunge: X(["Quadriceps and glutes", "الفخذ الأمامي والأرداف"], ["Hamstrings and calves", "الفخذ الخلفي والسمانة"], [
      ["Stand tall holding a dumbbell in each hand.", "قف منتصبًا وفي كل يد دمبل."],
      ["Step forward and lower until both knees are bent about 90 degrees.", "اخطُ للأمام وانزل حتى تنثني الركبتان بزاوية 90 درجة تقريبًا."],
      ["Push off the front foot and bring your feet together.", "ادفع بالقدم الأمامية وأعد قدميك معًا."]],
      ["Keep your torso upright and your front knee over your ankle.", "أبقِ جذعك منتصبًا وركبتك الأمامية فوق كاحلك."]),
    glute: X(["Glutes", "الأرداف"], ["Hamstrings and lower back", "الفخذ الخلفي وأسفل الظهر"], [
      ["Lie on your back with knees bent and feet flat.", "استلقِ على ظهرك وركبتاك مثنيتان وقدماك مسطحتان."],
      ["Push through your heels and lift your hips until your body is straight.", "ادفع بكعبيك وارفع وركيك حتى يستقيم جسمك."],
      ["Squeeze your glutes at the top, then lower slowly.", "اضغط أردافك في الأعلى ثم انزل ببطء."]],
      ["Do not arch your lower back at the top.", "لا تقوّس أسفل ظهرك في الأعلى."]),
    calf: X(["Calves", "السمانة"], ["Ankles and feet", "الكاحلان والقدمان"], [
      ["Stand tall with your feet hip-width apart.", "قف منتصبًا وقدماك بعرض الحوض."],
      ["Rise onto your toes as high as you can.", "ارتفع على أصابع قدميك لأقصى حد."],
      ["Pause, then lower your heels slowly.", "توقف لحظة ثم اخفض كعبيك ببطء."]],
      ["Move slowly and do not bounce.", "تحرك ببطء ولا ترتدّ."]),
    goodmorning: X(["Hamstrings and glutes", "الفخذ الخلفي والأرداف"], ["Lower back", "أسفل الظهر"], [
      ["Stand with feet shoulder-width apart and a light bar on your upper back.", "قف بقدمين بعرض الكتفين وبار خفيف على أعلى ظهرك."],
      ["Push your hips back and lean forward with a flat back.", "ادفع وركيك للخلف وانحنِ للأمام بظهر مسطح."],
      ["Squeeze your glutes to return to standing.", "اضغط أردافك للعودة إلى الوقوف."]],
      ["Use a light weight and keep a soft bend in your knees.", "استخدم وزنًا خفيفًا وأبقِ ركبتيك مثنيتين قليلًا."]),
    ohp: X(["Shoulders (deltoids)", "الأكتاف (العضلة الدالية)"], ["Triceps and upper chest", "التراي وأعلى الصدر"], [
      ["Hold the bar at shoulder height with hands just outside your shoulders.", "أمسك البار عند مستوى الكتفين ويداك خارج كتفيك قليلًا."],
      ["Press it straight overhead until your arms are locked out.", "ادفعه فوق رأسك مباشرة حتى تستقيم ذراعاك."],
      ["Lower it back to your shoulders with control.", "أنزله إلى كتفيك بتحكم."]],
      ["Tighten your core and do not lean back.", "شدّ بطنك ولا تميل للخلف."]),
    frontraise: X(["Front shoulders", "الأكتاف الأمامية"], ["Upper chest", "أعلى الصدر"], [
      ["Stand holding dumbbells in front of your thighs.", "قف وأمسك الدمبل أمام فخذيك."],
      ["Raise one or both arms forward to shoulder height.", "ارفع ذراعًا أو الذراعين للأمام حتى مستوى الكتف."],
      ["Lower slowly to the start.", "أنزلهما ببطء إلى وضع البداية."]],
      ["Do not swing your body to lift the weight.", "لا تتأرجح بجسمك لرفع الوزن."]),
    upright: X(["Shoulders and upper traps", "الأكتاف وأعلى عضلة الترابيس"], ["Biceps", "الباي"], [
      ["Hold the weight in front of your thighs with a narrow grip.", "أمسك الوزن أمام فخذيك بقبضة ضيقة."],
      ["Pull it up along your body to chest height, leading with your elbows.", "اسحبه لأعلى بمحاذاة جسمك حتى الصدر مع قيادة المرفقين."],
      ["Lower slowly.", "أنزله ببطء."]],
      ["Stop at chest height to protect your shoulders.", "توقف عند مستوى الصدر لحماية كتفيك."]),
    shrug: X(["Upper trapezius", "أعلى عضلة الترابيس"], ["Forearms", "الساعدان"], [
      ["Stand holding heavy dumbbells at your sides.", "قف وفي يديك دمبل ثقيل بجانبك."],
      ["Lift your shoulders straight up toward your ears.", "ارفع كتفيك مباشرة نحو أذنيك."],
      ["Hold briefly, then lower slowly.", "ثبّت لحظة ثم انزل ببطء."]],
      ["Do not roll your shoulders; move straight up and down.", "لا تدوّر كتفيك، تحرك لأعلى وأسفل فقط."]),
    revfly: X(["Rear shoulders", "الأكتاف الخلفية"], ["Upper back", "أعلى الظهر"], [
      ["Bend forward at the hips with a flat back, dumbbells hanging down.", "انحنِ للأمام من الوركين بظهر مسطح والدمبل متدلٍ."],
      ["Raise your arms out to the sides until they are level with your torso.", "ارفع ذراعيك للجانبين حتى يوازيا جذعك."],
      ["Lower slowly.", "أنزلهما ببطء."]],
      ["Use light weights and squeeze your shoulder blades.", "استخدم أوزانًا خفيفة وضمّ لوحي الكتف."]),
    curl: X(["Biceps", "الباي (العضلة ذات الرأسين)"], ["Forearms", "الساعدان"], [
      ["Stand with dumbbells at your sides, palms facing forward.", "قف والدمبل بجانبك وراحتا يديك للأمام."],
      ["Curl the weights up by bending only your elbows.", "ارفع الأوزان بثني المرفقين فقط."],
      ["Lower slowly to full extension.", "أنزلها ببطء حتى الاستقامة الكاملة."]],
      ["Keep your elbows pinned to your sides and avoid swinging.", "ثبّت مرفقيك بجانبك وتجنب التأرجح."]),
    triceps: X(["Triceps", "التراي (العضلة ثلاثية الرؤوس)"], ["Shoulders", "الأكتاف"], [
      ["Hold one dumbbell overhead with both hands.", "أمسك دمبل واحدًا فوق رأسك بكلتا يديك."],
      ["Bend your elbows to lower it behind your head.", "اثنِ مرفقيك لإنزاله خلف رأسك."],
      ["Straighten your arms to lift it back up.", "افرد ذراعيك لرفعه مرة أخرى."]],
      ["Keep your elbows close to your ears and pointing forward.", "أبقِ مرفقيك قريبين من أذنيك ومتجهين للأمام."]),
    kickback: X(["Triceps", "التراي (العضلة ثلاثية الرؤوس)"], ["Rear shoulders", "الأكتاف الخلفية"], [
      ["Bend forward with a flat back and your upper arm beside your torso.", "انحنِ للأمام بظهر مسطح وذراعك العلوية بجانب جذعك."],
      ["Straighten your elbow to push the dumbbell back.", "افرد مرفقك لدفع الدمبل للخلف."],
      ["Bend slowly to return.", "اثنِ ببطء للعودة."]],
      ["Only your forearm moves; keep the upper arm still.", "الساعد وحده يتحرك، أبقِ الذراع العلوية ثابتة."]),
    dips: X(["Triceps", "التراي (العضلة ثلاثية الرؤوس)"], ["Chest and front shoulders", "الصدر والأكتاف الأمامية"], [
      ["Sit on a bench edge, place your hands beside your hips and slide forward.", "اجلس على حافة بنش وضع يديك بجانب وركيك وتحرك للأمام."],
      ["Bend your elbows to lower your body until they reach about 90 degrees.", "اثنِ مرفقيك لتخفض جسمك حتى زاوية 90 درجة تقريبًا."],
      ["Press up until your arms are straight.", "ادفع للأعلى حتى تستقيم ذراعاك."]],
      ["Keep your back close to the bench and your shoulders down.", "أبقِ ظهرك قريبًا من البنش وكتفيك للأسفل."]),
    pushdown: X(["Triceps", "التراي (العضلة ثلاثية الرؤوس)"], ["Forearms", "الساعدان"], [
      ["Stand facing a cable with your elbows tucked at your sides.", "قف أمام الكابل ومرفقاك ملتصقان بجانبك."],
      ["Push the handle down until your arms are straight.", "ادفع المقبض للأسفل حتى تستقيم ذراعاك."],
      ["Let it rise slowly to chest height.", "دعه يرتفع ببطء حتى مستوى الصدر."]],
      ["Do not lean over the weight; keep your elbows still.", "لا تنحنِ فوق الوزن وأبقِ مرفقيك ثابتين."]),
    situp: X(["Abs (rectus abdominis)", "عضلات البطن (المستقيمة)"], ["Hip flexors", "عضلات ثني الورك"], [
      ["Lie on your back with knees bent and arms crossed on your chest.", "استلقِ على ظهرك وركبتاك مثنيتان وذراعاك متقاطعتان على صدرك."],
      ["Curl your torso up until you are sitting.", "ارفع جذعك للأعلى حتى تجلس."],
      ["Lower back down slowly.", "انزل ببطء."]],
      ["Do not pull on your neck; lead with your chest.", "لا تشد رقبتك، قد الحركة بصدرك."]),
    legraise: X(["Lower abs", "أسفل البطن"], ["Hip flexors", "عضلات ثني الورك"], [
      ["Lie on your back with legs straight and hands by your sides.", "استلقِ على ظهرك وساقاك مستقيمتان ويداك بجانبك."],
      ["Raise your legs until they point to the ceiling.", "ارفع ساقيك حتى تشيرا للسقف."],
      ["Lower them slowly without touching the floor.", "أنزلهما ببطء دون لمس الأرض."]],
      ["Press your lower back into the floor.", "اضغط أسفل ظهرك على الأرض."]),
    crunch: X(["Upper abs", "أعلى البطن"], ["Obliques", "عضلات الخاصرة"], [
      ["Lie on your back with knees bent and hands beside your head.", "استلقِ على ظهرك وركبتاك مثنيتان ويداك بجانب رأسك."],
      ["Lift your shoulders a few centimeters off the floor.", "ارفع كتفيك بضعة سنتيمترات عن الأرض."],
      ["Lower with control.", "انزل بتحكم."]],
      ["Exhale as you lift and keep your chin off your chest.", "ازفر أثناء الرفع وأبقِ ذقنك بعيدًا عن صدرك."]),
    climber: X(["Abs and core", "البطن والجذع"], ["Shoulders and hip flexors", "الأكتاف وعضلات ثني الورك"], [
      ["Start in a high plank with hands under your shoulders.", "ابدأ بوضع البلانك العالي ويداك تحت كتفيك."],
      ["Drive one knee toward your chest, then switch legs quickly.", "اسحب ركبة نحو صدرك ثم بدّل الساقين بسرعة."],
      ["Keep your hips level and breathe steadily.", "أبقِ وركيك مستويين وتنفس بانتظام."]],
      ["Do not let your hips bounce up.", "لا تدع وركيك يقفزان للأعلى."]),
    kneeraise: X(["Lower abs", "أسفل البطن"], ["Hip flexors and forearms", "عضلات ثني الورك والساعدان"], [
      ["Hang from a bar with arms straight.", "تدلَّ من العقلة بذراعين مستقيمتين."],
      ["Raise your knees toward your chest.", "ارفع ركبتيك نحو صدرك."],
      ["Lower slowly without swinging.", "انزل ببطء دون تأرجح."]],
      ["Tilt your pelvis up at the top to feel your abs work.", "اقلب حوضك للأعلى في القمة لتشعر بعمل البطن."]),
  };

  // register every Arabic text with the language switcher
  const map = {};
  Object.values(INFO).forEach((x) => {
    [x.works, x.also, x.tip].concat(x.steps).forEach(([en, ar]) => { map[en] = ar; });
  });
  if (window.I18N && I18N.add) I18N.add(map);

  IH.EXERCISE_INFO = INFO;
})();
