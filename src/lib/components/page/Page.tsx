import { MouseEvent, useEffect } from 'react'
import { useDocumentContext } from '../document/DocumentContext'
import { RENDERING_STATES } from '../../../utils/enums'
import Pagination from '../pagination/Pagination'
import PaginatorPage from './PaginatorPage'
import ScrollPage from './ScrollPage'
import cx from 'classnames'

interface IPageParams {
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void
}

const Page = ({ onDoubleClick }: IPageParams) => {
  const { isRendering, pdfViewing, totalPages } = useDocumentContext()

  // triger rerender
  useEffect(() => {}, [pdfViewing])

  return (
    <div
      className={cx('page-container', {
        'page-container-paginator-padding': pdfViewing === 'paginator',
        'page-container-scroll-padding': pdfViewing === 'scroll',
      })}
      onDoubleClick={onDoubleClick}
    >
      {isRendering &&
        isRendering in
          [RENDERING_STATES.LOADING, RENDERING_STATES.RENDERING] && (
          <div className={'page-loader-container'}>
            <span className={'viewer-loader-small'} />
          </div>
        )}
      {pdfViewing === 'paginator' && (
        <>
          <div className="page-paginator-container">
            <Pagination />
          </div>
          <PaginatorPage />
        </>
      )}
      {pdfViewing === 'scroll' && (
        <>
          <div className={'page-loader-container'}>
            <span>NOT IMPLEMENTED</span>
          </div>
          {/* {Array.from({ length: totalPages - 1 }).map((_, index) => (
            <ScrollPage pageNumber={index + 1} key={index} />
          ))} */}
        </>
      )}
    </div>
  )
}

export default Page
