import { useState } from "react";
import styled from "styled-components";

import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import "./myAccount.css";
import { MailOutline, PermIdentity, ErrorOutline } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

import Swal from "sweetalert2";

import { logout } from "../../redux/userRedux";
import Announcement from "../../components/Announcement";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100%;
  /* height: 100%; */
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-color: #f5fafd;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: #b90000;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: #570707;
  }
`;

const ErrorMass = styled.span`
  color: red;
`;

const MyAccount = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();
  const [loding, setLoding] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoding(true);
    const userInfo = {
      ...inputs,
    };

    try {
      // update
      const res = await userRequest.put(`/users/${user._id}`, userInfo);
      setLoding(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setLoding(false);
      Swal.fire({
        icon: "warning",
        text: "something went wrong!",
      });
    }
  };

  return (
    <Container>
      <Navbar />
      {user && !user.isVerified && <Announcement />}
      <ComponentDiv>
        <div className="userContainer">
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Change username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={user.username}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div> */}
                <div className="userUpdateItem">
                  <label>Change email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder={user.email}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Change password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                {/* <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div> */}
              </div>
              <div className="userUpdateRight">
                {loding ? (
                  <CircularProgress size="20px" color="inherit" />
                ) : (
                  <button className="userUpdateButton" onClick={handleClick}>
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={
                  user?.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>

              <span className="userShowTitle">Contact details</span>
              {/* <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div> */}
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              {/* <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div> */}
              <div>
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Emin misin?",
                      text: "Bunu geri alamazsınız!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "teal",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Evet, silin!",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          const res = await userRequest.delete(
                            `/users/${user._id}`
                          );

                          Swal.fire(
                            "Deleted!",
                            "Your account has been deleted.",
                            "success"
                          );
                          dispatch(logout());
                        } catch (err) {
                          Swal.fire({
                            icon: "warning",
                            text: "something went wrong!",
                          });
                        }
                      }
                    });
                  }}
                >
                  <ErrorOutline fontSize="small" /> Delete account{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default MyAccount;
