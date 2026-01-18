import { motion } from 'motion/react'
import React from 'react'

function FlipLink({ children, href }: { children: string, href: string }) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className='relative block overflow-hidden whitespace-nowrap'
    >
      <div>
        {children.split('').map((l, i) => {
          return <motion.span
            className='inline-block'
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' }
            }}
            transition={{
              duration: 0.25,
              delay: 0.025*i,
              ease: "easeInOut"
            }}
            key={i}>{l}</motion.span>
        })}
      </div>
      <div className='absolute inset-0'>
        {children.split('').map((l, i) => {
          return <motion.span
            className='inline-block'
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 }
            }}
            transition={{
              duration: 0.25,
              delay: 0.025*i,
              ease: "easeInOut"
            }}
            key={i}>{l}</motion.span>
        })}
      </div>
    </motion.a>
  )
}

export default FlipLink