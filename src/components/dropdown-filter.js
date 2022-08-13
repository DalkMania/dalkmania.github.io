import React, { useState } from "react"
import { Link } from "gatsby"
import { slugify } from "../helpers/slugify"
import DropdownArrow from "../assets/svg/dropdown-arrow.svg"

const DropdownFilter = props => {
  const { items, name, baseSlug } = props
  const [isFilterOpen, setisFilterOpen] = useState(false)

  const FilterItems = items.map((item, index) => {
    return (
      <Link
        activeClassName="bg-gray-100 text-gray-900"
        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
        role="menuitem"
        to={baseSlug + "/" + slugify(item)}
        key={index}
      >
        {item}
      </Link>
    )
  })

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setisFilterOpen(!isFilterOpen)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-bold text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Portfolio {name}
            <DropdownArrow />
          </button>
        </span>
      </div>
      <div
        className={
          isFilterOpen === true
            ? "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-10"
            : "hidden"
        }
      >
        <div className="rounded-md bg-white shadow-xs">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {FilterItems}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownFilter
