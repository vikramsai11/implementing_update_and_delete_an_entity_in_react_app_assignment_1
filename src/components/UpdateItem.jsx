import { useState } from "react";

const UpdateItem = ({ item }) => {
    const [formData, setFormData] = useState({
        name: item?.name || "",
        status: item?.status || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to update item");
            }
            alert("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Status:
                <input type="text" name="status" value={formData.status} onChange={handleChange} required />
            </label>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateItem;