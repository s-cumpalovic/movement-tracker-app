import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecord, getAllRecords, getSpecificRecord } from '../services/api/mainApi';
import { IRecord } from '../components/Record/constants';
import RecordsTable from '../components/Record';
import NoRecords from '../components/Record/NoRecords';
import { useAppContext } from '../AppContext';
import { ROUTES } from '../routes/constants';
import DeleteModal from '../components/Modal/DeleteModal';

const Records: React.FC = () => {
  const [records, setRecords] = useState<IRecord[] | undefined>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [deleteRecordId, setDeleteRecordId] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const recordsData = await getAllRecords();
      setRecords(recordsData.data);
    })();
  }, []);

  const { setSpecificRecord } = useAppContext();
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowConfirmModal((prevState) => !prevState);
  };

  const handlePreviewRecord = async (videoUuid: string) => {
    const recordData = await getSpecificRecord(videoUuid);
    setSpecificRecord(recordData ?? undefined);

    if (recordData) {
      navigate(ROUTES.PREVIEW);
    }
  };

  const handleDeleteModal = (id: string) => {
    setDeleteRecordId(id);

    toggleModal();
  };

  const onSuccessDelete = () => {
    const filteredRecords = records?.filter((record) => record.uuid !== deleteRecordId);
    setRecords(filteredRecords);
    setDeleteRecordId(undefined);
  };

  const handleDeleteRecord = async () => {
    if (!deleteRecordId) {
      return;
    }

    await deleteRecord(deleteRecordId, onSuccessDelete);
    toggleModal();
  };

  const deleteLabel = ''
    + 'Are you sure you want to delete this record? \n'
    + 'Deleted record can not be restored.';
  return (
    <>
      <div className="record-headline">
        <h1>Records archive</h1>
      </div>
      <div className="records-container">
        <div className="records">
          {records && records.length > 0 ? (
            <RecordsTable
              records={records}
              onDeleteRecord={handleDeleteModal}
              onPreviewRecord={handlePreviewRecord}
            />
          ) : (
            <NoRecords />
          )}
        </div>
      </div>
      <DeleteModal
        label={deleteLabel}
        isOpen={showConfirmModal}
        onCancel={toggleModal}
        onDelete={handleDeleteRecord}
      />
    </>
  );
};

export default Records;
