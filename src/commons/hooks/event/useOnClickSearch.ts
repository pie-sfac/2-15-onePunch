export const useOnClickSearch = (
  setSearchExecuted: any,
  fetchMembers: any,
  search: any,
  apiInstance: any,
  currentPage: any,
  setMembers: any
) => {
  const onClickSearch = async () => {
    if (search === "") {
      setSearchExecuted(false);
      fetchMembers(currentPage);
    } else {
      setSearchExecuted(true);
      try {
        const response = await apiInstance.get(
          `/search?query=${search}&resource=MEMBER`
        );
        console.log(response.data.members);
        setMembers(response.data.members);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    }
  };

  return {
    onClickSearch,
  };
};
