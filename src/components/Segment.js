import React, { useEffect, useState } from "react";
import "./Segment.css";
import {
  fetchAsyncGetSegments,
  fetchAsyncCreateSegment,
  fetchAsyncUpdateSegment,
  fetchAsyncDeleteSegment,
  editSegment,
  selectSegments,
  selectEditedSegment,
} from "../features/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";

const Segment = () => {
  const dispatch = useDispatch();
  const segments = useSelector(selectSegments);
  const editedSegment = useSelector(selectEditedSegment);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchBootLoader = async () => {
      const result = await dispatch(fetchAsyncGetSegments());
      if (fetchAsyncGetSegments.rejected.match(result)) {
        setSuccessMsg("Get error!");
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <>
      <h3 data-testid="h3-segment">Segment</h3>
      <span className="segment__status">{successMsg}</span>
      <div>
        <input
          type="text"
          placeholder="new segment name"
          value={editedSegment.segment_name}
          onChange={async (e) =>
            await dispatch(
              editSegment({ ...editedSegment, segment_name: e.target.value })
            )
          }
        />
        <button
          data_testid="btn-post"
          disabled={!editedSegment.segment_name}
          onClick={
            editedSegment.id === 0
              ? async () => {
                  await dispatch(
                    fetchAsyncCreateSegment({
                      segment_name: editedSegment.segment_name,
                    })
                  );
                  await dispatch(
                    editSegment({
                      id: 0,
                      segment_name: "",
                    })
                  );
                }
              : async () => {
                  const result = await dispatch(
                    fetchAsyncUpdateSegment(editedSegment)
                  );
                  await dispatch(
                    editSegment({
                      id: 0,
                      segment_name: "",
                    })
                  );
                  if (fetchAsyncUpdateSegment.fulfilled.match(result)) {
                    setSuccessMsg("Updated in segment!");
                  }
                }
          }
        >
          {editedSegment.id === 0 ? "Create" : "Update"}
        </button>
        <ul>
          {segments.map((seg) => (
            <li className="segment__item" key={seg.id}>
              <span data-testid={`list-${seg.id}`}>{seg.segment_name}</span>
              <div>
                <button
                  data-testid={`delete-seg-${seg.id}`}
                  onClick={async () => {
                    const result = await dispatch(
                      fetchAsyncDeleteSegment(seg.id)
                    );
                    if (fetchAsyncDeleteSegment.fulfilled.match(result)) {
                      setSuccessMsg("Deleted in segment!");
                    }
                  }}
                >
                  delete
                </button>
                <button
                  data-testid={`edit-seg-${seg.id}`}
                  onClick={async () => {
                    await dispatch(editSegment(seg));
                  }}
                >
                  edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Segment;
