import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

export const MerchantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  var { merchant } = location.state ? location.state : {};

  useEffect(() => {
    if (location.state == null) navigate('/');
  }, []);
  const loginMerchant = () => {
    navigate('/merchant-dashboard');
  }
  return (
    <>
      <div class=" details-main">
        <div class="container">
          <main>
            <div class="py-5 text-center">
              <AddShoppingCartIcon fontSize='large' />
              <h2>Merchant Details</h2>
              <p class="lead">Merchant Description</p>
            </div>

            <div class="row g-5">
              <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <h3 class="">Actions:</h3>
                  <span class="badge bg-primary rounded-pill">3</span>
                </h4>
                <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Product name</h6>
                      <small class="text-muted">Brief description</small>
                    </div>
                    <span class="text-muted">$12</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Second product</h6>
                      <small class="text-muted">Brief description</small>
                    </div>
                    <span class="text-muted">$8</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Third item</h6>
                      <small class="text-muted">Brief description</small>
                    </div>
                    <span class="text-muted">$5</span>
                  </li>
                  {/* <li class="list-group-item d-flex justify-content-between bg-light">
                    <div class="text-success">
                      <h6 class="my-0">Promo code</h6>
                      <small>EXAMPLECODE</small>
                    </div>
                    <span class="text-success">−$5</span>
                  </li> */}
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>$20</strong>
                  </li>
                  <button style={{ marginTop: 60 }} class="w-100 btn btn-primary btn-lg" onClick={loginMerchant}>Login As Merchant</button>
                </ul>
              </div>
              <div class="col-md-7 col-lg-8">
                <div class="project-info-box mt-0">
                  <h5>Merchant DETAILS</h5>
                  <p class="mb-0">Merchant Description from Database</p>
                </div>
                <div class="project-info-box">
                  <p><b>Name:</b>     {merchant?.email}</p>
                  <p><b>Email:</b>    {merchant?.name}</p>
                  <p><b>Status:</b>   {merchant?.status}</p>
                  <p class="mb-0"><b> Total Transaction Sum:</b>  $0{merchant?.sum}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
