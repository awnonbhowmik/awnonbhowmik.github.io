import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications | Awnon Bhowmik',
  description:
    'Peer-reviewed articles and preprints by Awnon Bhowmik across cryptography, cybersecurity, epidemiology, environmental science, and applied mathematics.',
  alternates: { canonical: '/publications' },
  openGraph: {
    title: 'Publications | Awnon Bhowmik',
    description:
      'Peer-reviewed articles and preprints across cryptography, cybersecurity, epidemiology, environmental science, and applied mathematics.',
    url: '/publications',
    type: 'website',
  },
};

export default function PublicationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
