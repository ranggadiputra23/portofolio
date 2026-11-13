import { getProfile, getProjects, getSkills, getExperiences } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSkills from '@/components/AboutSkills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PortfolioAnimator from '@/components/public/PortfolioAnimator';

export const revalidate = 0; // Dynamic rendering for real-time DB updates

export default async function HomePage() {
  const profile = await getProfile();
  const allProjects = await getProjects();
  const allSkills = await getSkills();
  const allExperiences = await getExperiences();

  // Filter only published items for public view
  const projects = allProjects.filter((p) => p.published !== false);
  const skills = allSkills.filter((s) => s.published !== false);
  const experiences = allExperiences.filter((e) => e.published !== false);

  return (
    <PortfolioAnimator>
      <div className="min-h-screen relative selection:bg-blue-500 selection:text-white dark:selection:bg-sky-400 dark:selection:text-slate-950">
        <Navbar activeSection="hero" />
        <main>
          <Hero profile={profile} />
          <Projects projects={projects} />
          <AboutSkills profile={profile} skills={skills} />
          <Experience experiences={experiences} />
          <Contact profile={profile} />
        </main>
        <Footer profile={profile} />
      </div>
    </PortfolioAnimator>
  );
}
