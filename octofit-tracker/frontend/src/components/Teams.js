import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './apiUtils';
import ResourceTableView from './ResourceTableView';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Codespaces API pattern: https://<codespace>-8000.app.github.dev/api/teams/
  const endpoint = buildApiUrl('teams');

  useEffect(() => {
    let isMounted = true;

    async function fetchTeams() {
      console.log('Teams endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Teams request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Teams fetched data:', payload);

        if (isMounted) {
          setTeams(normalizeApiResponse(payload));
          setError('');
        }
      } catch (fetchError) {
        console.error('Teams fetch error:', fetchError);

        if (isMounted) {
          setError('Unable to load teams from the REST API.');
          setTeams([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const columns = [
    {
      key: 'name',
      label: 'Team',
      render: (team) => team.name || 'N/A',
      modalValue: (team) => team.name,
    },
    {
      key: 'members',
      label: 'Members',
      render: (team) =>
        Array.isArray(team.members) && team.members.length > 0
          ? team.members.join(', ')
          : 'No members listed',
      modalValue: (team) =>
        Array.isArray(team.members) && team.members.length > 0
          ? team.members.join(', ')
          : 'No members listed',
    },
    {
      key: 'member_count',
      label: 'Count',
      render: (team) =>
        Array.isArray(team.members) ? `${team.members.length} member(s)` : '0 member(s)',
      modalValue: (team) =>
        Array.isArray(team.members) ? `${team.members.length} member(s)` : '0 member(s)',
    },
  ];

  return (
    <ResourceTableView
      title="Teams"
      description="Team rosters from the backend API."
      items={teams}
      loading={loading}
      error={error}
      endpoint={endpoint}
      emptyMessage="No teams were returned by the API."
      columns={columns}
      getItemKey={(team) => team.id || team.name}
    />
  );
}

export default Teams;