import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    case FILTER_PRODUCTS:
      let UpdatedItems = [...state.all_products];
      const { text, category, company, color, price, shipping } = state.filters;
      if (text !== "") {
        UpdatedItems = UpdatedItems.filter((f) => {
          return f.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }
      if (category !== "all") {
        UpdatedItems = UpdatedItems.filter(
          (item) => item.category === category
        );
      }
      if (company !== "all") {
        UpdatedItems = UpdatedItems.filter((item) => item.company === company);
      }
      if (color !== "all") {
        UpdatedItems = UpdatedItems.filter((item) => {
          return item.colors.find((c) => c === color);
        });
      }
      UpdatedItems = UpdatedItems.filter((item) => item.price <= price);
      if (shipping) {
        UpdatedItems = UpdatedItems.filter((item) => item.shipping);
      }
      return { ...state, filtered_products: UpdatedItems };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      break;
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
