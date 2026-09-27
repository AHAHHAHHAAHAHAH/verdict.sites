// ClimaVerdict quiz: what you need (the type), then which situation is yours. The second
// question is built from each category's needs, so it always says what the page says.
import type { QuizDef, T } from '../../lib/pack';
import { needSteps } from '../../lib/quiz-needs';
import { addLanguages } from '../../lib/translate';
import { catalog } from './catalog';
import { site } from './config';
import { en } from './i18n-en';

const needQuestion: T = addLanguages({ it: 'Qual è la tua esigenza?', fr: 'Quel est votre besoin ?', es: '¿Qué necesitas exactamente?', de: 'Was brauchst du genau?', pl: 'Czego dokładnie potrzebujesz?' }, { en }, ['en'], 'it');
const byNeed = needSteps(catalog, needQuestion, site.markets);

export const quiz = {
  steps: addLanguages([
    {
      id: 'type',
      title: { it: 'Cosa ti serve?', fr: 'De quoi avez-vous besoin ?', es: '¿Qué necesitas?', de: 'Was brauchst du?', pl: 'Czego potrzebujesz?' },
      layout: 'grid',
      options: [
        {
          value: 'heat',
          icon: 'heat',
          next: 'heat-q',
          label: {
            it: 'Scaldare una stanza fredda',
            fr: 'Chauffer une pièce froide',
            es: 'Calentar una habitación fría',
            de: 'Einen kalten Raum heizen',
            pl: 'Ogrzać zimny pokój',
          },
        },
        {
          value: 'dehum',
          icon: 'dehum',
          next: 'dehum-q',
          markets: ['it', 'fr', 'es', 'de'],
          label: {
            it: 'Togliere umidità e muffa',
            fr: 'Chasser l’humidité et la moisissure',
            es: 'Quitar humedad y moho',
            de: 'Feuchtigkeit und Schimmel loswerden',
            pl: 'Pozbyć się wilgoci i pleśni',
          },
        },
        {
          value: 'purifier',
          icon: 'purifier',
          next: 'purifier-q',
          label: {
            it: 'Aria più pulita (allergie, animali)',
            fr: 'Un air plus propre (allergies, animaux)',
            es: 'Aire más limpio (alergias, mascotas)',
            de: 'Sauberere Luft (Allergien, Haustiere)',
            pl: 'Czystsze powietrze (alergie, zwierzęta)',
          },
        },
        {
          value: 'ac',
          icon: 'ac',
          next: 'ac-q',
          label: {
            it: 'Rinfrescare una stanza d’estate',
            fr: 'Rafraîchir une pièce en été',
            es: 'Refrescar una habitación en verano',
            de: 'Einen Raum im Sommer kühlen',
            pl: 'Schłodzić pokój latem',
          },
        },
      ],
    },
    ...byNeed.steps,
  ], { en }, ['en'], 'it'),
  results: byNeed.results,
  carry: byNeed.carry,
} satisfies QuizDef;
