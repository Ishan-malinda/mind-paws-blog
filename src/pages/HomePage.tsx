import { Hero } from '../components/Hero';
import { BlogGrid } from '../components/BlogGrid';
import { FeaturedSection } from '../components/FeaturedSection';
import { DiscoverSection } from '../components/DiscoverSection';
import { NewsletterSection } from '../components/NewsletterSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <BlogGrid />
      <FeaturedSection />
      <DiscoverSection />
      <NewsletterSection />
    </>
  );
}
