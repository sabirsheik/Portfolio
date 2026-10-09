import { createFileRoute } from '@tanstack/react-router';
import { HomePage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/')({ head: () => metadata('Full-Stack Engineer & Product Builder', 'Sabir Ali builds scalable web applications, backend systems, and digital products.'), component: HomePage });
