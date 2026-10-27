// Remounts on every switch between Support and Privacy, so the new page
// content glides in (the .page-enter animation in globals.css) while the
// header and footer stay put. Pure CSS: the content shows even before the
// page's script has loaded, and without it.
export default function InfoTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter flex flex-1 flex-col">{children}</div>;
}
