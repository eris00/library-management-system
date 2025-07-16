import BreadcrumbsComponent from "./BreadcrumbsComponent";

const PageHeader = ({label, breadcrumbs, actions}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 px-6 bg-white w-full h-[61px]">
      <div className="flex flex-col justify-start gap-1">
        <h2 className="flex text-xl font-semibold">{label}</h2>
        {breadcrumbs && (
          <nav className="text-xs text-gray-400">
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
          </nav>
        )}
      </div>
      <div className="flex gap-3">
        {actions}
      </div>
  </div>
  )
}

export default PageHeader