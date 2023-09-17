import styled from "styled-components";

import { WarningTwoTone } from "@material-ui/icons";

import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const Resend = styled.span`
  cursor: pointer;
  border-bottom: solid;
  font-weight: 700;
`;

const Announcement = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      await axios.post(
        `https://dark-red-coral-wrap.cyclic.cloud/api/auth/resendverifyemail/${user._id}`
      );
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "We have sent a confirmation message to your email account. Please go to your email and confirm the account.",
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        timer: 1500,
      });
      setLoading(false);
    }
  };
  return (
    <Container>
      <WarningTwoTone style={{ width: "18px", color: "yellow" }} />
      <span>
        Please confirm your account using the link we sent to your email
        or&nbsp;
        {loading ? (
          <CircularProgress size="14px" color="inherit" />
        ) : (
          <Resend onClick={handleClick}> send again</Resend>
        )}
      </span>
    </Container>
  );
};

export default Announcement;
