export interface SkillCategory {
  id: string
  name: string
  icon: string
  skills: Skill[]
}

export interface Skill {
  icon: string
  title: string
  description: string
  technologies: Technology[]
}

export interface Technology {
  name: string
  url: string
}
