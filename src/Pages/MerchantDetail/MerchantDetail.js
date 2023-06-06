import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

export const MerchantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  var { merchant } = location.state ? location.state : {};

  useEffect(() => {
    if (localStorage.getItem("user_type") == 'merchant') navigate("/merchant-dashboard");
    if (location.state == null) navigate('/admin-dashboard');
  }, []);
  const loginMerchant = () => {
    localStorage.setItem("user_type", 'merchant');
    localStorage.setItem("merchant_id", merchant.id);
    navigate('/merchant-dashboard');
  };
  return (
    <>
      <div class=" details-main">
        <div class="container">
          <main>
            <div class="py-5 text-center">
              <AddShoppingCartIcon fontSize='large' />
              <h2>Merchant Details</h2>
              <p class="lead">{merchant.description}</p>
            </div>
            <div>
              <div class="project-info-box">
                <p><b>Name:</b>     {merchant?.email}</p>
                <p><b>Email:</b>    {merchant?.name}</p>
                <p><b>Status:</b>   {merchant?.status}</p>
                <p class="mb-0"><b> Total Transaction Sum:</b> {merchant?.total_transaction_sum} $</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }} class="project-info-box mt-0">
                <div>
                  <h5>Merchant DETAILS:</h5>
                  <p class="mb-0">{merchant.description}</p>
                </div>
                <button class="btn btn-primary btn-lg" onClick={loginMerchant}>Login As Merchant</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
