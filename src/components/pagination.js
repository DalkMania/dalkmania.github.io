import React from "react"
import { Link } from "gatsby"

const Pagination = props => {
  const { baseSlug, page, pages } = props

  // A sweet helper function to create pagination object
  const createPaginationObjects = (baseSlug, length, page, increment = 2) =>
    Array.from({ length }, (_, i) => ({
      link: `${baseSlug}/${i + increment}/`,
      index: i + increment,
      current: page === i + increment,
    }))

  // Create the navigation link
  let navItems = [
    {
      link: baseSlug,
      index: 1,
      current: page === 1,
    },
  ]
  if (pages <= 5) {
    navItems = [
      ...navItems,
      ...Array.from({ length: pages - 1 }, (_, i) => ({
        link: `${baseSlug}/${i + 2}/`,
        index: i + 2,
        current: page === i + 2,
      })),
    ]
  } else {
    // We have a situation where we have to show the first
    // item, three items around the current one
    // and also the last item
    /* eslint-disable no-lonely-if */
    if (page <= 3) {
      // If the current one is closer to the start
      navItems = [
        ...navItems,
        ...createPaginationObjects(3, page),
        {
          separator: true,
          index: "starter-separator",
        },
        {
          link: `${baseSlug}/${pages}/`,
          index: pages,
          current: false,
        },
      ]
    } else if (page > pages - 3) {
      // If the current one is closer to the last one
      navItems = [
        ...navItems,
        {
          separator: true,
          index: "finisher-separator",
        },
        ...createPaginationObjects(4, page, pages - 3),
      ]
    } else {
      navItems = [
        ...navItems,
        {
          separator: true,
          index: "starter-separator",
        },
        ...createPaginationObjects(3, page, page - 1),
        {
          separator: true,
          index: "finisher-separator",
        },
        {
          link: `${baseSlug}/${pages}/`,
          index: pages,
          current: false,
        },
      ]
    }
    /* eslint-enable */
  }

  return (
    <nav className="bg-white px-4 py-3 flex items-center sm:px-6 pagination">
      <ul className="relative z-0 inline-flex items-center w-full justify-center">
        {navItems.map(item => (
          <li key={item.index}>
            {item.separator ? (
              <span className="pagination-ellipsis">&hellip;</span>
            ) : (
              <Link
                to={item.link}
                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 pagination-link ${
                  item.current ? "is-current" : ""
                }`}
                aria-label={`Goto page ${item.index}`}
              >
                {item.index}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
