import { createFileRoute } from '@tanstack/react-router';
import { StackPage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/stack')({ head: () => metadata('Engineering Stack', 'Explore Sabir Ali’s frontend, backend, database, and system architecture toolkit.'), component: StackPage });
