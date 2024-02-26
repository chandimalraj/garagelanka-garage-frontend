export const initialState = {
    authentication: {
      user: null,
      authToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      redirect: null,
    },
    instantBill: {
      loading: false,
      invoiceNo: "",
      error: null,
    },
    serviceBill: {
      loading: false,
      invoiceNo: "",
      error: null,
    },
    booking: {
      serviceTypes: null,
      serviceAppointments: [],
    },
    vehicle: {
      makes: [],
      makeModels: [],
      allModels: [],
    },
    //testing
    courses: [],
  };