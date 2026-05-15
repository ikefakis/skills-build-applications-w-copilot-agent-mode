import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './apiUtils';
import ResourceTableView from './ResourceTableView';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Codespaces API pattern: https://<codespace>-8000.app.github.dev/api/workouts/
  const endpoint = buildApiUrl('workouts');

  useEffect(() => {
    let isMounted = true;

    async function fetchWorkouts() {
      console.log('Workouts endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Workouts request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Workouts fetched data:', payload);

        if (isMounted) {
          setWorkouts(normalizeApiResponse(payload));
          setError('');
        }
      } catch (fetchError) {
        console.error('Workouts fetch error:', fetchError);

        if (isMounted) {
          setError('Unable to load workouts from the REST API.');
          setWorkouts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const columns = [
    {
      key: 'name',
      label: 'Workout',
      render: (workout) => workout.name || 'N/A',
      modalValue: (workout) => workout.name,
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (workout) => workout.difficulty || 'N/A',
      modalValue: (workout) => workout.difficulty,
    },
    {
      key: 'description',
      label: 'Description',
      render: (workout) => workout.description || 'N/A',
      modalValue: (workout) => workout.description,
    },
  ];

  return (
    <ResourceTableView
      title="Workouts"
      description="Workout suggestions from the backend API."
      items={workouts}
      loading={loading}
      error={error}
      endpoint={endpoint}
      emptyMessage="No workouts were returned by the API."
      columns={columns}
      getItemKey={(workout) => workout.id || workout.name}
    />
  );
}

export default Workouts;