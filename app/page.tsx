import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveStats from "@/components/LiveStats";
import Story from "@/components/Story";
import FeaturedOn from "@/components/FeaturedOn";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Story />
        <LiveStats />
      </main>
      <FeaturedOn />
      <Footer />
    </>
  );
}
