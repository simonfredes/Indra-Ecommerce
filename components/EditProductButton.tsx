"use client";
export function EditProductButton({id}:{id: number}) {
    return (
        <button
            className="btn btn-primary"
            onClick={() => {
                window.location.href = `/admin/products/${id}`;
            }}
        >
            Edit
        </button>
    );
}