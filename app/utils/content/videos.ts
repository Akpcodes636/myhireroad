export type Video = {
  id: string;
  title: string;
  desc: string;
  featured: boolean;
};

// Replace placeholder IDs with real YouTube video IDs before launch
export const careerInsightVideos: Video[] = [
  {
    id: 'PLACEHOLDER_ID_1',
    title: 'How to Position Your Resume for Success',
    desc: 'Katherine walks through the key elements that make a resume stand out to hiring managers.',
    featured: true,
  },
  {
    id: 'PLACEHOLDER_ID_2',
    title: 'Interview Preparation Essentials',
    desc: 'Common interview questions and how to structure your answers using the STAR method.',
    featured: false,
  },
  {
    id: 'PLACEHOLDER_ID_3',
    title: 'LinkedIn Profile Optimization Tips',
    desc: 'Making your LinkedIn profile work harder for your job search.',
    featured: false,
  },
];

export type Testimonial = {
  videoId: string;
  name: string;
  role: string;
  outcome: string;
  quote: string;
};

// Replace placeholder IDs with real client testimonial video IDs before launch
export const testimonials: Testimonial[] = [
  {
    videoId: 'PLACEHOLDER_ID_A',
    name: 'Sarah M.',
    role: 'Marketing Director',
    outcome: 'Landed a VP role within 6 weeks',
    quote:
      'Katherine completely reframed how I talked about my experience. I went from generic to compelling.',
  },
  {
    videoId: 'PLACEHOLDER_ID_B',
    name: 'James T.',
    role: 'Operations Manager',
    outcome: 'Transitioned into a new industry',
    quote:
      "I had the skills but couldn't explain why they mattered in a new field. My Hire Roads helped me make that connection.",
  },
  {
    videoId: 'PLACEHOLDER_ID_C',
    name: 'Priya K.',
    role: 'Finance Professional',
    outcome: 'Negotiated a 22% salary increase',
    quote:
      "I didn't realize how much I was leaving on the table. The negotiation coaching gave me the confidence to ask.",
  },
];
