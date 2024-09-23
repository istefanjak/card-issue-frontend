import { FC, ReactNode } from 'react';

type PageLayoutProps = {
  title: string;
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <article className="prose w-full">
      <h1 className="text-center">{title}</h1>
      <div className='flex flex-col gap-5 items-center'>
        {children}
      </div>
    </article>
  );
};

export default PageLayout;
