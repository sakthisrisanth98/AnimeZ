'use client';

export default function SearchBar() {
  return (
    <div className="mt-6 w-full">
      <input
        type="text"
        placeholder="Search anime..."
        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>
  );
}
