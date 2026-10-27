import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";

// Support and Privacy share this frame: the header (with the Support /
// Privacy switch) and the footer stay in place when you switch between them,
// and only the page content changes (animated in template.tsx).
export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubpageHeader />
      {children}
      <Footer />
    </>
  );
}
