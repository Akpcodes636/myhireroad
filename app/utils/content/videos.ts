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
    name: 'Katrina Garcia',
    role: 'Career Services Client',
    outcome: 'Career transformation with My Hire Roads',
    quote:
      'Working with Katherine was a great experience. Her cross-industry expertise and revamp of my resume and LinkedIn profile helped me land a job. Her practical career guidance and personalized support were invaluable. She’s knowledgeable, hands-on, and committed to her clients’ success. I highly recommend!',
  },
  {
    videoId: 'u24Hr6z8hbE',
    name: 'Derrick Hill',
    role: 'Career Services Client',
    outcome: 'Career transformation with My Hire Roads',
    quote:
      "Kathy understood my background and created a clear roadmap for my career goals. Her compassion, patience, and genuine commitment made the experience feel like a  partnership. She strengthened my resume, optimized my LinkedIn profile, and improved my interview skills, leaving me more confident and prepared for my next career step.",
  },
];
