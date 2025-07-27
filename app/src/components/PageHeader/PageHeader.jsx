import BreadcrumbsComponent from "../BreadcrumbsComponent/BreadcrumbsComponent";
import "./PageHeader.css";

const PageHeader = ({label, breadcrumbs, actions}) => {

  return (
    <div className="page-header">
      <div className="page-header__main">
        <h2 className="page-header__title">{label}</h2>
        {breadcrumbs && (
          <nav className="page-header__breadcrumbs">
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
          </nav>
        )}
      </div>
      <div className="page-header__actions">
        {actions}
      </div>
    </div>
  );
}

export default PageHeader