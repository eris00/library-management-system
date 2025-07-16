import { useEffect } from "react";
import useHeaderData from '../hooks/useHeaderData';

const Activities = () => { 
    const { setHeaderData } = useHeaderData();

    useEffect(() => {
      setHeaderData({
        label: "Aktivnosti",
      });
      return () => setHeaderData({ label: "", breadcrumbs: "", actions: null });
    }, [setHeaderData]);
  

  return (
    <div>Prikaz aktivnosti</div>
  )
}

export default Activities