export interface Portfolio {
  title: string;
  category: string;
  image: string;
  route: string;
}

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  route: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
