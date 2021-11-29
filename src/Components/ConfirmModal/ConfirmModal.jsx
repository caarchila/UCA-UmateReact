export default function ConfirmModal({id, message, onAccept, onCancel}) {

    const yesHandler = () => {
        document.getElementById(id).style.display = "none";
        onAccept();
    }

    const noHandler = () => {
        document.getElementById(id).style.display = "none";        
        onCancel();
    }

    return (
        <div id={id} className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-1/4 mx-auto p-5 border w-2/4 shadow-lg rounded-md bg-white">
                <div className="flex flex-col justify-center">
                    <div className="text-center text-lg my-10">{message}</div>
                    <div className="flex flex-row justify-center px-4 py-3">
                        <button id="ok-btn"
                            onClick={() => yesHandler()}
                            className="px-4 py-2 mx-2 md:mx-8 bg-yellow-500 text-white text-base font-medium rounded-md w-1/2 md:w-1/4 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                            Yes
                        </button>
                        <button id="cancel-btn"
                            onClick={() => noHandler()}
                            className="px-4 py-2 mx-2 md:mx-8 bg-yellow-500 text-white text-base font-medium rounded-md w-1/2 md:w-1/4 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}