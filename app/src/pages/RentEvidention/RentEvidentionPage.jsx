import { useEffect } from "react";
import useHeaderData from "../../hooks/useHeaderData";
import "./RentEvidention.css";
import RentalEvidention from "./RentalEvidention";

const RentEvidentionPage = () => {

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Evidencija iznajmljivanja", 
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);


  return (
    <RentalEvidention />
  )
}

export default RentEvidentionPage