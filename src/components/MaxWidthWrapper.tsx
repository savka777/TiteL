'use client'; // Ensure that the componenet is treated as a client component
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  //An optional string that allows you to pass additional CSS classes to customize the styling of the div.
  className,
  //The content to be rendered inside the MaxWidthWrapper. This could be any valid React nodes, such as elements, text, or other components.
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2 md:px-20', className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
