/**
 * A template re-mounts on every navigation (unlike a layout), which gives each
 * page a light CSS entrance animation without any JS animation library.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="animate-fade-in">
      {children}
    </main>
  );
}
