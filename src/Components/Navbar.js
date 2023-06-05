import { Box } from "@mui/system";
import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EventForm from "./Forms/TransactionForm";
import { useNavigate } from 'react-router-dom';
import MerchantForm from "./Forms/MerchantForm";
import TransactionForm from "./Forms/TransactionForm";

const style = {
  position: "absolute",
  borderRadius: "1em",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // height: "95%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  zIndex: 1000,
  pt: 2,
  px: 4,
  pb: 3,
};

function Navbar({ user, reRender, setReRender, search, setSearch }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SearchSubmit = (event) => {
    event.preventDefault();
    setSearch(event.target.search.value);
  };
  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_type");
    localStorage.removeItem("merchant_id");
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ position: "fixed", zIndex: 1000, mt: -10, width: "100%" }}>
        <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#76b852' }}>

          <div class="container-fluid">
            <b><a style={{ color: "#112c32" }} class="navbar-brand" href="#">
              Merchant App   |
            </a></b>
            <div>
              <Button variant="text" sx={{ fontSize: 15, color: 'blue' }} onClick={handleOpen}>{user == "merchant" ? 'Create Transaction' : 'Add Merchant'} </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box
                  sx={{ ...style, width: 500, mt: 10, background: "#a8b8da", }}
                >
                  {user == 'merchant' ?
                    <TransactionForm user={user} setReRender={setReRender} reRender={reRender} setOpen={setOpen} />
                    :
                    <MerchantForm user={user} setReRender={setReRender} reRender={reRender} setOpen={setOpen} />
                  }
                </Box>
              </Modal>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li> */}
              </ul>
              <form onSubmit={SearchSubmit} class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button class="btn btn-outline-success" type="submit">
                  Search
                </button> */}
              </form>
              <Button onClick={logout} style={{ marginLeft: 10 }} class="btn btn-outline-secondary">
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </Box>
    </>
  );
}
export default Navbar;
