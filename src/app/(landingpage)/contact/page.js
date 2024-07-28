import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const metadata = {
  title: "Cemilanku - Kontak",
  description: "Halaman Kontak",
};

const ContactPage = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 p-5 sm:p-10 max-w-7xl mx-auto">
      <div className="w-full sm:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Hubungi Kami</h1>
        <p className="mb-4 text-gray-500">
          Jika Anda memiliki pertanyaan atau kekhawatiran, jangan ragu untuk
          menghubungi kami.
        </p>
        <p className="mb-4 text-gray-500">
          Tim dukungan kami tersedia 24/7 untuk membantu Anda.
        </p>
        <p className="mb-4 text-gray-500">
          Kami menghargai umpan balik dan saran Anda.
        </p>
        <p className="mb-4 text-gray-500">
          Terima kasih telah memilih Cemilanku.
        </p>
      </div>
      <div className="w-full sm:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Detail Kontak</h1>
        <p className="mb-4 text-gray-500">Telepon: +62 87773335248</p>
        <p className="mb-4 text-gray-500">Email: cemilanku@gmail.com</p>
        <p className="mb-4 text-gray-500">
          Alamat: Jl. Cempaka Putih No. 1, Cempaka Putih, Jakarta Timur
        </p>
        <p className="mb-4 text-gray-500">Media Sosial:</p>
        <div className="flex gap-4">
          <a href="#" className="text-xl text-gray-500 hover:text-gray-700">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl text-gray-500 hover:text-gray-700">
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/cemilanku569?utm_source=qr&igsh=bG52dWRoaHZsODc4"
            className="text-xl text-pink-500 hover:text-pink-700"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
