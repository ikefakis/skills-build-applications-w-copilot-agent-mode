import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './apiUtils';
import ResourceTableView from './ResourceTableView';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Codespaces API pattern: https://<codespace>-8000.app.github.dev/api/leaderboard/
  const endpoint = buildApiUrl('leaderboard');

  useEffect(() => {
    let isMounted = true;

    async function fetchLeaderboard() {
      console.log('Leaderboard endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);

        if (isMounted) {
          const normalizedEntries = normalizeApiResponse(payload).sort(
            (leftEntry, rightEntry) => rightEntry.score - leftEntry.score
          );

          setEntries(normalizedEntries);
          setError('');
        }
      } catch (fetchError) {
        console.error('Leaderboard fetch error:', fetchError);

        if (isMounted) {
          setError('Unable to load leaderboard entries from the REST API.');
          setEntries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (entry) => `#${entries.findIndex((item) => item === entry) + 1}`,
      modalValue: (entry) => `#${entries.findIndex((item) => item === entry) + 1}`,
    },
    {
      key: 'user',
      label: 'User',
      render: (entry) => entry.user || 'N/A',
      modalValue: (entry) => entry.user,
    },
    {
      key: 'score',
      label: 'Score',
      render: (entry) => `${entry.score ?? 0} pts`,
      modalValue: (entry) => `${entry.score ?? 0} pts`,
    },
  ];

  return (
    <ResourceTableView
      title="Leaderboard"
      description="Top scores from the backend API."
      items={entries}
      loading={loading}
      error={error}
      endpoint={endpoint}
      emptyMessage="No leaderboard entries were returned by the API."
      columns={columns}
      getItemKey={(entry) => entry.id || `${entry.user}-${entry.score}`}
    />
  );
}

export default Leaderboard;