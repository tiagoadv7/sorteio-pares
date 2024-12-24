"use client";

import { useState } from "react";

export default function Home() {
  const [names, setNames] = useState<string>("");
  const [pairs, setPairs] = useState<[string, string][]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = () => {
    const nameList = names.split("\n").filter((name) => name.trim() !== "");
    const shuffled = [...nameList].sort(() => Math.random() - 0.5);
    const paired: [string, string][] = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      paired.push([shuffled[i], shuffled[i + 1] || "Sem par"]);
    }
    setPairs(paired);
    setIsModalOpen(true); // Abrir o modal após o sorteio
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setNames(content); // Adiciona os nomes do arquivo no textarea
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-gray-300 shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-black font-bold text-center mb-4">
        <i className="fa-solid fa-gift"></i> Sorteio <i className="fa-solid fa-gift"></i>
        </h1>
        <textarea
          rows={8}
          className="w-full p-3 border text-blue-900 border-gray-700 rounded-md mb-4"
          placeholder="Insira os nomes, um por linha ou importe um arquivo"
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <input
            type="file"
            accept=".txt"
            className="hidden"
            id="fileInput"
            onChange={handleImport}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer w-full text-center bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
          >
            <i className="fas fa-upload"></i> Importar
          </label>
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
          onClick={handleSort}
        >
          <i className="fas fa-random"></i>
          Sortear
        </button>
      </div>

      {isModalOpen && (
  <div
    className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      {/* Botão Fechar no canto superior direito */}
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={closeModal}
      >
        <i className="fa-solid fa-xmark text-2xl"></i>
      </button>

      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6" id="modal-title">
          <i className="fa-solid fa-gift"></i> Sorteado <i className="fa-solid fa-gift"></i>
        </h3>
        <ul className="space-y-4">
          {pairs.map((pair, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center text-gray-900 text-2xl"
            >
              <span className="flex-1 text-left">{pair[0]}</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-bold text-xl">
                X
              </span>
              <span className="flex-1 text-right">{pair[1]}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-3 text-xl font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
