import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './apiUtils';
import ResourceTableView from './ResourceTableView';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Codespaces API pattern: https://<codespace>-8000.app.github.dev/api/users/
  const endpoint = buildApiUrl('users');

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      console.log('Users endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Users request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('Users fetched data:', payload);

        if (isMounted) {
          setUsers(normalizeApiResponse(payload));
          setError('');
        }
      } catch (fetchError) {
        console.error('Users fetch error:', fetchError);

        if (isMounted) {
          setError('Unable to load users from the REST API.');
          setUsers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const columns = [
    {
      key: 'username',
      label: 'Username',
      render: (user) => user.username || 'N/A',
      modalValue: (user) => user.username,
    },
    {
      key: 'email',
      label: 'Email',
      render: (user) => user.email || 'N/A',
      modalValue: (user) => user.email,
    },
    {
      key: 'first_name',
      label: 'First name',
      render: (user) => user.first_name || 'N/A',
      modalValue: (user) => user.first_name,
    },
    {
      key: 'last_name',
      label: 'Last name',
      render: (user) => user.last_name || 'N/A',
      modalValue: (user) => user.last_name,
    },
  ];

  return (
    <ResourceTableView
      title="Users"
      description="User profiles from the backend API."
      items={users}
      loading={loading}
      error={error}
      endpoint={endpoint}
      emptyMessage="No users were returned by the API."
      columns={columns}
      getItemKey={(user) => user.id || user.email || user.username}
    />
  );
}

export default Users;