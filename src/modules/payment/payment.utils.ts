import config from "../../config";

export const verifyPayment = async (valId: string) => {
  const storeId = config.ssl_store_id;
  const storePass = config.ssl_store_password;
  const response = await fetch(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePass}&format=json`
  );

  const data = await response.json();
  return data;
}

