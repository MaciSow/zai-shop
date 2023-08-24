import React, { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  text: MDXRemoteSerializeResult;
}

export const CustomMarkdown = ({ text }: Props) => {
  const getLinkComponent = ({ href, ...rest }: ComponentProps<'a'>): ReactNode => {
    if (!href) {
      return <a {...rest} />;
    }

    if (href.search('http') !== -1) {
      return <a {...rest} href={href} rel="noopener noreferrer" />;
    }

    return <Link href={href}>{rest.children}</Link>;
  };

  return (
    <article className="prose lg:prose-xl">
      <MDXRemote {...text} components={{ a: getLinkComponent }} />
    </article>
  );
};
