import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './apiUtils';
import ResourceTableView from './ResourceTableView';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Codespaces API pattern: https://<codespace>-8000.app.github.dev/api/activities/
  const endpoint = buildApiUrl('activities');

  useEffect(() => {
    let isMounted = true;

    async function fetchActivities() {
      console.log('Activities endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Activities request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Activities fetched data:', payload);

        if (isMounted) {
          setActivities(normalizeApiResponse(payload));
          setError('');
        }
      } catch (fetchError) {
        console.error('Activities fetch error:', fetchError);

        if (isMounted) {
          setError('Unable to load activities from the REST API.');
          setActivities([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchActivities();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const columns = [
    {
      key: 'type',
      label: 'Activity',
      render: (activity) => activity.type || 'N/A',
      modalValue: (activity) => activity.type,
    },
    {
      key: 'user',
      label: 'User',
      render: (activity) => activity.user || 'N/A',
      modalValue: (activity) => activity.user,
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (activity) => `${activity.duration ?? 'N/A'} minutes`,
      modalValue: (activity) => `${activity.duration ?? 'N/A'} minutes`,
    },
    {
      key: 'date',
      label: 'Date',
      render: (activity) => activity.date || 'N/A',
      modalValue: (activity) => activity.date,
    },
  ];

  return (
    <ResourceTableView
      title="Activities"
      description="Logged activity history from the backend API."
      items={activities}
      loading={loading}
      error={error}
      endpoint={endpoint}
      emptyMessage="No activities were returned by the API."
      columns={columns}
      getItemKey={(activity) => activity.id || `${activity.user}-${activity.date}-${activity.type}`}
    />
  );
}

export default Activities;