export const bearerToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return `Bearer ${token}`;
    }
    return null;
  };
  
// POST
// http://127.0.0.1:8080/api/v1/expenses/createExpense
// userId:66a4821d848b91a6b8029f42
// month:2
// year:2024
// initialAmount:2000
// date:2024-07-15
// amount:250
// name:chaddi
// category:fashion
