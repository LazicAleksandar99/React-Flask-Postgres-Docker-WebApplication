import React from 'react';

const SearchBar= ({value, changeInput}) =>{

  return (
    <div>
       <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" value={value} onChange={changeInput} className="form-control" placeholder="Search..." aria-label="Search"/>
        </form>
    </div>
  );
}
export default SearchBar;