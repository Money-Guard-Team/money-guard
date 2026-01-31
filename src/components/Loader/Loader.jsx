import React from "react";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Arka planı karart */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Loader = () => {
  // Global state'ten loading durumunu çekiyoruz
  const isLoading = useSelector((state) => state.global?.isLoading);
  // Not: state.global yoksa hata vermemesi için ?. ekledim

  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849687"]}
      />
    </LoaderOverlay>
  );
};

export default Loader;
