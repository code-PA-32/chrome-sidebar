import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../utils/cn'

export const HoverEffect = ({ items, className }: {
  items: {
    title: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-2',
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          target="_blank"
          className="relative group block p-1 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-black/50 block rounded-md"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        </a>
      ))}
    </div>
  )
}

export const Card = ({ className, children }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-md h-full w-full overflow-hidden transition duration-300 hover:bg-black/70' +
        ' bg-lime-500 border border-transparent' +
        '  group-hover:border-black relative z-20',
        className,
      )}
    >
      <div className="relative z-50">
        <div>{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({ className, children }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('text-white font-bold tracking-wide p-4 text-center', className)}>
      {children}
    </h4>
  )
}
