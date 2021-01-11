import axios from "axios";

export const submitBulkOrderDetails = async (formData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/bulkorder`, formData, config);
        return data.result
    } catch (error) {
        return false;
    }
};

export const submitOTP = async (formData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/otpverification/otp`, formData, config);
        return data
    } catch (error) {
        return false;
    }
};
export const bulklistOrders = async(userInfo) => {
  try {


    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/bulkorders/list`, config)
    return data
  } catch (error) {
    return {result:false}
  }
}
