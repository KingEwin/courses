import Button from "./Button";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    itemName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, itemName, onConfirm, onCancel }: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black ">
            <div className="bg-gray-800 text-white p-6 rounded-md w-80">
                <h2 id="modal-title">Supprimer {itemName} ?</h2>
                <p>Cette action est irréversible.</p>
                <div className="flex justify-between mt-4">
                    <Button onclick={onCancel}>Annuler</Button>
                    <Button onclick={onConfirm} variant="danger">
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>
    );
}
