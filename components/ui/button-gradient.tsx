import React from 'react'
import { Button } from '../ui/button'
import { ButtonProps } from '../ui/button'

interface ButtonGradientProps extends ButtonProps {
  children: React.ReactNode
}

export const ButtonGradient = ({ children, ...props }: ButtonGradientProps) => {
  return (
    <Button {...props} className={`relative inline-flex overflow-hidden drop-shadow-lg rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${props.className}`}>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9945FF_0%,#14F195_50%,#9945FF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-50 px-3 py-1 text-sm font-medium uppercase font-mono text-white dark:text-zinc-950 backdrop-blur-3xl">
        {children}
      </span>
    </Button>
  )
}