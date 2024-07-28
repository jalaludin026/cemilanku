export const metadata = {
  title: "Cemilanku - About",
  description: "Toko online terlengkap",
};

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 sm:p-10">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="text-4xl font-bold text-gray-900">Tentang Cemilanku</h1>
        <p className="mt-6 text-xl text-gray-500">
          "Selamat datang di Cemilanku, toko online terpercaya Anda untuk segala
          jenis cemilan yang memanjakan lidah! Kami menawarkan koleksi luas dari
          berbagai cemilan berkualitas tinggi, mulai dari camilan tradisional
          yang telah teruji waktu hingga inovasi terbaru dalam dunia pangan. Di
          Cemilanku, setiap produk dipilih dengan teliti untuk memastikan hanya
          yang terbaik yang sampai ke tangan Anda. Nikmati kemudahan berbelanja
          dengan antarmuka yang ramah pengguna, layanan pelanggan yang
          responsif, dan pengiriman cepat ke seluruh Indonesia. Temukan favorit
          Anda, eksplorasi rasa baru, dan rasakan pengalaman cemilan yang tak
          terlupakan bersama kami!"
        </p>

        <div className="mt-6">
          <a
            href="https://Cemilanku.my.id"
            className="text-sm font-medium text-gray-500 underline"
          >
            www.Cemilanku.my.id
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
