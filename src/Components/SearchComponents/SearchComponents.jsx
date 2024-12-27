import React, { useEffect } from 'react';
import SearchUserCard from './SearchUserCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/User/Action';

const SearchComponents = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);

  // Dispatch the searchUserAction on component mount or search query change
  useEffect(() => {
    // You can uncomment this line to load data when the component mounts
    // dispatch(searchUserAction({ jwt: token, query: "" }));
  }, [dispatch, token]);

  const handleSearch = (e) => {
    dispatch(searchUserAction({ jwt: token, query: e.target.value }));
  };

  return (
    <div className='searchContainer border'>
      <div className='px-3 pb-5'>
        <h1 className='text-xl pb-5'>Search</h1>
        <input
          onChange={handleSearch}
          className='searchInput'
          type="text"
          placeholder='Search...'
        />
      </div>
      <hr />

      <div className='px-3 pt-5'>
        {/* Check if searchUser is an array before attempting to map */}
        {Array.isArray(user.searchUser) && user.searchUser.length > 0 ? (
          user.searchUser.map((item) => <SearchUserCard key={item.id} user={item} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponents;
