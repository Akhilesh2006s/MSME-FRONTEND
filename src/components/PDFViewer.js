import React, { useState, useEffect } from 'react';

const PDFViewer = ({ pdfUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pdfUrl) {
      setLoading(true);
      setError(null);
    }
  }, [pdfUrl]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load PDF');
  };

  if (!pdfUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">PDF Document Viewer</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'document.pdf';
                link.click();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading PDF...</p>
              </div>
            </div>
          )}
          
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-red-600">
                <p className="text-lg font-semibold">Error loading PDF</p>
                <p className="text-sm mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              onLoad={handleLoad}
              onError={handleError}
              title="PDF Document"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
