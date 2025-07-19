import { useLocation, Link } from 'react-router-dom';
import "./BreadcrumbsComponent.css";

const BreadcrumbsComponent = ({ breadcrumbs }) => {
  const location = useLocation();

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => {
        const isActive = crumb.to === location.pathname;
        return (
          <span key={idx} className="breadcrumbs__item">
            {isActive ? (
              <span className="breadcrumbs__current" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.to} className="breadcrumbs__link">
                {crumb.label}
              </Link>
            )}

            {idx < breadcrumbs.length - 1 && (
              <span className="breadcrumbs__separator">{"/"}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadcrumbsComponent;
