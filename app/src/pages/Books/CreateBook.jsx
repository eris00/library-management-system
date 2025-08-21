import React, { useEffect } from 'react'
import useHeaderData from '../../hooks/useHeaderData';

const CreateBook = () => {

  const { setHeaderData } = useHeaderData();
    useEffect(() => {
    setHeaderData({
      label: "Nova Knjiga",
      breadcrumbs: [
        {label:"Sve knjige", to: "/books"},
        {label:"Nova knjiga", to: "/create-book"}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  return (
    <div></div>
  )
}

export default CreateBook