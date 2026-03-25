import { useState, type JSX } from "react";
import axios from "axios";

type AddProductProps = {
    onClose?: () => void;
    onSuccess?: () => void;
};

export default function AddProduct({ onClose, onSuccess }: AddProductProps): JSX.Element {
    const [prodName, setProdName] = useState("");
    const [prodDescription, setProdDescription] = useState("");
    const [prodBrand, setProdBrand] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [error, setError] = useState("");

    const close = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError("");

        const price = Number(prodPrice);
        if (!prodName || !prodDescription || !prodBrand || !prodPrice) {
            setError("All fields are required");
            return;
        }

        if (!Number.isInteger(price) || price <= 0) {
            setError("Price must be a positive integer");
            return;
        }

        try {
            await axios.post("http://localhost:4000/product", {
                prod_name: prodName,
                prod_description: prodDescription,
                prod_brand: prodBrand,
                prod_price: price
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add product");
        } finally {
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="Enter the Product name"
                    className="w-full border p-2 rounded" />
                <input type="text" value={prodDescription} onChange={(e) => setProdDescription(e.target.value)} placeholder="Enter the Product description"
                    className="w-full border p-2 rounded" />
                <input
                    type="text" value={prodBrand} onChange={(e) => setProdBrand(e.target.value)} placeholder="Enter the brand" 
                    className="w-full border p-2 rounded" />
                <input type="number" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} placeholder="Enter the Price"
                    className="w-full border p-2 rounded" />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button type="submit"  className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60"> Add </button>
            <button type="button" className="w-full bg-black text-white p-2 rounded" onClick={close}> Close </button>
        </form>
    );
}