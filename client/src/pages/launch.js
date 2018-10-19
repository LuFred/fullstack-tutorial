import React from 'react';
import styled from 'react-emotion';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PageContainer from '../components/page-container';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($launchId: ID!) {
    addToCart(id: $launchId) @client
  }
`;

// const CANCEL_TRIP = gql`
//   mutation cancel($launchId: ID!) {
//     cancelTrip(launchId: $launchId) {
//       success
//       message
//       launch {
//         id
//         isBooked
//       }
//     }
//   }
// `;

const LAUNCH_DETAILS_QUERY = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      year
      mission {
        name
        missionPatch
      }
      rocket {
        id
        name
        type
      }
      launchSuccess
      isBooked
    }
  }
`;

// the launchId prop here comes from the router
export default ({ launchId }) => {
  return (
    <PageContainer>
      <Query query={LAUNCH_DETAILS_QUERY} variables={{ launchId }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR: {error.message}</p>;

          const {
            mission,
            rocket,
            launchSuccess,
            isBooked,
            year,
          } = data.launch;

          return (
            <div style={{ width: '100%', justifyContent: 'center' }}>
              <img
                src={mission.missionPatch}
                style={{ width: '200px' }}
                alt={`Mission patch for ${mission.name}`}
              />
              <h2>{mission.name}</h2>
              <p>{year}</p>

              <h3>Rocket</h3>
              <p>
                <strong>Name:</strong> {rocket.name}
              </p>
              <p>
                <strong>Type:</strong> {rocket.type}
              </p>

              <hr />
              <Mutation
                mutation={ADD_TO_CART_MUTATION}
                variables={{ launchId }}
              >
                {(book, { data, loading, error }) => {
                  console.log(data);
                  return (
                    <BookButton onClick={book}>
                      {isBooked ? 'Cancel This Trip' : 'Add to Cart'}
                    </BookButton>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    </PageContainer>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const BookButton = styled('button')(({ isBooked }) => ({
  backgroundColor: 'white',
  border: isBooked ? '1px solid #eb193e' : '1px solid #00194b',
  color: isBooked ? '#eb193e' : '#00194b',
  borderRadius: '3px',
  paddingTop: '8px',
  paddingBottom: '8px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  marginTop: '16px',
  width: '200px',
  ':hover': {
    backgroundColor: isBooked ? '#eb193e' : '#00194b',
    color: 'white',
  },
}));
