import { createFileRoute } from '@tanstack/react-router';
import { ContactPage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/contact')({ head: () => metadata('Let’s Build Something', 'Contact Sabir Ali for full-stack engineering opportunities and product collaborations.'), component: ContactPage });
