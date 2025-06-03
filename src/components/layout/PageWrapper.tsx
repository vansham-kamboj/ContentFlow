import type React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function PageWrapper({ children, title, description }: PageWrapperProps) {
  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold mb-2 text-primary-foreground">{title}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </header>
      <main>{children}</main>
    </div>
  );
}
