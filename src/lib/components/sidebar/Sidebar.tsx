import { ReactNode } from 'react'
import cx from 'classnames'
import Tooltip from '../helpers/Tooltip'
import { useTranslation } from 'react-i18next'

// icons
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { SIDEBAR_TABS } from '../../../utils/enums'

interface ISidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  title: ReactNode
  setSidebar: (state: SIDEBAR_TABS) => void
}

const Sidebar = ({
  open,
  setOpen,
  children,
  title,
  setSidebar,
}: ISidebarProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cx('sidebar-container', {
        'sidebar-container-hidden': !open,
        'sidebar-container-visible': open,
      })}
    >
      <div className="sidebat-title-container">
        <span className={'sidebar-title'}>{title}</span>
        <div className={'sidebar-button-container'}>
          <Tooltip title={t('hidePanel')} placement={'left'}>
            <div
              className="viewer-button"
              onClick={() => {
                setSidebar(SIDEBAR_TABS.NULL)
                setOpen(false)
              }}
            >
              <AiOutlineDoubleLeft
                className={'viewer-button-icon'}
                style={{ width: '15px', height: '15px' }}
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="sidebar-children-container">{children}</div>
    </div>
  )
}

export default Sidebar
