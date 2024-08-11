import React from 'react';
import { useActivites } from '../../app/context/ActivitiesContext';
import RecommendationCard from '../suggestion/RecommendationCard';

function Home() {
  const { activities } = useActivites();
  return (
    <div>
      { activities.map(place => (
        <>
          <RecommendationCard places={ place } />
        </>
      )) }
    </div>
  );
}

export default Home;