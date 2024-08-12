import React, { useEffect } from 'react';
import { useGlobalContext } from '../../app/context/GlobalContext';
import RecommendationCard from '../../app/components/RecommendationCard';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../../app/context/AuthContext';

function PreviousActivities() {
  const { user } = useAuth();
  const { previousActivities = [], getUserProfile, setIsBottomSheetOpen, isGlobalProviderMounted } = useGlobalContext();


  if (!isGlobalProviderMounted) return "<></>";

  useEffect(() => {
    console.log('getUserProfile');
    getUserProfile();
  }, []);


  return (
    <div>
      {
        previousActivities.length === 0 && !isGlobalProviderMounted ? <>
          <div className="text-center">
            <Typography variant="h6" gutterBottom className="mb-4">
              No activities have been created yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={ setIsBottomSheetOpen }
              className="w-full max-w-xs"
            >
              Create First Activity
            </Button>
          </div>
        </>
          : <>

            <AccordionComponent previousActivities={ previousActivities } />
            {/* { previousActivities.map(data => (
              <>
                <div className='p-4'>
                  <Typography variant="h6" gutterBottom className="mb-4">
                    { data?.prompt }
                  </Typography>
                </div>
                {
                  data?.data.map((places) => (
                    <RecommendationCard places={ places || {} } />
                  ))
                }
              </>
            )) } */}
          </>
      }

    </div>
  );
}

export default PreviousActivities;



const AccordionComponent = ({ previousActivities }) => {
  return (
    <div className="p-4">
      { previousActivities.map((data, index) => (
        <Accordion
          key={ index }
          className="mb-4 shadow-lg rounded-md"
          sx={ {
            '& .MuiAccordionSummary-content': {
              fontSize: '0.875rem',
            },
            '& .MuiAccordionSummary-expandIcon': {
              fontSize: '1rem'
            },
          } }
        >
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            aria-controls={ `panel-${index}-content` }
            id={ `panel-${index}-header` }
            className=""
            sx={ {
              '& .MuiTypography-root': {
                color: theme => theme.palette.text.primary, // Use theme text color
              },
            } }
          >
            <Typography variant="p" className="font-semibold text-gray-100 dark:text-gray-300">
              { data?.prompt }
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="">
            { data?.data.map((places, i) => (
              <RecommendationCard key={ i } places={ places || {} } />
            )) }
          </AccordionDetails>
        </Accordion>
      )) }
    </div>
  );
};