// src/pages/ExamsPage.tsx
import React from "react";

const ExamsPage: React.FC = () => {
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Exams</h1>
        <p className="text-gray-600">This is the Exams page. You can list exams here.</p>

      {/* Sample exam table */}
        <div className="mt-6">
        <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Exam Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
            <tr>
                <td className="px-4 py-2">Mathematics Midterm</td>
                <td className="px-4 py-2">2025-06-15</td>
                <td className="px-4 py-2 text-green-600 font-semibold">Scheduled</td>
            </tr>
            <tr>
                <td className="px-4 py-2">Science Final</td>
                <td className="px-4 py-2">2025-06-25</td>
                <td className="px-4 py-2 text-yellow-600 font-semibold">Pending</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default ExamsPage;
