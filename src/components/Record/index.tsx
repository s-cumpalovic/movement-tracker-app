import React from 'react';
import { IRecord } from './constants';

interface RecordsTableProps {
  records: IRecord[];
  onPreviewRecord: (videoUuid: string) => void;
  onDeleteRecord: (videoUuid: string) => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({
  records,
  onDeleteRecord,
  onPreviewRecord,
}) => (
  <table className="records-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record, index) => (
        <tr key={record.uuid}>
          <td>{index + 1}</td>
          <td>
            <div
              className="record-name-link"
            >
              <span
                onClick={() => onPreviewRecord(record.uuid)}
              >
                {record.name}
              </span>
            </div>
          </td>
          <td>{record.created_at}</td>
          <td>
            <div className="record-actions">
              <button
                type="button"
                className="purple-button"
                onClick={() => onDeleteRecord(record.uuid)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RecordsTable;
