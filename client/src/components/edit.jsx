import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./edit.css";

export default function Edit() {
    const [form, setForm] = useState({
        title: "",
        summary: "",
        records: [],
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occured ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedTodo = {
            title: form.title,
            summary: form.summary,
        };

        await fetch(`http://localhost:5050/record/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedTodo),
            headers: {
                'Content-Type': "application/json"
            },
        });
        navigate("/");
    }


    return (
        <div className="edit">
            <div className="edit-container">
                <h3>Update Todo</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={form.title}
                            maxLength={20}
                            onChange={(e) => updateForm({ title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Summary:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="summary"
                            value={form.summary}
                            maxLength={30}
                            onChange={(e) => updateForm({ summary: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <br />
                        <input
                            type="submit"
                            value="Update Record"
                            className="btn btn-primary"
                        />
                    </div>
                    <br />
                </form>
            </div>
        </div>
    )
}
