/* ============================================================
   Фотографии сайта (ИИ-заглушки до получения фото от клиента).
   Каждая запись: p — описание (на английском, так генератор
   понимает лучше), w/h — размер, s — seed (число, чтобы картинка
   всегда была одна и та же), k — вид (scene / portrait / interior).
   Общий стиль для всех фото задаётся в PHOTO_STYLES — поэтому
   все картинки получаются в одной гамме.
   Сайт сначала ищет файл img/photos/<ключ>.jpg, а если его нет —
   генерирует картинку через image.pollinations.ai.
   Совет: у людей всегда указывайте цвет волос (dark brown hair и т. п.),
   иначе из-за сиреневой гаммы генератор красит волосы в фиолетовый.
   ============================================================ */

window.PHOTO_STYLES = {
  scene: 'photorealistic professional photo, bright airy modern pediatric clinic, soft natural daylight, natural skin tones and natural hair colors, soft lilac and lavender accents in clothing, textiles and interior details, gentle calm mood, high detail',
  portrait: 'professional headshot portrait, white medical coat, plain soft lavender studio background, soft even studio light, looking at camera, warm friendly smile, photorealistic, natural skin texture, high detail',
  interior: 'interior photography of a bright modern pediatric clinic, white walls with soft lilac and purple accents, natural daylight, clean and cozy, no people, photorealistic, wide angle, high detail',
  banner: 'wide cinematic banner composition, the subject is placed in the right half of the frame, the left half is an empty plain soft lavender wall with gentle light and free space for text, natural skin tones and natural hair colors, soft lilac and lavender accents, pastel palette, photorealistic, professional photography, high detail'
};

window.PHOTOS = {
  /* --- главный слайдер (в img/photos лежат настоящие фото от клиента,
         описания ниже — запасной вариант, если файлы удалить) --- */
  'hero-newborn':   { p: 'newborn baby sleeping peacefully wrapped in a soft lilac knitted blanket, tiny hands near the face, close-up', w: 1024, h: 680, s: 101, k: 'scene' },
  'hero-uzi':       { p: 'woman doctor with dark brown hair in a bun performing an ultrasound scan on a toddler lying on an examination couch, holding the ultrasound transducer on the child tummy, ultrasound machine with a grayscale scan on the monitor, mother with light brown hair sitting nearby', w: 1024, h: 680, s: 1102, k: 'scene' },
  'hero-premature': { p: 'gentle woman doctor holding a tiny premature newborn baby in her hands in a bright neonatal room, tenderness and care', w: 1024, h: 680, s: 103, k: 'scene' },
  'hero-program':   { p: 'young mother holding a baby at a pediatrician appointment, woman doctor listening to the baby with a stethoscope, warm smiles', w: 1024, h: 680, s: 104, k: 'scene' },

  /* --- карточки услуг на главной --- */
  'svc-doctors':   { p: 'friendly woman pediatrician examining a happy laughing child with a stethoscope', w: 640, h: 400, s: 201, k: 'scene' },
  'svc-uzi':       { p: 'close-up of a modern medical ultrasound scanner cart with a monitor showing a grayscale ultrasound scan and a transducer probe, in a bright clinic room, no people', w: 640, h: 400, s: 1202, k: 'scene' },
  'svc-premature': { p: 'tiny premature newborn baby feet held in the palms of a doctor, macro', w: 640, h: 400, s: 203, k: 'scene' },
  'svc-vaccine':   { p: 'nurse with light brown hair in a white uniform preparing a small syringe, calm toddler with dark hair sitting on the lap of a mother with blonde hair, bright clinic room', w: 640, h: 400, s: 1204, k: 'scene' },
  'svc-programs':  { p: 'top view of a lilac desk with a smartphone showing a messenger chat, a stethoscope, a small teddy bear and a notebook, no people', w: 640, h: 400, s: 1205, k: 'scene' },
  'svc-nurse':     { p: 'nurse with dark brown hair in a white uniform gently consulting a young mother with light brown hair who is holding a newborn, cozy bright room', w: 640, h: 400, s: 1206, k: 'scene' },

  /* --- врачи (портреты) --- */
  'doc-sedova':       { p: 'portrait of a 50-year-old Eastern European woman chief pediatrician, short dark blonde hair, confident kind expression', w: 512, h: 640, s: 301, k: 'portrait' },
  'doc-ponikarova':   { p: 'portrait of a 46-year-old Eastern European woman pediatrician, light brown hair in a neat bun', w: 512, h: 640, s: 302, k: 'portrait' },
  'doc-ponikarov':    { p: 'portrait of a 48-year-old Eastern European man orthopedic doctor, short grey hair, neat short beard', w: 512, h: 640, s: 303, k: 'portrait' },
  'doc-vermenich':    { p: 'portrait of a 37-year-old Eastern European woman pediatric surgeon, dark hair tied back', w: 512, h: 640, s: 304, k: 'portrait' },
  'doc-seitmemetova': { p: 'portrait of a 40-year-old woman ultrasound doctor, dark wavy shoulder-length hair, dark eyes', w: 512, h: 640, s: 305, k: 'portrait' },
  'doc-kuts':         { p: 'portrait of a 45-year-old Eastern European woman ENT doctor, chestnut shoulder-length hair', w: 512, h: 640, s: 306, k: 'portrait' },
  'doc-voropaev':     { p: 'portrait of a 42-year-old Eastern European man pediatric surgeon, dark short hair, clean-shaven', w: 512, h: 640, s: 307, k: 'portrait' },
  'doc-mefaeva':      { p: 'portrait of a 35-year-old woman ophthalmologist, long dark hair, thin glasses', w: 512, h: 640, s: 308, k: 'portrait' },
  'doc-esatova':      { p: 'portrait of a 33-year-old woman ophthalmologist, dark straight hair, gentle smile', w: 512, h: 640, s: 309, k: 'portrait' },
  'doc-sidametova':   { p: 'portrait of a 36-year-old woman orthopedic doctor, dark hair in a low ponytail', w: 512, h: 640, s: 310, k: 'portrait' },
  'doc-dedkova':      { p: 'portrait of a 40-year-old Eastern European woman neurologist, blonde bob haircut', w: 512, h: 640, s: 311, k: 'portrait' },
  'doc-mizinova':     { p: 'portrait of a 45-year-old Eastern European woman nurse in a lilac medical uniform, light brown hair, kind face', w: 512, h: 640, s: 312, k: 'portrait' },
  'doc-khomenko':     { p: 'portrait of a 47-year-old Eastern European woman nurse in a lilac medical uniform, dark blonde hair, warm smile', w: 512, h: 640, s: 313, k: 'portrait' },

  /* --- полезное (статьи) --- */
  'news-1': { p: 'newborn baby checkup, woman pediatrician measuring a baby on a scale in a bright office', w: 640, h: 440, s: 401, k: 'scene' },
  'news-2': { p: 'doctor with dark brown hair performing echocardiography on a newborn baby lying on a couch, small ultrasound transducer on the baby chest, monitor with a heart ultrasound image', w: 640, h: 440, s: 1402, k: 'scene' },
  'news-3': { p: 'vaccination calendar, vaccine vial and syringe on a lilac desk with a small teddy bear', w: 640, h: 440, s: 403, k: 'scene' },
  'news-4': { p: 'child neurologist with dark brown hair in a white coat checking the reflexes of a smiling baby lying on an examination couch, small reflex hammer', w: 640, h: 440, s: 1404, k: 'scene' },

  /* --- галерея клиники --- */
  'gal-reception': { p: 'reception desk with purple hummingbird logo on the wall, waiting area with lilac armchairs', w: 1024, h: 680, s: 501, k: 'interior' },
  'gal-office':    { p: 'pediatrician consulting room with a changing table, scale and toys', w: 800, h: 600, s: 502, k: 'interior' },
  'gal-uzi':       { p: 'ultrasound diagnostic room with an expert-class ultrasound machine and a couch', w: 800, h: 600, s: 503, k: 'interior' },
  'gal-play':      { p: 'children play corner with soft lilac cushions, wooden toys and books', w: 800, h: 600, s: 504, k: 'interior' },
  'gal-treatment': { p: 'treatment room with a vaccination fridge, medical cabinet and a couch', w: 800, h: 600, s: 505, k: 'interior' },
  'gal-corridor':  { p: 'clinic corridor with doors to consulting rooms, hummingbird decor on the walls', w: 800, h: 600, s: 506, k: 'interior' },

  /* --- о клинике / команда --- */
  'about-team': { p: 'group photo of a medical team of four women and one man in white coats standing together in a bright clinic hall, dark brown, light brown and blonde hair, friendly smiles', w: 800, h: 600, s: 1601, k: 'scene' },

  /* --- обложки внутренних страниц --- */
  'page-uslugi':   { p: 'woman pediatrician playing with a toddler during a check-up, toy in hand, bright office', w: 800, h: 500, s: 701, k: 'scene' },
  'page-uzi':      { p: 'doctor doing ultrasound examination to a calm newborn baby, screen with ultrasound image', w: 800, h: 500, s: 702, k: 'scene' },
  'page-ceny':     { p: 'young mother with light brown hair holding a baby, talking to a smiling administrator with dark hair at a white clinic reception desk', w: 800, h: 500, s: 1703, k: 'scene' },
  'page-about':    { p: 'entrance of a small modern clinic building with a purple hummingbird sign, flowers, sunny day', w: 800, h: 500, s: 704, k: 'scene' },
  'page-poleznoe': { p: 'mother reading a book with a baby on her lap in a cozy bright room', w: 800, h: 500, s: 705, k: 'scene' },
  'page-kontakty': { p: 'friendly administrator with dark brown hair in a white blouse at a clinic reception desk with a phone and a computer, bright hall', w: 800, h: 500, s: 1706, k: 'scene' },


  /* --- широкие баннеры внутренних страниц: настоящие фото клиента, лежат в img/photos (описания — запасной вариант) --- */
  'ban-vrachi':   { p: 'smiling woman pediatrician with short blonde hair in a white coat holding a newborn baby, bright clinic room', w: 1600, h: 1200, s: 901, k: 'scene' },
  'ban-uslugi':   { p: 'baby lying on a white clinic bed with a teddy bear, nurse in the background, bright children ward', w: 1600, h: 1200, s: 903, k: 'scene' },
  'ban-uzi':      { p: 'woman doctor performing an ultrasound examination of a calm baby, ultrasound machine', w: 1600, h: 1200, s: 905, k: 'scene' },
  'ban-ceny':     { p: 'smiling woman pediatrician with brown hair holding a swaddled newborn in a bright clinic room', w: 1600, h: 1200, s: 907, k: 'scene' },
  'ban-poleznoe': { p: 'happy baby lying on a knitted blanket with a teddy bear, warm home light', w: 1600, h: 1200, s: 909, k: 'scene' },
  'ban-kontakty': { p: 'adult hand gently sheltering a sleeping newborn baby, close-up, tenderness', w: 1600, h: 1200, s: 911, k: 'scene' },
  'ban-about':    { p: 'tiny premature newborn sleeping in the palms of a doctor in a neonatal unit', w: 1600, h: 1200, s: 913, k: 'scene' },

  /* --- направления (страница услуг) --- */
  'dir-pediatr':       { p: 'woman pediatrician with dark brown hair in a white coat listening to a baby chest with a stethoscope, baby lying on a changing table', w: 512, h: 512, s: 1801, k: 'scene' },
  'dir-premature':     { p: 'tiny premature baby wearing a lilac hat sleeping in a warm cot', w: 512, h: 512, s: 802, k: 'scene' },
  'dir-ortoped':       { p: 'orthopedic doctor examining the legs and hips of a baby lying on a couch', w: 512, h: 512, s: 803, k: 'scene' },
  'dir-surgeon':       { p: 'pediatric surgeon gently examining the tummy of a smiling toddler', w: 512, h: 512, s: 804, k: 'scene' },
  'dir-neurolog':      { p: 'child neurologist with light brown hair in a white coat holding the hand of a baby lying on a couch and checking reflexes', w: 512, h: 512, s: 1805, k: 'scene' },
  'dir-ophthalmo':     { p: 'ophthalmologist with dark brown hair in a white coat examining the eyes of a small child with a small flashlight', w: 512, h: 512, s: 1806, k: 'scene' },
  'dir-lor':           { p: 'ENT doctor with dark brown hair in a white coat looking into the ear of a child with dark hair using an otoscope', w: 512, h: 512, s: 1807, k: 'scene' },
  'dir-uzd':           { p: 'doctor with dark brown hair holding an ultrasound transducer on the tummy of a toddler lying on a couch, ultrasound monitor beside', w: 512, h: 512, s: 1808, k: 'scene' },
  'dir-logoped':       { p: 'speech therapist doing articulation exercises with a child in front of a mirror', w: 512, h: 512, s: 809, k: 'scene' },
  'dir-psycholog':     { p: 'child psychologist talking to a child at a table with drawings', w: 512, h: 512, s: 810, k: 'scene' },
  'dir-nurse':         { p: 'nurse with light brown hair in a white uniform taking care of a newborn baby on a changing table', w: 512, h: 512, s: 1811, k: 'scene' },
  'dir-breastfeeding': { p: 'lactation consultant helping a mother to breastfeed a newborn', w: 512, h: 512, s: 812, k: 'scene' }
};

/* Адрес картинки в генераторе (одинаковый в браузере и в скрипте скачивания) */
window.photoUrl = function (key) {
  var ph = window.PHOTOS[key];
  if (!ph) return '';
  var prompt = ph.p + ', ' + window.PHOTO_STYLES[ph.k];
  return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt) +
    '?width=' + ph.w + '&height=' + ph.h + '&seed=' + ph.s + '&nologo=true';
};
