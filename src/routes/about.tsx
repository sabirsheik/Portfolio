import { createFileRoute } from '@tanstack/react-router';
import { AboutPage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/about')({ head: () => metadata('The Engineering Mindset', 'Meet Sabir Ali and explore his full-stack engineering approach and product development philosophy.'), component: AboutPage });
