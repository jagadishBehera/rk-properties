import React from 'react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import FloatingWhatsApp from '../../Components/Layout/FloatingWhatsApp ';

const NonAuthLayout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
      <FloatingWhatsApp />
    </React.Fragment>
  )
}

export default NonAuthLayout