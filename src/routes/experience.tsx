import { createFileRoute } from '@tanstack/react-router';
import { ExperiencePage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/experience')({ head: () => metadata('Engineering Experience', 'Explore Sabir Ali’s experience at NACTA, Project Starlit M3, Evoxty, and Upwork.'), component: ExperiencePage });
