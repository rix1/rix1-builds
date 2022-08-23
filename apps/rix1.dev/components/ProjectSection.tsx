import Link from './Link';

const projects = [
  {
    title: 'Cabin planner',
    date: 'In progress',
    description:
      'An app for managing resources in large families, FRP if you want.',
    link: 'https://hytta.rix1.dev/',
    repo: 'https://github.com/rix1/rix1-builds/tree/main/apps/cabin-planner',
  },
  {
    title: 'Cabin planner',
    date: 'In progress',
    description:
      'An app for managing resources in large families, FRP if you want.',
    link: 'https://hytta.rix1.dev/',
    repo: 'https://github.com/rix1/rix1-builds/tree/main/apps/cabin-planner',
  },
  {
    title: 'Flow Writer',
    date: 'In progress',
    description: 'A tool for unclear writing, modelled after my messy brain.',
    link: 'https://twitter.com/rix1/status/1510736583154147330',
    repo: 'https://github.com/rix1/rix1-builds/tree/main/apps/flow-writer',
  },
  {
    title: 'Nearme',
    date: '2020',
    description:
      'COVID-19: A tool to help you track your weekly lockdown-encounters.',

    link: 'http://nearme.rix1.dev',
    repo: 'https://github.com/rix1/nearme',
  },
  {
    title: 'Plugformac.com',
    date: '2020 →',
    description: (
      <span>
        I try my best to give a helping hand out to the awesome people at{' '}
        <a href="https://wulkano.com">Wulkano</a> 💜
      </span>
    ),
    link: 'https://www.plugformac.com',
  },
  {
    title: 'Feriekolonien.no',
    date: '2019 →',
    description:
      'A site for a childrens camp where I cook and play during summer.',
    link: 'https://www.feriekolonien.no',
    repo: 'https://github.com/feriekolonien/site',
  },
  {
    title: 'Auth now',
    date: '2019',
    description:
      'Together with some friends, we cooked up a simple passwordless authentication service ✨',
    link: 'https://github.com/rix1/auth-now',
    repo: 'https://github.com/rix1/auth-now',
  },
  {
    title: '46brew',
    date: '2018',
    description: 'A coffee timer for the 4:6 brewing method.',
    link: 'https://46brew.app',
    repo: 'http://github.com/rix1/46brew',
  },
  {
    title: 'Meeting timer',
    date: '2018',
    description: 'A stupid tool that wont help you do meetings better.',
    link: 'https://rix1-meeting-timer-kxtvp0psu.now.sh',
    repo: 'https://github.com/rix1/meeting-timer',
  },
  {
    title: 'Gradient mixer',
    date: '2015',
    description:
      'A simple tool that help you mix a bunch of colors to find nice gradients 💅',
    link: 'http://rix1.github.io/gradient-mixer/',
    repo: 'https://github.com/rix1/gradient-mixer',
  },
];

type ProjectSectionProps = {};

const ProjectSection = ({}: ProjectSectionProps) => {
  return (
    <>
      <h2 className="mb-8 text-center text-3xl">Stuff I build:</h2>
      <div className="grid grid-flow-row grid-cols-2 gap-6 text-lg md:grid-cols-3 lg:grid-rows-3">
        {projects.map((project) => (
          <article key={project.title} className="mb-4 max-w-xs">
            <a href={project.link} className="">
              <h3
                className={[
                  'mr-1 inline-block',
                  project.link && 'underline',
                ].join(' ')}
              >
                {project.title}{' '}
              </h3>
              <span className="rounded-full bg-gray-100 px-2 text-sm text-gray-600">
                {project.date}
              </span>
            </a>
            <h3 className="font-normal text-slate-700">
              {project.description}{' '}
            </h3>
            {project.repo && (
              <div className="self-end">
                <Link href={project.repo}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#db2777"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 inline-block align-middle"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                  Repository
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
};

export default ProjectSection;
