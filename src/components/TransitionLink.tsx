'use client'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties; 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (onClick) {
      onClick(e);
    }

    const body = document.querySelector('body')
    body?.classList.add('page-transition')
    
    await sleep(650)
    router.push(href)
    await sleep(650)
    
    body?.classList.remove('page-transition')
  }

  return (
    <Link 
        onClick={handleTransition} 
        href={href} 
        {...props} 
    >
        {children}
    </Link>
  )
}

export default TransitionLink