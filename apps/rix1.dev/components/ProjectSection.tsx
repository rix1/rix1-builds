import Link from './Link';

const projects = [
  {
    title: '46brew',
    description: 'A coffee timer for the 4:6 brewing method.',
    link: 'https://46brew.app',
    repo: 'http://github.com/rix1/46brew',
  },
  {
    title: 'Nearme',
    description: 'A tool to help you track your lockdown-encounters.',

    link: 'http://nearme.rix1.dev',
    repo: 'https://github.com/rix1/nearme',
  },
  {
    title: 'Auth now',
    description:
      'Together with some friends, we cooked up a simple passwordless authentication service ✨ (not live)',
    link: 'https://github.com/rix1/auth-now',
    repo: 'https://github.com/rix1/auth-now',
  },
  {
    title: 'Feriekolonien.no',
    description:
      'A site for a childrens camp where I cook and play during summer.',
    link: 'https://www.feriekolonien.no',
    repo: 'https://github.com/feriekolonien/site',
  },
  {
    title: 'Plugformac.com',
    description: (
      <span>
        I try my best to give a helping hand out to the awesome people at{' '}
        <a href="https://wulkano.com">Wulkano</a> 💜
      </span>
    ),
    link: 'https://www.plugformac.com',
  },
  {
    title: 'Meeting timer',
    description: 'A stupid tool that wont help you do meetings better.',
    link: 'https://rix1-meeting-timer-kxtvp0psu.now.sh',
    repo: 'https://github.com/rix1/meeting-timer',
  },
  {
    title: 'Gradient mixer',
    description:
      'A simple tool that help you mix a bunch of colors to find nice gradients 💅',
    link: 'http://rix1.github.io/gradient-mixer/',
    repo: 'https://github.com/rix1/gradient-mixer',
  },
];

type ProjectSectionProps = {
  // children: React.ReactNode;
};

const ProjectSection = ({}: ProjectSectionProps) => {
  return (
    <>
      <h2 className="mb-8 text-center text-3xl">Sometimes I make stuff:</h2>
      <div className="grid grid-cols-2 gap-4 text-lg md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="">
            <a href={project.link} className="">
              <h3 className={['', project.link && 'underline'].join(' ')}>
                {project.title}
              </h3>
            </a>
            <h3 className="">{project.description} </h3>
            {project.repo && (
              <Link href={project.repo}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EA5634"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 inline-block align-middle"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                Repository
              </Link>
            )}
          </article>
        ))}
      </div>
    </>
  );
};

export default ProjectSection;
