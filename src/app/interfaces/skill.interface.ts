export interface SkillCategory {
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
