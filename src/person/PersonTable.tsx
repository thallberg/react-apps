import React from "react";
import PersonInfo from "../data/Person.json";

const PersonTable = () => {
  return (
    <section className="flex flex-col items-center shadow">
      <table>
        <caption className="caption-top text-lg font-semibold text-center p-4 text-gray-700">
          Personal Info
        </caption>
        <thead className="bg-cyan-200">
          <tr className="border-b-2 border-gray-300">
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Age</th>
            <th className="px-4 py-4 text-left">Email</th>
            <th className="px-4 py-4 text-left">Phone</th>
            <th className="px-4 py-4 text-left">City</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 ">
          {PersonInfo.map((person, index) => (
            <tr
              className="hover:bg-gray-200 cursor-pointer border-b-2 border-gray-300"
              key={index}
            >
              <td className="px-4 py-4 text-left">{person.name}</td>
              <td className="px-4 py-4">{person.age}</td>
              <td className="px-4 py-4">{person.email}</td>
              <td className="px-4 py-4">{person.phone}</td>
              <td className="px-4 py-4">{person.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PersonTable;
