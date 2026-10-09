import { createFileRoute, notFound } from '@tanstack/react-router';
import { CaseStudy, metadata } from '@/components/portfolio/Portfolio';
import { projects } from '@/data/portfolio';
export const Route = createFileRoute('/projects/$slug')({
  beforeLoad: ({ params }) => { if (!projects.some(p => p.slug === params.slug)) throw notFound(); },
  head: ({ params }) => { const p = projects.find(item => item.slug === params.slug); return metadata(p ? `${p.name} — Case Study` : 'Project Not Found', p?.description ?? 'Explore Sabir Ali’s selected engineering projects.'); },
  component: ProjectDetail,
});
function ProjectDetail() { const { slug } = Route.useParams(); return <CaseStudy slug={slug}/>; }
