import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { TableBody } from "../pages/appointment/Appointment";
import { TableBooking } from "../pages/booking/Booking";
import { Tableuser } from "../pages/user/Tableuser";
const Pagination = ({ itemsPerPage, items, pathname }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };
  const [path, setpathname] = useState("");

  useEffect(() => {
    setpathname(pathname);
  }, [path]);

  return (
    <>
      {path === "admin/appointment" ? (
        <TableBody items={currentItems} />
      ) : path === "admin/booking" ? (
        <TableBooking items={currentItems} />
      ) : path === "admin/user" ? (
        <Tableuser items={currentItems} />
      ) : null}
      <div className="pagintaion">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<i className="fa-solid fa-caret-right"></i>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<i className="fa-solid fa-caret-left"></i>}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Pagination;
