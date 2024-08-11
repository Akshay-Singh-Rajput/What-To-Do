import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import RecommendationCard from '../../pages/suggestion/RecommendationCard';

function PreviousActivities() {
  const { currentActivities = [] } = useGlobalContext();
  return (
    <div>
      {
        currentActivities.lenght === 0 ? <>
          <div className="text-center">
            <Typography variant="h6" gutterBottom className="mb-4">
              No activities have been created yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={ handleCreateActivities }
              className="w-full max-w-xs"
            >
              Create First Activity
            </Button>
          </div>
        </>
          : <>
            { currentActivities.map(place => (
              <>
                <RecommendationCard places={ place } />
              </>
            )) }
          </>
      }

    </div>
  );
}

export default PreviousActivities;