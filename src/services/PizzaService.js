class PizzaService {
   _apiBase = "https://6325f72270c3fa390f922d7b.mockapi.io";

   getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      return await res.json();
   };

   getPizzas = ({
      categoryId = 0,
      sortProp,
      sortOrder,
      searchValue,
      currentPage,
   }) => {
      const search = searchValue ? `search=${searchValue}` : "";
      const sort = `sortBy=${sortProp}`;
      const order = `order=${sortOrder}`;
      const category = categoryId ? `category=${categoryId}` : "";
      const page = `page=${currentPage}`;
      const limit = "limit=4";

      return this.getResource(
         `${this._apiBase}/items?${category}&${sort}&${order}&${search}&${page}&${limit}`
      );
   };
}

export default PizzaService;
