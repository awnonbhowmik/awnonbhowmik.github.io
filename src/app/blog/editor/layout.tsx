import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Editor | Awnon Bhowmik',
  robots: { index: false, follow: false },
};

export default function BlogEditorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
