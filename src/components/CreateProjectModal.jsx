import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, FolderCheck } from "lucide-react";

const CreateProjectModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectIcon, setNewProjectIcon] = useState(null);
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [collaborators, setCollaborators] = useState([{ email: "", alias: "" }]);
  const modalRef = useRef(null);


  // Close modal on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, { email: "", alias: "" }]);
  };

  const handleCollaboratorChange = (index, field, value) => {
    const updated = [...collaborators];
    updated[index][field] = value;
    setCollaborators(updated);
  };

  const handleCreateProject = () => {
    // Simulate project creation
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-20 backdrop-opacity-75 animate-fadeIn">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* STEP 1 — Project Details */}
        {step === 1 && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Create New Project</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-amber-800 focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">Upload Project Icon (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProjectIcon(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">Project Description</label>
                <textarea
                  placeholder="Enter project description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-amber-800 focus:border-amber-800"
                  rows={3}
                  maxLength={150}
                />
                <p className="text-left text-xs text-gray-500 mt-1">{newProjectDescription.length}/150 characters</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <button
                disabled={!newProjectName}
                onClick={() => setStep(2)}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                  newProjectName
                    ? "bg-amber-800 text-white hover:bg-amber-900 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — Invite Collaborators */}
        {step === 2 && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Invite People</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              {collaborators.map((col, index) => (
                <div key={index} className="space-y-2">
                    <h2 className="text-left text-sm  text-gray-900 pt-2">Email Address</h2>

                  <input
                    type="email"
                    placeholder="Enter collaborator’s email"
                    value={col.email}
                    onChange={(e) => handleCollaboratorChange(index, "email", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                    <h2 className="text-left text-sm  text-gray-900 pt-2">Alias/Name</h2>

                  <input
                    type="text"
                    placeholder="Enter collaborator’s alias or name"
                    value={col.alias}
                    onChange={(e) => handleCollaboratorChange(index, "alias", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              ))}

              <button
                onClick={handleAddCollaborator}
                className="w-full bg-amber-700/5 hover:bg-amber-900/30 border-gray-800 text-amber-800 py-2 rounded-md cursor-pointer"
              >
                + Add a new collaborator
              </button>
            </div>

            <div className="px-6 pt-0 py-4 border-t border-gray-200">
              <button
                onClick={handleCreateProject}
                className="w-full px-4 py-2 rounded-md text-sm font-medium bg-amber-800 text-white hover:bg-amber-900 cursor-pointer"
              >
                Invite Collaborator(s)
              </button>
            </div>
          </>
        )}

        {/* STEP 3 — Success Screen */}
        {step === 3 && (
          <div className="text-center px-6 py-10">
            <FolderCheck  className="mx-auto text-amber-800 mb-4 animate-bounce" size={136} strokeWidth={0.75} />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Project Created Successfully</h2>
            <p className="text-sm text-gray-500 mb-6">
              Create, track, add and review logs for your project.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 rounded-md bg-amber-800 text-white font-medium hover:bg-amber-900 cursor-pointer"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;
