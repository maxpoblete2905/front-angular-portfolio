const PATH = 'http://3.89.125.201:8080'
export const environment = {
  production: false,
  apiSecret: 'a3f8d7e0b2c94f1e6d5a8c2b7e3f9d01a4c6b8d2e5f7a3c9d1e0b4f6a8c2d7',
  apiUrlProviders: [
    {
      provide: 'PROJECTS_API_URL',
      useValue: `https://3.89.125.201:8080/projects`,
    },
    { provide: 'SKILLS_API_URL', useValue: `https://3.89.125.201:8080/skills` },
    {
      provide: 'PERSONAL_API_URL',
      useValue: `https://3.89.125.201:8080/personal-information`,
    },
    {
      provide: 'TECHNOLOGY_API_URL',
      useValue: `https://3.89.125.201:8080/technologies`,
    },
    {
      provide: 'ACADEMIC_API_URL',
      useValue: `https://3.89.125.201:8080/academic`,
    },
    {
      provide: 'CERTIFICATION_API_URL',
      useValue: `https://3.89.125.201:8080/certifications`,
    },
    {
      provide: 'CONTACT_API_URL',
      useValue: `https://3.89.125.201:8080/contacts`,
    },
  ],
}
