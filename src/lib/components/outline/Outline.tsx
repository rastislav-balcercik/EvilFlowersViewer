import { useState, useEffect } from 'react'
import { useDocumentContext } from '../document/DocumentContext'

interface TOCItem {
  title: string
  pageNumber: number
  level: number
  children: TOCItem[]
  isExpanded: boolean
}

const Outline = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const { pdf, outline, outlineSetPage } = useDocumentContext()

  const toggleDropdown = () => {
    setIsDropdownShown((prevState) => !prevState)
  }

  const handleItemClick = (pageNumber: number) => {
    outlineSetPage(pageNumber)
  }

  const handleToggleExpand = (item: TOCItem) => {
    item.isExpanded = !item.isExpanded
    setToc([...toc]) // Update the state to trigger a re-render
  }

  const renderTOC = (items: TOCItem[] | undefined, level = 1) => {
    return (
      <ul className="ml-2">
        {items?.map((item) => (
          <li
            key={`${item.title}-${item.pageNumber}`}
            className={`${
              level === 1 ? 'font-bold' : 'font-normal'
            } py-1 text-sm`}
          >
            <div className="flex items-center">
              {item.children.length > 0 && (
                <button
                  className="mr-2 focus:outline-none"
                  onClick={() => handleToggleExpand(item)}
                >
                  {item.isExpanded ? '-' : '+'}
                </button>
              )}
              <div
                className="cursor-pointer hover:bg-gray-100 rounded-lg p-1"
                onClick={() => handleItemClick(item.pageNumber)}
              >
                {item.title}
              </div>
            </div>
            {item.isExpanded &&
              item.children &&
              renderTOC(item.children, level + 1)}
          </li>
        ))}
      </ul>
    )
  }

  const [toc, setToc] = useState(() => {
    // Add isExpanded property to each item in outline
    const newOutline = outline?.map((item) => ({
      ...item,
      isExpanded: false,
    }))
    return newOutline
  })

  useEffect(() => {
    // Update isExpanded property when outline changes
    setToc((prevToc) => {
      const newOutline = outline?.map((item) => {
        const matchingItem = prevToc?.find(
          (prevItem) =>
            prevItem.title === item.title &&
            prevItem.pageNumber === item.pageNumber
        )
        return {
          ...item,
          isExpanded: matchingItem ? matchingItem.isExpanded : false,
        }
      })
      return newOutline
    })
  }, [outline])
  return (
    <>
      {outline && outline.length > 0 && (
        <div
          className={`fixed top-4 right-4 z-50 ${
            isDropdownShown ? 'h-96 overflow-y-scroll' : ''
          }`}
        >
          <div className="bg-white p-2 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Table of Contents</div>
              <button
                className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none"
                onClick={toggleDropdown}
              >
                {isDropdownShown ? 'x' : '<'}
              </button>
            </div>
            {isDropdownShown && (
              <div className="mt-2">
                <ul className="ml-2">
                  {outline?.map((item) => (
                    <li
                      key={`${item.title}-${item.pageNumber}`}
                      className={`${
                        item.children ? 'font-bold' : 'font-normal'
                      } py-1 text-sm`}
                    >
                      <div className="flex items-center">
                        {item.children && (
                          <button
                            className="mr-2 focus:outline-none"
                            onClick={() => {
                              item.isExpanded = !item.isExpanded
                              setToc([...toc])
                            }}
                          >
                            {item.isExpanded ? '-' : '+'}
                          </button>
                        )}
                        <div
                          className="cursor-pointer hover:bg-gray-100 rounded-lg p-1"
                          onClick={() => handleItemClick(item.pageNumber)}
                        >
                          {item.title}
                        </div>
                      </div>
                      {item.isExpanded &&
                        item.children &&
                        renderTOC(item.children, item.level + 1)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Outline
