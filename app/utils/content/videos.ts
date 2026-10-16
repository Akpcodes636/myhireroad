export type Video = {
  id: string;
  title: string;
  desc: string;
  featured: boolean;
};

export const founderVideoId = 'bW3UiBnULDM';

export const careerInsightVideos: Video[] = [
  {
    id: 'bW3UiBnULDM',
    title: 'Meet Katherine Fasanella — Founder of My Hire Roads',
    desc: 'Katherine shares her mission and how My Hire Roads helps professionals position themselves for better opportunities.',
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

export const testimonials: Testimonial[] = [
  {
    videoId: '--BHdcbcBnM',
    name: 'Client Testimonial',
    role: 'Career Services Client',
    outcome: 'Career transformation with My Hire Roads',
    quote:
      'Katherine completely reframed how I talked about my experience. I went from generic to compelling.',
  },
  {
    videoId: 'u24Hr6z8hbE',
    name: 'Client Testimonial',
    role: 'Career Services Client',
    outcome: 'Career transformation with My Hire Roads',
    quote:
      "I had the skills but couldn't explain why they mattered. My Hire Roads helped me make that connection.",
  },
];
