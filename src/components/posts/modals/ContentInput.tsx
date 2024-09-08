import React from "react";

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent }) => {
  return (
    <div>
      <div className="mb-6">
        <label className="block text-lg font-bold text-gray-700">Content</label>
        <textarea
          className="mt-2 block w-full resize rounded-md border-gray-300 p-4 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's buzzing?"
          rows={6}
          required
        />
      </div>
    </div>
  );
};

export default ContentInput;
