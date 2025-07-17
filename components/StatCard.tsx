'use client'

import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const StatCard = ({
  icon,
  end,
  label,
  suffix = '',
}: {
  icon: React.ReactNode
  end: number
  label: string
  suffix?: string
}) => {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <div className="text-center" ref={ref}>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        {icon}
      </div>
      <div className="text-3xl font-bold">
        {inView ? <CountUp end={end} duration={2} suffix={suffix} /> : 0}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

export default StatCard
