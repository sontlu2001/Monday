export const ROUTES = {
  LOGIN: "/login",
  BORROWER_DETAIL: (id: string | number) => `/borrower/detail/${id}`,
  APPLICATION_DETAIL: (id: string | number) => `/application/dashboard/${id}`,
};
