import { useState, useEffect } from 'react'
import { useDocumentContext } from '../document/DocumentContext'
import { useTranslation } from 'react-i18next'

import { AiOutlineLeft, AiOutlineDown } from 'react-icons/ai'

interface TOCItem {
  title: string
  pageNumber: number
  level: number
  children: TOCItem[]
  isExpanded: boolean
}

const Outline = () => {
  const { t } = useTranslation()
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
      <ul className="ml-2 p-0">
        {items?.map((item, i) => (
          <li
            key={`${item.title}-${i}`}
            className={`${level === 1 ? 'font-bold' : 'font-normal'
              } text-sm p-2 rounded-2 text-gray-500 dark:text-gray-300 text-center list-none`}
          >
            <div className="flex items-center">
              <div
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg p-2"
                style={{
                  cursor: item.pageNumber === -1 ? 'default' : 'pointer',
                }}
                onClick={
                  item.pageNumber === -1
                    ? undefined
                    : () => handleItemClick(item.pageNumber)
                }
              >
                {item.title}
              </div>
              {item.children.length > 0 && (
                <button
                  className="mr-2 focus:outline-none bg-transparent border-none hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer duration-200"
                  onClick={() => handleToggleExpand(item)}
                >
                  {item.isExpanded ? (
                    <AiOutlineDown className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                  ) : (
                    <AiOutlineLeft className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                  )}
                </button>
              )}
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
          className={`fixed top-6 right-6 z-10 bg-transparent rounded-xl ${isDropdownShown ? 'max-h-[80vh] overflow-auto' : ''}`}
        >
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
            <div className="flex justify-between items-center gap-2">
              <div className="text-sm font-bold p-2 rounded-2 text-gray-500 dark:text-gray-300 text-center">
                {t('outline')}
              </div>
              <button
                className="focus:outline-none bg-transparent border-none hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer duration-200"
                onClick={toggleDropdown}
              >
                {isDropdownShown ? (
                  <AiOutlineDown className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                ) : (
                  <AiOutlineLeft className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                )}
              </button>
            </div>
            {isDropdownShown && (
              <div className="mt-2">
                <ul className="ml-2 p-0">
                  {outline?.map((item, i) => (
                    <li
                      key={`${item.title}-${i}`}
                      className={`${item.children ? 'font-bold' : 'font-normal'
                        } text-sm p-2 rounded-2 text-gray-500 dark:text-gray-300 text-center list-none`}
                    >
                      <div className="flex items-center">
                        <div
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg p-2"
                          style={{
                            cursor:
                              item.pageNumber === -1 ? 'default' : 'pointer',
                          }}
                          onClick={
                            item.pageNumber === -1
                              ? undefined
                              : () => handleItemClick(item.pageNumber)
                          }
                        >
                          {item.title}
                        </div>
                        {item.children && (
                          <button
                            className="mr-2 focus:outline-none bg-transparent border-none hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer duration-200"
                            onClick={() => {
                              item.isExpanded = !item.isExpanded
                              setToc([...toc])
                            }}
                          >
                            {item.isExpanded ? (
                              <AiOutlineDown className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                            ) : (
                              <AiOutlineLeft className='w-[20px] h-[20px] mt-1 text-gray-500 dark:text-gray-300' />
                            )}
                          </button>
                        )}
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
