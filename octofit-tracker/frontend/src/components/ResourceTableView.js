import { useMemo, useState } from 'react';

function stringifyValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value && typeof value === 'object') {
    return Object.values(value).join(', ');
  }

  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  return String(value);
}

function ResourceTableView({
  title,
  description,
  items,
  loading,
  error,
  endpoint,
  emptyMessage,
  columns,
  getItemKey,
}) {
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      columns.some((column) => {
        const value = column.modalValue
          ? column.modalValue(item)
          : column.render
            ? column.render(item)
            : item[column.key];

        return stringifyValue(value).toLowerCase().includes(normalizedQuery);
      })
    );
  }, [columns, items, query]);

  return (
    <section className="resource-section card border-0 shadow-sm">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3 mb-4">
          <div>
            <p className="text-uppercase text-secondary fw-semibold small mb-2">Data resource</p>
            <h2 className="h3 mb-2">{title}</h2>
            <p className="text-secondary mb-0">{description}</p>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="badge rounded-pill text-bg-dark px-3 py-2">
              {filteredItems.length} shown
            </span>
            <a
              className="btn btn-outline-secondary btn-sm"
              href={endpoint}
              target="_blank"
              rel="noreferrer"
            >
              Open API
            </a>
          </div>
        </div>

        <div className="resource-toolbar card border-0 mb-4">
          <div className="card-body p-3 p-lg-4">
            <form
              className="row g-3 align-items-end"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="col-md-8 col-lg-9">
                <label className="form-label fw-semibold" htmlFor={`${title.toLowerCase()}-search`}>
                  Filter records
                </label>
                <input
                  id={`${title.toLowerCase()}-search`}
                  type="search"
                  className="form-control"
                  placeholder={`Search ${title.toLowerCase()}`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="col-md-4 col-lg-3 d-grid d-md-flex justify-content-md-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setQuery('')}
                  disabled={!query}
                >
                  Clear filter
                </button>
              </div>
            </form>
          </div>
        </div>

        {loading && <div className="alert alert-light border mb-0">Loading {title.toLowerCase()}...</div>}
        {!loading && error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0 resource-table">
              <thead className="table-dark">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={getItemKey(item)}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render ? column.render(item) : stringifyValue(item[column.key])}</td>
                    ))}
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setActiveItem(item)}
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
          <div className="resource-empty">No matching {title.toLowerCase()} records were found.</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="resource-empty">{emptyMessage}</div>
        )}
      </div>

      {activeItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <p className="text-uppercase text-secondary fw-semibold small mb-1">Record details</p>
                    <h3 className="modal-title h4 mb-0">{title} details</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setActiveItem(null)}
                  />
                </div>
                <div className="modal-body pt-3">
                  <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                      <tbody>
                        {columns.map((column) => {
                          const modalValue = column.modalValue
                            ? column.modalValue(activeItem)
                            : column.render
                              ? column.render(activeItem)
                              : activeItem[column.key];

                          return (
                            <tr key={column.key}>
                              <th scope="row" className="w-25 text-secondary fw-semibold">
                                {column.label}
                              </th>
                              <td>{stringifyValue(modalValue)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setActiveItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setActiveItem(null)} />
        </>
      )}
    </section>
  );
}

export default ResourceTableView;