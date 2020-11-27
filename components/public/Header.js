import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Nav, NavItem, Row, Col } from 'reactstrap';
import FindStoreModal from './FindStoreModal';
import { UserStoreContext } from '~/context/AppContext';
import useHeader from '~/context/useHeader';
import SubHeader from './SubHeader';
import SearchBar from './SearchBar';

const Header = () => {
  const { categories } = useHeader();
  const { userStore } = useContext(UserStoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  useEffect(() => {
    if (Object.keys(userStore).length == 0) {
      setIsModalOpen(true);
    }
  }, [isModalOpen]);
  return (
    <div className="bg-white">
      <Head>
        <title>MARKET | Sample Retail Demo</title>
      </Head>
      <FindStoreModal modalProp={isModalOpen} toggle={toggleModal} />
      <header className="section-header shadow-sm">
        <section className="header-top-light border-bottom">
          <Container>
            <Nav className="d-flex justify-content-end row">
              <NavItem>
                <Link href="/admin/dashboard">
                  <a className="nav-link">Manage</a>
                </Link>
              </NavItem>
            </Nav>
          </Container>
        </section>
        <section className="header-main border-bottom py-3">
          <Container>
            <Row className="align-items-center">
              <Col sm="4" md="3">
                <Link href="/">
                  <a className="logo-text">MARKET</a>
                </Link>
              </Col>
              <Col sm="8" md="4" lg="5">
                <SearchBar />
              </Col>
              <Col sm="12" md="5" lg="4" className="text-md-right">
                {/* <Link href="#">
                  <a>
                    <Button color="primary" outline className="mr-1">
                      My Cart
                    </Button>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <Button color="primary">Login</Button>
                  </a>
                </Link> */}
              </Col>
            </Row>
          </Container>
        </section>
        <SubHeader
          categories={categories}
          userStore={userStore}
          setIsModalOpen={setIsModalOpen}
        />
      </header>
    </div>
  );
};

export default Header;
