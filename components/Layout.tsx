import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Main } from '@/components/Main';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-teal-100 min-h-screen mx-auto w-full">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
