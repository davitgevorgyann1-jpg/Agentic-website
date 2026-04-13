'use client'

import { AgentType, AgentStatus } from '@/data/agents'
import ParticleDotAgent from './ParticleDotAgent'

interface AgentCharacterProps {
  type: AgentType
  status: AgentStatus
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_PX = { sm: 100, md: 160, lg: 220 }

export default function AgentCharacter({ type, size = 'md' }: AgentCharacterProps) {
  const px = SIZE_PX[size]
  return <ParticleDotAgent type={type} size={px} interactive={false} />
}
