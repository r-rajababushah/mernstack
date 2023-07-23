import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./recordList.css";

const Record = (props) => (
    <tr>
        <td className="def">{props.record.title}</td>
        <td className="def">{props.record.summary}</td>
        <td id="action" >
            <Link to={`/edit/${props.record._id}`}> Edit  </Link> 
            <button
                className="delete"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div className="record-list">
            <h3>Record List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Summary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}

