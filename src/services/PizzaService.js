class PizzaService {
   _apiBase = "https://6325f72270c3fa390f922d7b.mockapi.io";

   getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      return await res.json();
   };

   getPizzas = (
      filterCategory = 0,
      sortProp,
      sortOrder,
      searchValue,
      curPage
   ) => {
      const search = searchValue ? `search=${searchValue}` : "";
      const sort = `sortBy=${sortProp}`;
      const order = `order=${sortOrder}`;
      const category = filterCategory ? `category=${filterCategory}` : "";
      const page = `page=${curPage}`;
      const limit = "limit=4";

      return this.getResource(
         `${this._apiBase}/items?${category}&${sort}&${order}&${search}&${page}&${limit}`
      );
   };
}

export default PizzaService;