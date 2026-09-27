// FloorVerdict quiz: what you need (the type), then which situation is yours. The second
// question is built from each category's needs, so it always says what the page says.
import type { QuizDef, T } from '../../lib/pack';
import { needSteps } from '../../lib/quiz-needs';
import { addLanguages } from '../../lib/translate';
import { catalog } from './catalog';
import { site } from './config';
import { en } from './i18n-en';

const needQuestion: T = addLanguages({ it: 'Qual è la tua esigenza?', fr: 'Quel est votre besoin ?', es: '¿Qué necesitas exactamente?', pl: 'Czego dokładnie potrzebujesz?', sv: 'Vad behöver du?'  }, { en }, ['en'], 'it');
const byNeed = needSteps(catalog, needQuestion, site.markets);

export const quiz = {
  steps: addLanguages([
    {
      id: 'type',
      title: { it: 'Cosa cerchi?', fr: 'Que cherchez-vous ?', es: '¿Qué buscas?', pl: 'Czego szukasz?', sv: 'Vad letar du efter?' },
      layout: 'grid',
      options: [
        {
          value: 'robot',
          icon: 'robot',
          next: 'robot-q',
          label: { it: 'Un robot che pulisce da solo', fr: 'Un robot qui nettoie tout seul', es: 'Un robot que limpia solo', pl: 'Robota, który sprząta sam', sv: 'En robot som städar själv' },
        },
        {
          value: 'stick',
          icon: 'stick',
          next: 'stick-q',
          label: { it: 'Una scopa elettrica senza fili', fr: 'Un aspirateur balai sans fil', es: 'Una aspiradora sin cable', pl: 'Odkurzacz bezprzewodowy', sv: 'En sladdlös skaftdammsugare' },
        },
        {
          value: 'wet',
          icon: 'wet',
          next: 'wet-q',
          markets: ['it', 'fr', 'es', 'pl'],
          label: {
            it: 'Una lavapavimenti (aspira e lava)',
            fr: 'Un aspirateur laveur (aspire et lave)',
            es: 'Una aspiradora fregona (aspira y friega)',
            pl: 'Odkurzacz myjący (odkurza i myje)',
            sv: 'En dammsugare som moppar',
          },
        },
        {
          value: 'steam',
          icon: 'steam',
          next: 'steam-q',
          markets: ['it', 'fr', 'pl', 'se'],
          label: {
            it: 'Una scopa a vapore (senza detersivi)',
            fr: 'Un balai vapeur (sans détergent)',
            es: 'Una mopa de vapor (sin detergentes)',
            pl: 'Mop parowy (bez detergentów)',
            sv: 'En ångmopp (utan rengöringsmedel)',
          },
        },
      ],
    },
    ...byNeed.steps,
  ], { en }, ['en'], 'it'),
  results: byNeed.results,
  carry: byNeed.carry,
} satisfies QuizDef;
