import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 

const BreadcrumbsComponent = ({breadcrumbs}) => {
  const location = useLocation();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrum, idx) => {
        const isActive = breadcrum.to === location.pathname || !breadcrum.to;
        return isActive ? (
          <span
            key={idx}
            style={{ color: '#B0B0B0', fontWeight: 500 }}
            aria-current="page"
          >
            {breadcrum.label}
          </span>
        ) : (
          <MuiLink
            component={RouterLink}
            to={breadcrum.to}
            underline="hover"
            color="primary"
            key={idx}
          >
            {breadcrum.label}
          </MuiLink>
        );
      })}
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbsComponent