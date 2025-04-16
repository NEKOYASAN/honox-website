import { useState } from 'hono/jsx'

export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={''}>
      <button
        className={
          'flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <svg
          className={'h-5 w-5'}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M4 6h16M4 12h16m-7 6h7' />
        </svg>
      </button>
      <div
        className={
          'absolute top-12 right-0 z-10 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-800'
        }
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <ul className={'flex flex-col p-2'}>
          <li>
            <a
              href='/'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='/about'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              About
            </a>
          </li>
        </ul>
        <div className={'border-t border-gray-200 dark:border-gray-700'} />
        <ul className={'flex flex-col p-2'}>
          <li>
            <a
              href='/docs'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href='/examples'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Examples
            </a>
          </li>
          <li>
            <a
              href='/discussions'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Discussions
            </a>
          </li>
          <li>
            <a
              href='/blog'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href='/community'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Community
            </a>
          </li>
          <li>
            <a
              href='/support'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Support
            </a>
          </li>
          <li>
            <a
              href='/contact'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href='/privacy'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href='/terms'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Terms
            </a>
          </li>
          <li>
            <a
              href='/status'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Status
            </a>
          </li>
          <li>
            <a
              href='/changelog'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Changelog
            </a>
          </li>
          <li>
            <a
              href='/newsletter'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Newsletter
            </a>
          </li>
          <li>
            <a
              href='/sitemap'
              className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
