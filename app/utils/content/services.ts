export type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  cta: string;
};

export const services: Service[] = [
  {
    number: '01',
    title: 'Resume Writing',
    tagline: 'A resume that gets your value across.',
    description:
      "Your resume should communicate what you bring, what you've accomplished and why you're a strong fit.",
    bullets: [
      'Resume strategy and positioning',
      'ATS-aware formatting and keywords',
      'Achievement-focused experience writing',
      'Professional summary development',
      'Role-specific tailoring and revisions',
    ],
    cta: 'Build My Resume →',
  },
  {
    number: '02',
    title: 'Interview Coaching',
    tagline: 'Walk into the interview prepared.',
    description:
      'Build stronger answers, sharper examples and the confidence to communicate your experience.',
    bullets: [
      'Mock interview preparation',
      'Role-specific questions',
      'STAR-method storytelling',
      'Answer development and feedback',
      'Offer and salary conversations',
    ],
    cta: 'Prepare for My Interview →',
  },
  {
    number: '03',
    title: 'LinkedIn Optimization',
    tagline: 'Make LinkedIn a career asset.',
    description:
      "Your profile should do more than repeat your resume. It should position you for the opportunities you want.",
    bullets: [
      'Headline and About section',
      'Experience section rewrite',
      'Keyword and profile positioning',
      'Visibility recommendations',
    ],
    cta: 'Optimize My LinkedIn →',
  },
  {
    number: '04',
    title: 'Career Transition',
    tagline: 'Your experience still has value in a new direction.',
    description: "Make your strengths and professional story relevant to the career you're pursuing.",
    bullets: [
      'Industry and career changes',
      'Leadership transitions',
      'Return-to-work positioning',
      'Professional repositioning',
    ],
    cta: 'Plan My Transition →',
  },
  {
    number: '05',
    title: 'Salary Negotiation',
    tagline: 'Prepare to advocate for your value.',
    description:
      'Approach compensation conversations with clearer positioning and a practical plan.',
    bullets: [
      'Offer review and compensation positioning',
      'Negotiation preparation and scripts',
      'Counteroffer strategy',
      'Benefits discussion preparation',
    ],
    cta: 'Prepare to Negotiate →',
  },
];

export const strategicApproachPillars = [
  'Personalized to your target roles',
  'Clear, achievement-focused messaging',
  'Practical job-search support',
  'Consistent positioning across career materials',
];
