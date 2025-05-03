const PATH = 'https://api-back-nj-portfolio.onrender.com'
export const environment = {
  production: false,
  apiSecret: 'a3f8d7e0b2c94f1e6d5a8c2b7e3f9d01a4c6b8d2e5f7a3c9d1e0b4f6a8c2d7',
  apiUrlProviders: [
    { provide: 'PROJECTS_API_URL', useValue: `${PATH}/projects` },
    { provide: 'SKILLS_API_URL', useValue: `${PATH}/skills` },
    { provide: 'PERSONAL_API_URL', useValue: `${PATH}/personal-information` },
    { provide: 'TECHNOLOGY_API_URL', useValue: `${PATH}/technologies` },
    { provide: 'ACADEMIC_API_URL', useValue: `${PATH}/academic` },
    { provide: 'CERTIFICATION_API_URL', useValue: `${PATH}/certifications` },
    { provide: 'CONTACT_API_URL', useValue: `${PATH}/contacts` }
  ]
};
