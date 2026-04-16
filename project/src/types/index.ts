export interface Portfolio {
  title: string;
  category: string;
  image: string;
  route: string;
}

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  industry: string;
  eyebrow: string;
  description: string;
  details: string;
  image: string;
  highlights: string[];
  route: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
