import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage, metadata } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/projects/')({ head: () => metadata('Selected Projects', 'Explore real-time monitoring, forensic analysis, workforce management, and enterprise systems by Sabir Ali.'), component: ProjectsPage });
