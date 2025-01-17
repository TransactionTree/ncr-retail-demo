import React, { useEffect, useState, useContext } from 'react';
import { geolocated } from 'react-geolocated';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserStoreContext } from '~/context/userStore';
import FindStoreModalStore from './FindStoreModalStore';

const FindStoreModal = (props) => {
  const { modalProp, toggle, coords } = props;

  const { setUserStore } = useContext(UserStoreContext);
  const [coordinates, setCoordinates] = useState(coords);
  const [sites, setSites] = useState();
  const [logs, setLogs] = useState([]);
  if (props.coords && !coordinates) {
    setCoordinates(props.coords);
  }

  useEffect(async () => {
    // Get locations near user.
    const fetchData = async () => {
      if (props.coords && coordinates.latitude) {
        fetch(
          `/api/findSites?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            setLogs([data.log]);
            setSites(data.data.pageContent);
          });
      } else {
        fetch(`/api/findSites`)
          .then((res) => res.json())
          .then((data) => {
            setLogs([data.log]);
            setSites(data.data.pageContent);
          });
      }
    };
    fetchData();
  }, [coordinates]);

  return (
    <div>
      <Modal isOpen={modalProp} toggle={toggle} size="lg">
        <ModalHeader
          toggle={toggle}
          className="d-flex flex-columns border-none bg-brand-primary text-white"
        >
          <span className="font-weight-bold h3">Find a Store</span>
          {!props.isGeolocationAvailable ? (
            <p>
              <small className="text-muted">Geolocation is unavailable.</small>
            </p>
          ) : (
            !props.isGeolocationEnabled && (
              <p>
                <small className="text-muted">User location not enabled</small>
              </p>
            )
          )}
          {coordinates && coordinates.latitude && (
            <p className="mb-0">
              <small>
                Your location: [
                {coordinates
                  ? `${coordinates.latitude.toFixed(
                      2
                    )}, ${coordinates.longitude.toFixed(2)}`
                  : ''}
                ]
              </small>
            </p>
          )}
        </ModalHeader>
        <ModalBody className="py-0">
          {sites && sites.length > 0 && (
            <div id="store-modal-list" className="px-2 py-2">
              {sites.map((site) => (
                <FindStoreModalStore
                  site={site}
                  toggle={toggle}
                  setUserStore={setUserStore}
                  key={site.id}
                />
              ))}
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(FindStoreModal);
