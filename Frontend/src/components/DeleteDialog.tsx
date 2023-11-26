import "../styles/components/deleteDialog.css"

interface deleteDialogProps {
  title: string;
  callbackDeletion: () => void;
  callbackCancel: () => void;
}

export default function DeleteDialog({title, callbackCancel, callbackDeletion}: deleteDialogProps) {
  return (
    <dialog className="delete-dialog">
      <div className="delete-dialog-content">
        <h1>{title}</h1>
        <div className="delete-dialog-buttons">
          <button className="delete-button-dialog" onClick={callbackDeletion}>Deletar</button>
          <button className="cancel-button-dialog" onClick={callbackCancel}>Cancelar</button>
        </div>
      </div>
    </dialog>
  )
}