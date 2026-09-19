window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p102',
  level: 'B2',
  category: 'jobb',
  title: 'Jobbintervjuet',
  titleUk: 'Співбесіда',
  titleEn: 'The Job Interview',
  summaryUk: 'Аліна, медсестра з України, проходить співбесіду норвезькою: досвід, стрес, запитання до роботодавця.',
  summaryEn: 'Alina, a nurse from Ukraine, has a job interview in Norwegian: experience, stress and questions for the employer.',
  summaryNo: 'Alina, sykepleier fra Ukraina, er på jobbintervju: erfaring, stress og spørsmål til arbeidsgiveren.',
  cover: 6,

  panels: [
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 90, pose: 'hold', s: 0.85 }, { id: 'alina', x: 320, mood: 'happy', s: 0.85 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
      { who: 'maria', no: 'Takk for at du kom. Kan du fortelle litt om deg selv?', uk: 'Дякую, що прийшли. Можете трохи розповісти про себе?', en: 'Thank you for coming. Could you tell me a little about yourself?' },
      { who: 'alina', no: 'Jeg er utdannet sykepleier og har jobbet på sykehus i Ukraina i åtte år.', uk: 'Я медсестра за освітою і вісім років працювала в лікарні в Україні.', en: 'I\'m a trained nurse and have worked in a hospital in Ukraine for eight years.' }
    ]},
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 90, s: 0.85 }, { id: 'alina', x: 320, s: 0.85 }] }, lines: [
      { who: 'maria', no: 'Hvorfor søkte du på denne stillingen?', uk: 'Чому ви подалися на цю посаду?', en: 'Why did you apply for this position?' },
      { who: 'alina', no: 'Jeg ønsker å bruke erfaringen min og samtidig utvikle meg videre.', uk: 'Я хочу використати свій досвід і водночас розвиватися далі.', en: 'I want to use my experience and at the same time develop further.' }
    ]},
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 90, pose: 'hips', s: 0.85 }, { id: 'alina', x: 320, pose: 'hold', s: 0.85 }] }, lines: [
      { who: 'maria', no: 'Hvordan håndterer du stressende situasjoner?', uk: 'Як ви справляєтеся зі стресовими ситуаціями?', en: 'How do you handle stressful situations?' },
      { who: 'alina', no: 'Jeg prøver å holde hodet kaldt, prioritere oppgavene og samarbeide med kollegaene.', uk: 'Намагаюся зберігати холодну голову, розставляти пріоритети й співпрацювати з колегами.', en: 'I try to keep a cool head, prioritise tasks and cooperate with my colleagues.' }
    ]},
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 90, mood: 'surprised', s: 0.85 }, { id: 'alina', x: 320, mood: 'happy', s: 0.85 }] }, lines: [
      { who: 'maria', no: 'Norskkunnskapene dine er imponerende. Hvor lenge har du lært norsk?', uk: 'Ваші знання норвезької вражають. Як довго ви вчите норвезьку?', en: 'Your Norwegian skills are impressive. How long have you been learning Norwegian?' },
      { who: 'alina', no: 'I to år. Jeg har bestått norskprøven og leser aviser hver dag.', uk: 'Два роки. Я склала іспит з норвезької й щодня читаю газети.', en: 'For two years. I\'ve passed the Norwegian test and read newspapers every day.' }
    ]},
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 90, mood: 'happy', s: 0.85 }, { id: 'alina', x: 320, pose: 'hips', s: 0.85 }] }, lines: [
      { who: 'maria', no: 'Har du noen spørsmål til oss?', uk: 'Чи маєте ви запитання до нас?', en: 'Do you have any questions for us?' },
      { who: 'alina', no: 'Hvordan ser en vanlig arbeidsdag ut, og finnes det mulighet for videreutdanning?', uk: 'Який вигляд має звичайний робочий день і чи є можливість підвищення кваліфікації?', en: 'What does a typical working day look like, and is there an opportunity for further training?' }
    ]},
    { art: { bg: 'office', sign: 'INTERVJU', chars: [{ id: 'maria', x: 200, mood: 'grin', pose: 'hold', s: 0.85 }], props: [{ type: 'docs', x: 200, y: 246, front: true }] }, lines: [
      { who: 'maria', no: 'Gode spørsmål! Vi tar kontakt med deg innen fredag.', uk: 'Слушні запитання! Ми зв’яжемося з вами до п’ятниці.', en: 'Good questions! We will get in touch with you by Friday.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 200, mood: 'grin', pose: 'cheer', s: 0.85 }], props: [{ type: 'phone', x: 270, y: 150, front: true }], fx: 'stars' }, lines: [
      { who: 'narrator', no: 'En uke senere ...', uk: 'Через тиждень...', en: 'A week later...' },
      { who: 'alina', no: 'Jeg fikk jobben! Jeg begynner på mandag.', uk: 'Я отримала роботу! Починаю в понеділок.', en: 'I got the job! I start on Monday.' }
    ]}
  ],

  vocab: [
    ['fortelle', 'розповідати', 'tell'], ['utdannet', 'за освітою', 'trained, educated'], ['sykepleier', 'медсестра', 'nurse'],
    ['sykehus', 'лікарня', 'hospital'], ['hvorfor', 'чому', 'why'], ['søkte', 'подалася (на посаду)', 'applied'], ['stillingen', 'посада', 'the position'],
    ['ønsker', 'бажаю', 'wish, want'], ['erfaringen', 'досвід', 'the experience'], ['samtidig', 'водночас', 'at the same time'],
    ['utvikle meg', 'розвиватися', 'develop myself'], ['håndterer', 'справляєтеся', 'handle'], ['stressende', 'стресовий', 'stressful'],
    ['holde hodet kaldt', 'зберігати холодну голову', 'keep a cool head'], ['prioritere', 'розставляти пріоритети', 'prioritise'],
    ['oppgavene', 'завдання', 'the tasks'], ['samarbeide', 'співпрацювати', 'cooperate'], ['norskkunnskapene', 'знання норвезької', 'Norwegian skills'],
    ['imponerende', 'вражаючі', 'impressive'], ['bestått', 'склала (іспит)', 'passed'], ['aviser', 'газети', 'newspapers'],
    ['arbeidsdag', 'робочий день', 'working day'], ['mulighet', 'можливість', 'opportunity'], ['videreutdanning', 'підвищення кваліфікації', 'further training'],
    ['ta kontakt', 'зв’язатися', 'get in touch'], ['innen', 'до (терміну)', 'by, within'], ['fikk jobben', 'отримала роботу', 'got the job']
  ]
});
