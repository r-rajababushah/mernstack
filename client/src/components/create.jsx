import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./create.css";

export default function Create() {
    const [form, setForm] = useState({
        title: "",
        summary: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();

        /// When a post request is sent to the create url , we'll add a new record to the database
        const newTodo = { ...form };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        }).catch(error => {
            window.alert(error);
            return;
        });

        setForm({ title: "", summary: "" });
        navigate("/");
    }

    // This followsing section will display the form that takes the input from user and udpates form varibale
    return (
        <div className="create">
            <div className="createContainer">
                <h3>Create New Todo</h3> <br />
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label> <br />
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={form.title}
                            placeholder="title"
                            maxLength={20}
                            onChange={(e) => updateForm({ title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Summary</label> <br />
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
                            value="Create Todo"
                            className="btn btn-primary"
                        />
                    </div>
                    <br />
                </form>
            </div>
        </div>
    )
}